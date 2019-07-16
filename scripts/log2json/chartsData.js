/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const _readFile = async () => {
  const absoluteResultPath = path.resolve(__dirname, '../../static/result.json');
  let data = await readFileAsync(absoluteResultPath, 'utf-8');
  data = JSON.parse(data);
  return data;
};

const requestPerMinute = async () => {
  const data = await _readFile();
  const result = [{ min: 0, rpm: 0 }];
  let currentTimestamp = data[0].datetime;

  data.forEach((ln) => {
    if (ln.datetime.hour !== currentTimestamp.hour || ln.datetime.minute !== currentTimestamp.minute) {
      currentTimestamp = ln.datetime;
      result.push({ min: result.length, rpm: 1 });
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

const methodDistribution = async () => {
  const data = await _readFile();
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

const codeDistribution = async () => {
  const data = await _readFile();
  return _universalReduceDistribution(data, 'response_code');
};

const sizeDistribution = async () => {
  let data = await _readFile();
  data = data.filter((ln) => ln.response_code === '200' && parseInt(ln.document_size) < 1000);
  return _universalReduceDistribution(data, 'document_size');
};

module.exports = {
  requestPerMinute,
  methodDistribution,
  codeDistribution,
  sizeDistribution,
};
