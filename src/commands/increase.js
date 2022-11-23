export default {
    info: 'increase <account>',
    description: 'You can increase the account by adding intrest',
    execute: (data) => (args) => {
        if (!data.isLoggedIn()) {
            throw new Error('User not logged in!');
        }
    }
}
