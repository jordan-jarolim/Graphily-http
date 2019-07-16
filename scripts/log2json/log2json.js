/* eslint-disable no-underscore-dangle */
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
 * Get host from log line.
 * @param {string|array} lineArr - Log line as string or array
 * @return {string} Request host
 * @private
 */
const _getHost = (lineArr) => get(makeArr(lineArr), 0, '');

/**
 * Get response code from log line.
 * @param {string|array} ln - Log line as string or array
 * @return {string} Request res code
 * @private
 */
const _getResCode = (ln) => {
  const lineArr = makeArr(ln);
  return get(lineArr, lineArr.length - 2, '');
};

/**
 * Get response byte length from log line.
 * @param {string|array} ln - Log line as string or array
 * @return {string} Request byteLength
 * @private
 */
const _getByteLength = (ln) => {
  const lineArr = makeArr(ln);
  return get(lineArr, lineArr.length - 1, '');
};

/**
 * Get response timestamp from log line.
 * @param {string|array} ln - Log line as string or array
 * @return {object} parsed timestamp
 * @private
 */
const _getDatetime = (ln) => {
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
 * Parse request represented as string from log line.
 * @param {string|array} ln - Log line as string or array
 * @return {object} parsed request
 * @private
 */
const _getRequest = (ln) => {
  const shallowCpy = [...makeArr(ln)];
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
 * Read input Http log from file, parse it and create new json file.
 * @param {object} paths - Input and output paths
 * @param {string} logPath - Input log path
 * @param {string} resultPath - Output json path
 * @return {undefined}
 * @public
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
      host: _getHost(lineArr),
      datetime: _getDatetime(lineArr),
      request: _getRequest(lineArr),
      response_code: _getResCode(lineArr),
      document_size: _getByteLength(lineArr),
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
