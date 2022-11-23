export default {
    info: 'transfer <source account> <destination account> <amount>',
    description: 'You can....',
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
        if (!amount || isNaN(amount)) {
            throw new Error('Amount is not provided!');
        }
        if (amount > 1000000 || amount < 1) {
            throw new Error('Amount cannot be greater than 1.000.000 and less than 1!');
        }
        
    }
}