const { makeArr, normalizeData } = require('../utils');

describe('utils', () => {
  test('makeArr str', () => {
    expect(makeArr('coconut mango banana kiwi')).toEqual(['coconut', 'mango', 'banana', 'kiwi']);
  });
  test('makeArr arr', () => {
    expect(makeArr(['coconut', 'mango', 'banana', 'kiwi'])).toEqual(['coconut', 'mango', 'banana', 'kiwi']);
  });
  test('normalize data non-printable', () => {
    let nonPrintableChars = '';
    for (let i = 0; i < 32; i += 1) {
      nonPrintableChars += String.fromCharCode(i);
    }
    expect(normalizeData(nonPrintableChars)).toEqual(String.fromCharCode(10));
  });
  test('normalize data printable', () => {
    let printableChars = '';
    for (let i = 40; i < 50; i += 1) {
      printableChars += String.fromCharCode(i);
    }
    expect(normalizeData(printableChars)).toEqual(printableChars);
  });
  test('normalize data mix', () => {
    let mix = '';
    let printable = '';
    for (let i = 11; i < 50; i += 1) {
      mix += String.fromCharCode(i);
    }
    for (let i = 32; i < 50; i += 1) {
      printable += String.fromCharCode(i);
    }
    expect(normalizeData(mix)).toEqual(printable);
  });
});
