import { waitUserInput } from './user-input.js';
import { loadData } from './data.js';
import { getCommand, isCommandExit } from './commands/index.js';

console.log('Greetings! This is cash app!');

await loadData();

let [command, ...restArgs] = await waitUserInput();

while (!isCommandExit(command)) {
  const executeCommand = getCommand(command);

  try {
    executeCommand(restArgs);
  } catch({ message }) {
    console.log(message);
  }

  ([command, ...restArgs] = await waitUserInput());
}