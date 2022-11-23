import isAccountNumberValid from '../util/accountNumberValidifier.js';

export default {
    info: 'history <account>',
    description: 'You can check your account transaction history',
    execute: (data) => ([accountNumber]) => {
        if (!data.isLoggedIn()) {
            throw new Error('User not logged in!');
        }
        if (!accountNumber) {
            throw new Error('Account number is not provided!');
        }
        if (!isAccountNumberValid(accountNumber)) {
            throw new Error('Account number must be a combination of 2 letters and 12 digits!');
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (!account) {
            throw new Error('Account does not exist!');
        }

        console.log(`${ accountNumber } history:`)
        account.histories.forEach(({ amountBefore, amountTransfered, amountAfter, accountDestionation }) => {
            console.log('---------------------------------');
            console.log(`before amount: ${ amountBefore }`);
            console.log(`transfered amount: ${ amountTransfered }`);
            console.log(`after amount: ${ amountAfter }`);
            if (accountDestionation) {
                console.log(`destionation account: ${ accountDestionation }`);
            }
            console.log('---------------------------------');
        });

    }
}
