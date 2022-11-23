export default {
    info: 'transfer <source account> <destination account> <amount>',
    description: 'You can transfer money to another accounts',
    execute: (data) => ([accountOrigin, accountDestionation, amount]) => {
        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }
        if (!accountOrigin) {
            console.log('Account origin is not provided!');
            return;
        }
        if (!accountDestionation) {
            console.log('Account destination is not provided!');
            return;
        }
        if (!amount || isNaN(amount)) {
            console.log('Amount is not provided!');
            return;
        }
        if (amount > 1000000 || amount < 1) {
            console.log('Amount cannot be greater than 1.000.000 and less than 1.');
            return;
        }



    }
}
