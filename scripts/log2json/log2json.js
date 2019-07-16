/* eslint-disable no-console */
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const {
  normalizeData,
  makeArr,
  notALodashGet,
} = require('./utils');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const get = notALodashGet;

/**
 * Log to Json module.
 * @module log2json
 */

/**
 * @typedef {Object} Timestamp
 * @property {string} day
 * @property {string} hour
 * @property {string} minute
 * @property {string} second
 */

/**
 * @typedef {Object} Request
 * @property {string} method - Request method (GET|POST|HEAD)
 * @property {string} url - Requested url
 * @property {string} protocol - Request protocol
 * @property {string} protocol_version - Request protocol version
 */

/**
 * Get host from log line.
 *
 * @param {string|array} lineArr - Log line as string or array
 * @return {string} Request host
 *
 * @example
 *
 *     getHost('141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497')
 */
const getHost = (lineArr) => get(makeArr(lineArr), 0, '');

/**
 * Get response code from log line.
 *
 * @param {string|array} lineArr - Log line as string or array
 * @return {string} Request res code
 *
 * @example
 *
 *     getResCode('141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497')
 */
const getResCode = (lineArr) => get(makeArr(lineArr), lineArr.length - 2, '');

/**
 * Get response byte length from log line.
 *
 * @param {string|array} lineArr - Log line as string or array
 * @return {string} Request byteLength
 *
 * @example
 *
 *     getByteLength('141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497')
 */
const getByteLength = (lineArr) => get(makeArr(lineArr), lineArr.length - 1, '');

/**
 * Parse request represented as string.
 *
 * @param {string|array} lineArr - Log line as string or array
 * @return {Timestamp} parsed timestamp
 *
 * @example
 *
 *     getRequest('141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497')
 */
const getDatetime = (ln) => {
  const lineArr = makeArr(ln);
  const dateTimeStr = get(lineArr, 1, ''); // const dateTimeStr = get(line.match(/(?<=^.*\s\[)[\d:]*(?=\]\s)/), 0, '');
  const dateTimeArr = dateTimeStr.split(':').map((stamp) => stamp.replace(/\[|\]/, ''));
  return {
    day: get(dateTimeArr, 0, '-'),
    hour: get(dateTimeArr, 1, '-'),
    minute: get(dateTimeArr, 2, '-'),
    second: get(dateTimeArr, 3, '-'),
  };
};

/**
 * Parse request represented as string.
 *
 * @param {string|array} lineArr - Log line as string or array
 * @return {Request} parsed request
 *
 * @example
 *
 *     getRequest('141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497')
 */
const getRequest = (lineArr) => {
  const shallowCpy = [...makeArr(lineArr)];
  shallowCpy.splice(0, 2); // get rid of domain + timestamp
  shallowCpy.splice(-2, 2); // get rid of status + size

  let methodOffset = 0;
  let protocolPadding = 0;
  if (shallowCpy.join(' ').match(/(GET|POST|HEAD)/gmi)) {
    methodOffset = 1;
  }
  if (shallowCpy.join(' ').match(/HTTP(S?)\/\d\.\d/gmi)) {
    protocolPadding = 1;
  }
  const method = methodOffset ? shallowCpy[0].replace('"', '') : '-'; // const request = get(line.match(/(?:").*(?:")/), 0, '');
  const protocolWithVersion = shallowCpy[shallowCpy.length - 1];
  const protocol = get(protocolWithVersion.match(/HTTP(S?)(?=\/\d\.\d)/i), 0, '-');
  const protocolVersion = get(protocolWithVersion.match(/(?<=HTTP(S?)\/)\d\.\d/i), 0, '-');
  let url = [...shallowCpy];
  if (methodOffset) {
    url.splice(0, methodOffset); // possibly get rid of method
  }
  if (protocolPadding) {
    url.splice(-protocolPadding, protocolPadding); // possibly get rid of protocol
  }
  url = url.join(' ');
  return {
    method,
    url,
    protocol,
    protocol_version: protocolVersion,
  };
};

/**
 * Read inupt Http Log from file, parse it and create new json file.
 *
 * @param {object} paths - Input and output paths
 * @param {string} logPath - Input log path
 * @param {string} resultPath - Output json path
 * @return {undefined}
 *
 * @example
 *
 *     log2json({logPath: './input.txt', resultPath: './output.json'})
 */
const log2json = async ({
  logPath = '../../static/epa-http.txt',
  resultPath = '../../static/result.json',
}) => {
  const absoluteLogPath = path.resolve(__dirname, logPath);
  const absoluteResultPath = path.resolve(__dirname, resultPath);
  let logData = '';
  try {
    logData = await readFileAsync(absoluteLogPath, 'binary');
  } catch (error) {
    console.log(error);
    throw error;
  }
  const normalizedData = normalizeData(logData);
  const lines = normalizedData.split('\n').filter((ln) => ln.length).map((ln) => {
    const lineArr = ln.split(' ');
    return {
      host: getHost(lineArr),
      datetime: getDatetime(lineArr),
      request: getRequest(lineArr),
      response_code: getResCode(lineArr),
      document_size: getByteLength(lineArr),
    };
  });
  try {
    await writeFileAsync(absoluteResultPath, JSON.stringify(lines));
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log(`Log ${absoluteLogPath} was succesfully parsed and saved as ${absoluteResultPath}`);
};


module.exports = log2json;
module.exports.getHost = getHost;
module.exports.getDatetime = getDatetime;
module.exports.getRequest = getRequest;
module.exports.getResCode = getResCode;
module.exports.getByteLength = getByteLength;
