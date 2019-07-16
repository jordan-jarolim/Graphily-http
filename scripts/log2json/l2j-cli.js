const log2json = require('./log2json');

(async () => {
  const logPath = process.argv[2];
  const resultPath = process.argv[3];
  await log2json({
    logPath,
    resultPath,
  });
})();
