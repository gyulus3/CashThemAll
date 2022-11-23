export default {
    info: 'proxy <source account> <destination email>',
    description: 'You can introduce a proxy for your account',
    execute: (data) => ([accountNumber, emailDestination]) => {
        if (!accountNumber || !emailDestination) {
            console.log('Account number or destination email is not provided!');
            return;
        }

        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (!account) {
            console.log('Account does not exist!');
            return;
        }

        let proxiesCount = 0;
        data.loggedInUser.accounts.forEach(a => proxiesCount += a.proxies.length);
        if (proxiesCount > 10) {
            console.log('You have the maximum proxies!');
            return;
        }

        if(account.proxies.includes(emailDestination)) {
            console.log('Email is already proxied to this account!');
            return;
        }

        account.proxies.push(emailDestination);
        data.saveData();
    }
}
