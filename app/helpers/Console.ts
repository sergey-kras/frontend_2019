const readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout, 
  terminal: false,
});

export function readLineConsole(callback: any) {
    rl.on('line', callback); // TODO pe; 2015-08-10; а какая будет кодировка?
}
