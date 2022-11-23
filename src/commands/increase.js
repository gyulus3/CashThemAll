export default {
    info: 'increase <account>',
    description: 'You can....',
    execute: (data) => (args) => { 
        if (!data.isLoggedIn()) {
            console.log('User not logged in!');
            return;
        }
    }
}