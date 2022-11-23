export default {
    info: 'history <account>',
    description: 'You can check your account transaction history',
    execute: (data) => ([accountNumber]) => {
        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }
        if (!accountNumber) {
            console.log('Account number is not provided!');
            return;
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (!account) {
            console.log('Account does not exist!');
            return;
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
