// const readline = require("readline");
import readline from 'readline'
export const ask = async function (prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(prompt + "\n", (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};
