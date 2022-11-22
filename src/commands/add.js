export default {
    info: 'add <account> <amount>',
    description: 'You can....',
    execute: (data) => ([accountNumber, amount]) => { 
        if(!accountNumber || !amount || isNaN(amount)) {
            console.log('Account number or amount are not valid!');
            return;
        }
        if (data.loggedInUser === null) {
            console.log('User not logged in!');
            return;
        }
        const currentAccount = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (currentAccount) {
            currentAccount.amount += parseInt(amount);
            data.saveData();
        } else {
            console.log('Account not found!');
        }
    }
}