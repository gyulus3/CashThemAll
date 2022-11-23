import isAccountNumberValid from '../util/accountNumberValidifier.js';

export default {
    info: 'withdraw <account> <amount>',
    description: 'You can withdraw the money from the account',
    execute: (data) => ([accountNumber, amount]) => {
        if (!data.isLoggedIn()) {
            throw new Error('User is not logged in!');
        }
        if(!accountNumber) {
            throw new Error('Account number is not provided!');
        }
        if(!amount){
            throw new Error('Amount is not provided!');
        }
        if (!isAccountNumberValid(accountNumber)) {
            throw new Error('Account number must be a combination of 2 letters and 12 digits!');
        }
        if (isNaN(amount) || amount < 0 || amount > 9999999999) {
            throw new Error('Amount must be between 1 and 9.999.999.999!');
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (!account) {
            throw new Error('Account is not found!');
        }

        if (account.type !== 'personal') {
            throw new Error('You can withdraw only from your personal account!');
        }

        if (account.amount < amount) {
            throw new Error('Not enough amount on account!');
        }

        account.amount -= parseInt(amount);
        account.histories.push({
            accountNumber,
            accountOrigin: accountNumber,
            amountBefore: account.amount + parseInt(amount),
            amountTransfered: amount,
            amountAfter: account.amount
        });
        data.saveData();
    }
}
