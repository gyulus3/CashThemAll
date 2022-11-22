import { createInterface } from 'readline';
import strings from './resources/strings.js';

const ask = (question) => {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => 
        readline.question(question, answer => {
            readline.close();
            resolve(answer);
        })
    );
}

export const waitUserInput = async () => {
    const answer = await ask(strings.menuText);
    const [command, ...rest] = answer
        .split(' ')
        .map(component => component.toLowerCase());

    return [command, ...rest];
}