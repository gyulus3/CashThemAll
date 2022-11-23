import generateAccNum from '../util/accountNumberGenerator.js';

export default {
    info: 'create <account type>',
    description: 'You can create personal or saving account',
    execute: (data) => ([type]) => {
        if (!data.isLoggedIn()) {
            throw new Error('User is not logged in!');
        }

        const countPersonalAccounts = data.loggedInUser.accounts.filter(a => a.type === 'personal').length;
        if (type === 'personal' && countPersonalAccounts >= 5) {
            throw new Error('Cannot create more personal accounts!');
        }

<<<<<<< HEAD
        if (type === 'personal' || type === 'saving') {
            data.loggedInUser.accounts.push({
                accountNumber: generateAccountNumber(),
                amount: 0,
                type,
                histories: [],
                proxies: []
=======
        if (type === 'personal' || type === 'saving') {     
            data.loggedInUser.accounts.push({ 
                accountNumber: generateAccNum(), 
                amount: 0, 
                type, 
                histories: [], 
                proxies: [] 
>>>>>>> f26cb6e7b047a1f22502549126aea0b44d04bede
            });
            data.saveData();
        } else {
            throw new Error('Account type must be personal or saving!');
        }
    }
}
<<<<<<< HEAD

const generateAccountNumber = () => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    for (let i = 0; i < 14; i++) {
        if (i === 0 || i === 1) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        } else {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    }
    return result;
}
=======
>>>>>>> f26cb6e7b047a1f22502549126aea0b44d04bede
