import command from '../../src/commands/proxy.js';
import { jest } from '@jest/globals'

const mockUserMaxProxies = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 100, histories: [], proxies: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 100, histories: [], proxies: [ '1', '2', '3', '4', '5', '1', '2', '3', '4', '5'] },
    ]
};

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 100, histories: [], proxies: [] },
        { accountNumber: 'cc111222333444', type: 'personal', amount: 100, histories: [], proxies: [ 'email' ] }
    ]
};

test('Should throw error when user is not logged in.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['af123456789123', 'email']))
            .toThrow('User is not logged in!');
});

test('Should throw error when account is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)([]))
            .toThrow('Account number is not provided!');
});

test('Should throw error when email is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123']))
            .toThrow('Email is not provided!');
});

test('Should throw error when account is not valid.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af12349123', 'email']))
            .toThrow('Account number must be a combination of 2 letters and 12 digits!');
});

test('Should throw error when email is less character than 5.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'emai'])).
            toThrow('Email must be a combination of 5-20 alpahumeric characters!');
});

test('Should throw error when email is more character than 20.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'email1234567789123111111'])).
            toThrow('Email must be a combination of 5-20 alpahumeric characters!');
});

test('Should throw error when account is not found.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'email']))
            .toThrow('Account is not found!');
});

test('Should throw error when account is not personal.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['aa111222333444', 'email']))
            .toThrow('Only personal accounts can be proxied!');
});

test('Should throw error when account has 10 proxies already.', () => {
    const { data } = setup(mockUserMaxProxies);
    expect(() => command.execute(data)(['bb111222333444', 'email']))
            .toThrow('You have the maximum proxies!');
});

test('Should throw error when account has proxies to this email already.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['cc111222333444', 'email']))
            .toThrow('Email is already proxied to this account!');
});


test('Should transfer amount, when account has enought amount.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['cc111222333444', 'email1']))
            .not.toThrow();

    expect(data.loggedInUser.accounts[1].proxies).toContain('email1');
    expect(data.loggedInUser.accounts[1].proxies.length).toBe(2);
    expect(data.saveData).toHaveBeenCalledTimes(1);
});


const setup = (loggedInUser = null) => {
    const data = {
        saveData: jest.fn(),
        isLoggedIn: () => loggedInUser !== null,
        loggedInUser
    };
    return { data };
}