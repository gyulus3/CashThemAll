import isAccountNumberValid from '../util/accountNumberValidifier.js';

export default {
    info: 'transfer <source account> <destination account> <amount>',
    description: 'You can transfer money to another accounts',
    execute: (data) => ([accountOrigin, accountDestionation, amount]) => {
        if (!data.isLoggedIn()) {
            throw new Error('User is not logged in!');
        }
        if (!accountOrigin) {
            throw new Error('Account origin is not provided!');
        }
        if (!accountDestionation) {
            throw new Error('Account destination is not provided!');
        }
        if (!isAccountNumberValid(accountOrigin) || !isAccountNumberValid(accountDestionation)) {
            throw new Error('Account number must be a combination of 2 letters and 12 digits!');
        }
        if (!amount || isNaN(amount)) {
            throw new Error('Amount is not provided!');
        }
        if (parseInt(amount) > 1000000 || parseInt(amount) < 1) {
            throw new Error('Amount cannot be greater than 1.000.000 and less than 1!');
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountOrigin);
        if (!account) {
            throw new Error('Account is not found!');
        }
        if (account.amount < parseInt(amount)) {
            throw new Error('Not enough amount on account!');
        }

        const destionationUser = data.users.find(u => u.accounts.some(a => a.accountNumber === accountDestionation));
        const destination = destionationUser?.accounts.find(a => a.accountNumber === accountDestionation);
        if (!destination || !destionationUser) {
            throw new Error('Destination is not found!');
        }
        destination.histories.push({
            accountOrigin,
            accountDestionation,
            amountBefore: destination.amount,
            amountTransfered: amount,
            amountAfter: destination.amount + parseInt(amount)
        });
        account.histories.push({
            accountOrigin,
            accountDestionation,
            amountBefore: account.amount,
            amountTransfered: amount,
            amountAfter: destination.amount - parseInt(amount)
        });
        destination.amount += parseInt(amount);
        account.amount -= parseInt(amount);

        data.saveData();
    }
}
