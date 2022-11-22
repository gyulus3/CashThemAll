import strings from '../resources/strings.js';

import register from './register.js';
import profile from './profile.js';
import login from './login.js';
import create from './create.js';
import proxy from './proxy.js';
import balance from './balance.js';
import add from './add.js';
import withdraw from './withdraw.js';
import transfer from './transfer.js';
import history from './history.js';
import increase from './increase.js';

import * as data from '../data.js';

const DEFINED_COMMANDS = {
    register, profile, login, create, proxy, balance, add, withdraw, transfer, history, increase
}

const printHelp = () => {
    console.log(strings.menuHelp);
    Object.keys(DEFINED_COMMANDS).forEach((key, index) => {
        console.log(`\t${ index + 1 }. ${ DEFINED_COMMANDS[key].info }`);
        console.log(`\t   - ${ DEFINED_COMMANDS[key].description }`);
    });
    console.log('\n');
}

const isCommandInvalid = (command) => {
     return !command || !DEFINED_COMMANDS[command];
}

export const getCommand = (command) => {
    if (command === 'help') {
        return printHelp;
    }
    if (isCommandInvalid(command)) {
        return () => console.log(strings.invalidCommand);
    }
    return DEFINED_COMMANDS[command].execute(data);
}

export const isCommandExit = (command) => {
    return command === 'exit';
}
