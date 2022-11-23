export default {
    info: 'increase <account>',
    description: 'You can....',
    execute: (data) => () => { 
        if (!data.isLoggedIn()) {
            throw new Error('User not logged in!');
        }
    }
}