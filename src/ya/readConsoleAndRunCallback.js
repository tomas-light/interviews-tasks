// function from JS example provided by Yandex
function readConsoleAndRunCallback(callback) {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
  });

  const lines = [];

  rl.on('line', (line) => {
    lines.push(line);
  }).on('close', () => {
    const result = callback(...lines);

    if (result && Array.isArray(result)) {
      result.forEach((line) => {
        process.stdout.write(`${line.toString()}\n`);
      });
    } else {
      process.stdout.write(result.toString());
    }
  });
}
