/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

/**
 * Read result json from file.
 * @param {array} [data] - Input data (mainly testing)
 * @return {array}
 * @private
 */
const _readFile = async (data) => {
  if (data) {
    return data;
  }
  const absoluteResultPath = path.resolve(__dirname, '../../static/result.json');
  let fileData = await readFileAsync(absoluteResultPath, 'utf-8');
  fileData = JSON.parse(fileData);
  return fileData;
};

/**
 * Count request per minute.
 * @param {array} [data] - Input data (mainly testing)
 * @return {array} array of objects as timestamp:XXX, requests: XXX
 * @public
 */
const requestPerMinute = async (inputData) => {
  const data = await _readFile(inputData);
  let currentTimestamp = data[0].datetime;
  const result = [{ min: `${currentTimestamp.day}-${currentTimestamp.hour}:${currentTimestamp.minute}`, rpm: 0 }];
  data.forEach((ln) => {
    if (ln.datetime.hour !== currentTimestamp.hour || ln.datetime.minute !== currentTimestamp.minute) {
      currentTimestamp = ln.datetime;
      result.push({ min: `${currentTimestamp.day}-${currentTimestamp.hour}:${currentTimestamp.minute}`, rpm: 1 });
    } else {
      const i = result.length - 1;
      result[i] = {
        ...result[i],
        rpm: result[i].rpm + 1,
      };
    }
  });
  return result;
};

/**
 * Count method distribution in communication.
 * @param {array} [data] - Input data (mainly testing)
 * @return {object} object as method:requests
 * @public
 */
const methodDistribution = async (inputData) => {
  const data = await _readFile(inputData);
  const reducer = (acc, val) => {
    const newAcc = {
      ...acc,
      ...(val.request.method === 'GET' ? { get: acc.get + 1 } : {}),
      ...(val.request.method === 'POST' ? { post: acc.post + 1 } : {}),
      ...(val.request.method === 'HEAD' ? { head: acc.head + 1 } : {}),
      ...(!['GET', 'POST', 'HEAD'].includes(val.request.method) ? { other: acc.other + 1 } : {}),
    };
    return newAcc;
  };
  const result = data.reduce(reducer, { get: 0, post: 0, head: 0, other: 0 });
  return result;
};

/**
 * Reduce array occurencet by object key.
 * @param {array} data - Input data
 * @param {string} key - proerty to be reduced
 * @return {object} object as property:value
 * @private
 */
const _universalReduceDistribution = (data, key) => {
  const reducer = (acc, val) => {
    const newAcc = {
      ...acc,
      ...(Object.prototype.hasOwnProperty.call(acc, val[key]) ? { [val[key]]: acc[val[key]] + 1 } : { [val[key]]: 1 }),
    };
    return newAcc;
  };
  const result = data.reduce(reducer, {});
  return result;
};

/**
 * Count return code distribution in communication.
 * @param {array} [data] - Input data (mainly testing)
 * @return {object} object as code:requests
 * @public
 */
const codeDistribution = async (inputData) => {
  const data = await _readFile(inputData);
  return _universalReduceDistribution(data, 'response_code');
};

/**
 * Count size distribution in communication
 * @param {array} [data] - Input data (mainly testing)
 * @return {object} object as size:requests
 * @public
 */
const sizeDistribution = async (inputData, code = '200', minSize = 1000) => {
  let data = await _readFile(inputData);
  data = data.filter((ln) => ln.response_code === code && parseInt(ln.document_size) < minSize);
  return _universalReduceDistribution(data, 'document_size');
};

module.exports = {
  requestPerMinute,
  methodDistribution,
  codeDistribution,
  sizeDistribution,
};
