export default {
    info: 'increase <account>',
    description: 'You can increase the account by adding intrest',
    execute: (data) => () => {
        if (!data.isLoggedIn()) {
            throw new Error('User is not logged in!');
        }
    }
}
