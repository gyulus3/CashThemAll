export default {
    info: 'balance <account>',
    description: 'You can....',
    execute: (data) => ([accountNumber]) => { 
        if(!accountNumber) {
            console.log('Account number is invalid!');
            return;
        }
        if (data.loggedInUser === null) {
            console.log('User not logged in!');
            return;
        }
        const currentAccount = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (currentAccount) {
            console.log(`${ accountNumber } balance: ${ currentAccount.amount }`);
        } else {
            console.log('Account not found!');
        }
    }
}