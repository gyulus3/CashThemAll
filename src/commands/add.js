export default {
    info: 'add <account> <amount>',
    description: 'You can....',
    execute: (data) => ([accountNumber, amount]) => { 
        if(!accountNumber || !amount || isNaN(amount)) {
            console.log('Account number or amount are not valid!');
            return;
        }
        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (!account) {
            console.log('Account not found!');
            return;
        }
        if (account.type !== 'personal') {
            console.log('You can add only for your personal account!');
            return;
        }

        currentAccount.amount += parseInt(amount);
        currentAccount.histories.push({ 
            accountNumber,
            accountOrigin: accountNumber,
            amountBefore: currentAccount.amount - parseInt(amount),
            amountTransfered: amount,
            amountAfter: currentAccount.amount
        });
        data.saveData();
    }
}