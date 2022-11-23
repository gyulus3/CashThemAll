import { loggedInUser, isLoggedIn, loginUser } from '../src/data.js';

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] }
    ]
};

test('After logining is user, the variable should contain the logged in user.', () => {
    expect(loggedInUser).toBe(null);
    expect(isLoggedIn()).toBe(false);
    
    loginUser(mockUser);

    expect(loggedInUser).toBe(mockUser);
    expect(isLoggedIn()).toBe(true);
});