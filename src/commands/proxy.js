import isAccountNumberValid from '../util/accountNumberValidifier.js';

export default {
    info: 'proxy <source account> <destination email>',
    description: 'You can introduce a proxy for your account',
    execute: (data) => ([accountNumber, emailDestination]) => {
        if (!data.isLoggedIn()) {
            throw new Error('User is not logged in!');
        }
        if (!accountNumber) {
            throw new Error('Account number is not provided!');
        }
        if (!emailDestination) {
            throw new Error('Email is not provided!');
        }
        if (!isAccountNumberValid(accountNumber)) {
            throw new Error('Account number must be a combination of 2 letters and 12 digits!');
        }
        if (email.length > 20 || email.length < 5) {
            throw new Error('Email must be a combination of 5-20 alpahumeric characters!');
        }

        const account = data.loggedInUser.accounts.find(a => a.accountNumber === accountNumber);
        if (!account) {
            throw new Error('Account does not exist!');
        }

        if (account.type !== 'personal') {
            throw new Error('Only personal accounts can be proxied!');
        }

        let proxiesCount = 0;
        data.loggedInUser.accounts.forEach(a => proxiesCount += a.proxies.length);
        if (proxiesCount > 10) {
            throw new Error('You have the maximum proxies!');
        }

        if(account.proxies.includes(emailDestination)) {
            throw new Error('Email is already proxied to this account!');
        }

        account.proxies.push(emailDestination);
        data.saveData();
    }
}
