import { waitUserInput } from './user-input.js';
import { loadData } from './data.js';
import { getCommand, isCommandExit } from './commands/index.js';
import strings from './resources/strings.js';

console.log(strings.welcome);

await loadData();

let { command, restArgs } = await waitUserInput();

while (!isCommandExit(command)) {
  const executeCommand = getCommand(command);
  executeCommand(restArgs);

  ({ command, restArgs } = await waitUserInput());
} 