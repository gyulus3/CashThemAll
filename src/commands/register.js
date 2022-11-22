export default {
    info: 'register <email> <password> <name>',
    description: 'You can....',
    execute: (data) => ([email, password, username]) => { 
        if (!data.users.some(u => u.email === email)) {
            /// TODO CHECK PASS MAIL AND NAME
            data.users.push({ email, password, username, accounts: [] });
            data.saveData();
        } else {
            console.log('User already exists!');
        }
    }
}