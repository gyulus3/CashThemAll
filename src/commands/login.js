export default {
    info: 'login <email> <password>',
    description: 'You can login',
    execute: (data) => ([email, password]) => {
        if(!email || !password) {
            console.log('Email or password is not provided!');
            return;
        }
        if (!password) {
            throw new Error('Password is not provided!');
        }
        if (email.length > 20 || email.length < 5) {
            throw new Error('Email must be a combination of 5-20 alpahumeric characters!');
        }
        if (isNaN(password) || password < 100000000000 || password > 999999999999) {
            throw new Error('Password must be a combination of 12 digits!');
        }

        const userToLogin = data.users.find(u => u.email === email && u.password === password);
        if (userToLogin) {
            data.loginUser(userToLogin);
        } else {
            throw new Error('Email or password are not valid!');
        }
    }
}
