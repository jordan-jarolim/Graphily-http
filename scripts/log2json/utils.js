/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

/**
 * Logs normalization results.
 * @param {string} input - String to be normalized
 * @param {string} output - Normalized string
 * @return {undefined}
 */
const logNormalizationOutput = (input, output) => {
  const inputCharset = [];
  const outputCharset = [];
  for (let i = 0; i < input.length; i += 1) {
    const char = input.charAt(i);
    if (!inputCharset.includes(char)) {
      inputCharset.push(char);
    }
  }

  for (let i = 0; i < output.length; i += 1) {
    const char = output.charAt(i);
    if (!outputCharset.includes(char)) {
      outputCharset.push(char);
    }
  }
  console.log(`
    Input charset is (ascii):
    ${inputCharset.map((c) => c.charCodeAt(0))}
    ------
    Output charset is (ascii):
    ${outputCharset.map((c) => c.charCodeAt(0))}
    ------
    Chars replaced (ascii):
    ${inputCharset.filter((c) => !outputCharset.includes(c)).map((c) => c.charCodeAt(0))}
  `);
};

/**
 * Filter all non-standard characters.
 * @param {string} input - String to be normalized
 * @return {string} normalized string
 */
const normalizeData = (input) => {
  let characterSet = '';
  // will contain all url-compliant chars (https://tools.ietf.org/html/rfc3986#section-2.3)
  for (let i = 32; i <= 127; i += 1) {
    characterSet += String.fromCharCode(i);
  }
  // note double-backslash "\\\\" - we need this to be able to create dynamic regex from var
  const regexCompliantAsVar = characterSet.replace(/[/\\^$*+?.()|[\]{}]/g, '\\\\$&');
  const regex = new RegExp(`[^${regexCompliantAsVar}\n]`, 'gi');
  const output = input.replace(regex, '');
  logNormalizationOutput(input, output);
  return output;
};

/**
 * Split string into array if necessary. Leave input array untouched.
 * @param {string|array} input - String to be split
 * @return {array} array made of string
 */
const makeArr = (strOrArr) => Array.isArray(strOrArr) ? strOrArr : strOrArr.split(' ');

/**
 * Mock lodash get function - no need of installation any additional packages then.
 * @param {object} object - Object to get property of
 * @param {string|array} path - path to property
 * @param {*} defaultVal - default value
 * @return {*} property value or default value
 */
const notALodashGet = (object, path, defaultVal) => {
  const _path = Array.isArray(path)
    ? path
    : path.toString().split('.').filter((i) => i.length);

  if (!_path.length) {
    return object === undefined ? defaultVal : object;
  }
  if (!object) {
    return defaultVal;
  }

  return notALodashGet(object[_path.shift()], _path, defaultVal);
};

module.exports = {
  normalizeData,
  makeArr,
  notALodashGet,
};
