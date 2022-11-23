export default {
    info: 'profile',
    description: 'You can....',
    execute: (data) => () => {
        if (!data.isLoggedIn()) {
            throw new Error('User is not logged in!');
        }
        printUserDetail(data.loggedInUser)
    }
}

const printUserDetail = ({ email, username, accounts }) => {
    console.log(`email: ${ email }`);
    console.log(`name: ${ username }`);
    console.log('accounts:');
    accounts.forEach(printAccount); 
}

const printAccount = ({ accountNumber, amount, type, proxies }) => {
    console.log(`  ${accountNumber}`);
    console.log(`    -type: ${type}`);
    console.log(`    -amount: ${amount}`);
    console.log('    -proxies:');
    proxies.forEach(printProxy);
}

const printProxy = (proxy) => {
    console.log(`      -${ proxy }`);
}