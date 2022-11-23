export default {
    info: 'increase <account>',
    description: 'You can increase the account by adding intrest',
    execute: (data) => (args) => {
        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }
    }
}
