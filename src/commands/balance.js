import isAccountNumberValid from '../util/accountNumberValidifier.js';

export default {
    info: 'balance <account>',
    description: 'You can....',
    execute: (data) => ([accountNumber]) => { 
        if(!accountNumber) {
            throw new Error('Account number is not provided!');
        }
        if (!data.isLoggedIn()) {
            throw new Error('User not logged in!');
        }
        if (!isAccountNumberValid(accountNumber)) {
            throw new Error('Account number must be a combination of 2 letters and 12 digits!');
        }
        const currentAccount = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (currentAccount) {
            console.log(`${ accountNumber } balance: ${ currentAccount.amount }`);
        } else {
            throw new Error('Account is not found!');
        }
    }
}