export default {
    info: 'withdraw <account> <amount>',
    description: 'You can withdraw the money from the account',
    execute: (data) => ([accountNumber, amount]) => {
        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }

        if(!accountNumber) {
            console.log('Account number is not provided!');
            return;
        }
        if(!amount || isNaN(amount)) {
            console.log('Amount is not provided!');
            return;
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (!account) {
            console.log('Account does not exsit!');
            return;
        }

        if (account.type !== 'personal') {
            console.log('You can withdraw only from your personal account!');
            return;
        }

        if (account.amount < amount) {
            console.log('Not enough amount on account!');
            return;
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
