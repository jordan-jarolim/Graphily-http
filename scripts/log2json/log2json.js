const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const get = require('lodash/get');

const normalizeData = require('./utils');

const readFileAsync = promisify(fs.readFile);
// const writeFileAsync = promisify(fs.writeFile);

const getDatetime = (lineArr) => {
  // const dateTimeStr = get(line.match(/(?<=^.*\s\[)[\d:]*(?=\]\s)/), 0, '');
  const dateTimeStr = get(lineArr, 1, '');
  const dateTimeArr = dateTimeStr.split(':').map((stamp) => stamp.replace(/\[|\]/, ''));
  return {
    day: get(dateTimeArr, 0, '-'),
    hour: get(dateTimeArr, 1, '-'),
    minute: get(dateTimeArr, 2, '-'),
    second: get(dateTimeArr, 3, '-'),
  };
};

// const getHost = (line) => get(line.match(/^[^\s]+/), 0, '');
const getHost = (lineArr) => get(lineArr, 0, '');

const getRequest = (lineArr) => {
  const shallowCpy = [...lineArr];
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

  // const request = get(line.match(/(?:").*(?:")/), 0, '');
  const method = methodOffset ? shallowCpy[0].replace('"', '') : '-';
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

const getResCode = (lineArr) => get(lineArr, lineArr.length - 2, '');

const getByteLength = (lineArr) => get(lineArr, lineArr.length - 1, '');

const log2json = async ({
  logPath = '../../static/epa-http.txt',
}) => {
  const absolutePath = path.resolve(__dirname, logPath);
  const logData = await readFileAsync(absolutePath, 'binary');
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

  // console.log(lines.filter((ln) => ln.request.method.match(/^((?!(GET|POST|HEAD)).*)/gi)).length);
  // console.log(lines.filter((ln) => ln.request.method.match(/^GET/gi)).length);
  // console.log(lines.filter((ln) => ln.request.method.match(/^POST/gi)).length);
  // console.log(lines.filter((ln) => ln.request.method.match(/^HEAD/gi)).length);
};


module.exports = log2json;
