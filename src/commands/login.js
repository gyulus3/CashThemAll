export default {
    info: 'login <email> <password>',
    description: 'You can login',
    execute: (data) => ([email, password]) => {
        if(!email || !password) {
            console.log('Email or password is not provided!');
            return;
        }
        const userToLogin = data.users.find(u => u.email === email && u.password === password);
        if (userToLogin) {
            data.loginUser(userToLogin);
        } else {
            console.log('Email or password are not valid!');
        }
    }
}
