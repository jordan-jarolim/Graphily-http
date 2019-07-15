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

module.exports = normalizeData;


// const dynamicRegex = ({
//   regex,
//   flags = 'gi',
//   decorate = null,
// }) => {
//   // note double-backslash "\\\\" - we need this to be able to create dynamic regex from var
//   let regexCompliantAsVar = regex.replace(/[/\\^$*+?.()|[\]{}]/g, '\\\\$&');
//   if (decorate) {
//     regexCompliantAsVar = decorate(regexCompliantAsVar);
//   }
//   return new RegExp(`${regexCompliantAsVar}`, flags);
// }

// const normalizeData = (input) => {
//   let characterSet = '';
//   // will contain all url-compliant chars (https://tools.ietf.org/html/rfc3986#section-2.3)
//   for (let i = 32; i <= 127; i += 1) {
//     characterSet += String.fromCharCode(i);
//   }
//   const regexCompliantAsVar = dynamicRegex({ regex: characterSet, flags: 'gi', decorate: (regex) => `[^${regex}\n]` });

//   const output = input.replace(regexCompliantAsVar, '');

//   // logNormalizationOutput(input, output);

//   return output;
// };