import fs from 'fs/promises';

import util from 'util';

const DEFAULT_INPUT_FILE = 'input.cash';
const dataFileName = process.argv[2] || DEFAULT_INPUT_FILE;

export const data = {
    loggedInUser: null,
    users: [],
}

const findUserByAccountNumber = (accountNumber) => {
    return data.users.find(({ accounts }) => accounts.some(({ number }) => number === accountNumber));
}

const findAccountByNumber = (user, accountNumber) => {
    return user.accounts.find(({ number }) => number === accountNumber);
}

export const loadData = async () => {
    let firstSection = true;
    let iteration = 1;
    let actAccountNumber = '';

    const processUserData = (element) => {
        const [email, password, username] = element.split(' ');
        data.users.push({ email, password, username, accounts: [] });
    }
    
    /*const processAccountDetails = (element) => {
        let user;
        switch(iteration) {
            case 1: 
                const [number, amount, email, type] = element.split(' ');
                actAccountNumber = number;
                user = data.users.find(u => u.email === email);
                if (user) {
                    user.accounts.push({ number, amount, type, proxies: [], history: [] });
                }
            break;
            case 2:
                const proxies = element.split(' ');
                user = findUserByAccountNumber(actAccountNumber);
                if (user) {
                    const account = findAccountByNumber(user, actAccountNumber);
                    account.proxies = proxies;
                }
            break;
            default:
                const [_, beforeAmount, process, afterAmount, destinationAccount] = element.split(' ');
                user = findUserByAccountNumber(actAccountNumber);
                if (user) {
                    const account = findAccountByNumber(user, actAccountNumber);
                    account.history.push({ beforeAmount, process, afterAmount, destinationAccount });
                }
                break;
        }
    }*/

    const rawInputData = await fs.readFile(`./${ dataFileName }`, 'binary');
    const inputData = rawInputData.split('\r\n');

    inputData.forEach(element => {
        if (firstSection) {
            if (element === '#HISTORY') {
                firstSection = false;
            } else {
                processUserData(element);
            }
        } else {
            if (element === '#HISTORY') {
                iteration = 1;
            } else {
                //rocessAccountDetails(element);
                iteration++;
            }
        }
    });

    console.log(util.inspect(data.users, false, null, true))
}

export const saveData = async () => {
    let outputData = '';
    data.users.forEach(u => {
        outputData += `${ u.email } ${ u.password } ${ u.username }\n`
    });
    data.users.forEach(u => {
        u.accounts.forEach(a => {
            outputData += '#HISTORY\n';
            outputData += `${ a.number } ${ a.amount } ${ u.email } ${ a.type }\n`;
            a.proxies.forEach(p => {
                outputData += `${ p } `;
            });
            outputData += '\n';
            a.history.forEach(h => {
                outputData += `${ a.number } ${ h.beforeAmount } ${ h.process } ${ h.afterAmount }\n`;
            });
        })
    })
    await fs.writeFile(`./${ dataFileName }`, outputData);

}