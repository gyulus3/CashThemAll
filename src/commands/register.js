export default {
    info: 'register <email> <password> <name>',
    description: 'You can....',
    execute: (data) => ([email, password, username]) => { 
        if(!email || !password || !username) {
            console.log('Email, password or name is not provided!');
            return;
        }
        
        if (!data.users.some(u => u.email === email)) {
            data.users.push({ email, password, username, accounts: [] });
            data.saveData();
        } else {
            console.log('User already exists!');
        }
    }
}