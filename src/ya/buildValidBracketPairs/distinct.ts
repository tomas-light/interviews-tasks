const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

let lastLine;
let lengthNumberWasSkipped = false;

rl.on('line', (line) => {
  if (!lengthNumberWasSkipped) {
    lengthNumberWasSkipped = true;
    return;
  }

  if (lastLine === line) {
    return;
  }

  lastLine = line;
  process.stdout.write(`${line}\n`);
});
