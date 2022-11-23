export default {
    info: 'register <email> <password> <name>',
    description: 'You can....',
    execute: (data) => ([email, password, username]) => {
        if (!email) {
            throw new Error('Email is not provided!');
        }
        if (!password) {
            throw new Error('Password is not provided!');
        }
        if (!username) {
            throw new Error('Name is not provided!');
        }

        if (email.length > 20 || email.length < 5) {
            throw new Error('Email must be a combination of 5-20 alpahumeric characters!');
        }
        if (isNaN(password) || password < 100000000000 || password > 999999999999) {
            throw new Error('Password must be a combination of 12 digits!');
        }
        if (username.length > 20 || username.length < 5) {
            throw new Error('Name must be a combination of 5-20 alpahumeric characters!');
        }

        if (!data.users.some(u => u.email === email)) {
            data.users.push({ email, password, username, accounts: [] });
            data.saveData();
        } else {
            throw new Error('User with this email already exists!');
        }
    }
}