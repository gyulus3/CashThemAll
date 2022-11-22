import fs from 'fs/promises';
import util from 'util';

const DEFAULT_INPUT_FILE = 'input.txt';
const dataFileName = process.argv[2] || DEFAULT_INPUT_FILE;

let loggedInUser = null;
const users = [];

const processUserData = (element) => {
    const [email, password, username] = element.split(' ');
    users.push({ email, password, username, accounts: [] });
}

const processAccountData = (accountDataArray) => {
    const [accountDetail, proxies, ...histories] = accountDataArray;
    const [accountNumber, amount, email, type] = accountDetail.split(' ');

    const user = users.find(u => u.email === email);
    if (user) {
        let account = { accountNumber, amount: parseInt(amount), type, histories: [], proxies: [] };
        if (proxies) {
            account = { ...account, proxies: proxies.split(' ') };
        }
        histories.forEach(history => {
            const [accountOrigin, amountBefore, amountTransfered, amountAfter, accountDestionation] = history.split(' ');
            account.histories.push({
                accountOrigin, 
                amountBefore: parseInt(amountBefore), 
                amountTransfered: parseInt(amountTransfered),
                amountAfter: parseInt(amountAfter), 
                accountDestionation
            });
        });
        user.accounts.push(account);
    }
};

const ifStringLengthGreaterThanZero = (stringElement) => stringElement.length > 0;

const saveData = async () => {
    let outputData = '';
    users.forEach(({ email, password, username }) => {
        outputData += `${ email } ${ password } ${ username }\n`;
    });
    users.forEach(({ accounts, email }) => {
        accounts.forEach(({ accountNumber, amount, type, histories, proxies }) => {
            outputData += '#HISTORY\n';
            outputData += `${ accountNumber } ${ amount } ${ email } ${ type }\n`;
            proxies.forEach((proxy, index) => {
                outputData += index > 0? ` ${ proxy }` : `${ proxy }`;
            });
            outputData += '\n';
            histories.forEach(({ accountOrigin, amountBefore, amountTransfered, amountAfter, accountDestionation }) => {
                outputData += `${ accountOrigin } ${ amountBefore } ${ amountTransfered } ${ amountAfter }`;
                if (accountDestionation) {
                    outputData += ` ${ accountDestionation }`;
                }
                outputData += '\n';
            });
        });
    });
    await fs.writeFile(`./${ dataFileName }`, outputData);
};

const loadData = async () => {    
    const rawInputData = await fs.readFile(`./${ dataFileName }`, 'binary');
    const inputData = rawInputData.split('\n').filter(ifStringLengthGreaterThanZero);

    let proccessedData = [];
    while(inputData.indexOf('#HISTORY') !== -1) {
        proccessedData.push(inputData.splice(0, inputData.indexOf('#HISTORY') + 1));
    }
    proccessedData.push(inputData);
    const [userData, ...accountData] = proccessedData.map(array => { 
        return array.indexOf('#HISTORY') !== -1 ? array.slice(0, -1) : array; 
    });

    userData.forEach(processUserData);
    accountData.forEach(processAccountData);

    console.log(util.inspect(users, false, null, true))
}

const loginUser = (userToLogin) => {
    loggedInUser = userToLogin;
}

export { users, loggedInUser, loginUser, saveData, loadData };
