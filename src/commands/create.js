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

        if (type === 'personal' || type === 'saving') {     
            data.loggedInUser.accounts.push({ 
                accountNumber: generateAccNum(), 
                amount: 0, 
                type, 
                histories: [], 
                proxies: [] 
            });
            data.saveData();
        } else {
            throw new Error('Account type must be personal or saving!');
        }
    }
}
