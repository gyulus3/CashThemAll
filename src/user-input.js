import { createInterface } from 'readline';

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
    const answer = await ask('Type the command here (type help for all the commands, exit for close app): ');
    const [command, ...rest] = answer
        .split(' ')
        .map(component => component.toLowerCase());

    return [command, ...rest];
}