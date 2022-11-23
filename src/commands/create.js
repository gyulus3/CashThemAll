export default {
    info: 'create <account type>',
    description: 'You can....',
    execute: (data) => ([type]) => {
        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }

        const countPersonalAccounts = data.loggedInUser.accounts.filter(a => a.type === 'personal').length;
        if (type === 'personal' && countPersonalAccounts >= 5) {
            console.log('Cannot create more personal accounts!');
            return;
        }

        if (type === 'personal' || type === 'saving') {     
            data.loggedInUser.accounts.push({ 
                accountNumber: generateAccountNumber(), 
                amount: 0, 
                type, 
                histories: [], 
                proxies: [] 
            });
            data.saveData();
        } else {
            console.log('Account type must be personal or saving!');
        }
    }
}

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