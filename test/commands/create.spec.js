import command from '../../src/commands/create.js';
import { jest } from '@jest/globals'

const mockUserWith5Personal = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] }
    ]
};

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] }
    ]
};

test('Should throw error when user is not logged in.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['personal']))
            .toThrow('User is not logged in!');
});

test('Should throw error when user has 5 personal accounts.', () => {
    const { data } = setup(mockUserWith5Personal);
    expect(() => command.execute(data)(['personal']))
            .toThrow('Cannot create more personal accounts!');
});

test('Should throw error when type is not personal nor saving.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['different']))
            .toThrow('Account type must be personal or saving!');
});

test('Should create new account, when everything is fine.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['personal']))
            .not.toThrow();
    expect(mockUser.accounts.length).toBe(5);
    expect(data.saveData).toHaveBeenCalledTimes(1);
});

const setup = (loggedInUser = null) => {
    const data = {
        saveData: jest.fn(),
        isLoggedIn: () => loggedInUser !== null,
        loggedInUser,
    };
    return { data };
}