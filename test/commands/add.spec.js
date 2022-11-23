import add from '../../src/commands/add.js';
import { jest } from '@jest/globals'

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [] }
    ]
};

test('Should throw error when user is not logged in.', () => {
    const { data } = setup();
    expect(() => add.execute(data)(['af123456789123', 100]))
            .toThrow('User not logged in!');
});

test('Should throw error when account number is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)([]))
            .toThrow('Account number is not provided!');
});

test('Should throw error when amount is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['af123456789123'])).
            toThrow('Amount is not provided!');
});

test('Should throw error when account number is not valid.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['af1234569123', 100]))
            .toThrow('Account number must be a combination of 2 letters and 12 digits!');
});

test('Should throw error when amount is not a number.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['af123456789123', 'nan']))
            .toThrow('Amount must be between 1 and 9.999.999.999!');
});

test('Should throw error when amount is greater than 9999999999.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['af123456789123', 10000000000]))
            .toThrow('Amount must be between 1 and 9.999.999.999!');
});

test('Should throw error when amount is less than 1.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['af123456789123', -1]))
            .toThrow('Amount must be between 1 and 9.999.999.999!');
});

test('Should throw error when account is not found.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['af123456789123', 100]))
            .toThrow('Account is not found!');
});

test('Should throw error when account is not a personal account.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['aa111222333444', 100]))
            .toThrow('You can add only for your personal account!');
});

test('Should increase amount and add history, when everything is correct.', () => {
    const { data } = setup(mockUser);
    expect(() => add.execute(data)(['bb111222333444', 100]))
            .not.toThrow();

    expect(data.loggedInUser.accounts[1].amount).toBe(100);
    expect(data.loggedInUser.accounts[1].histories.length).toBe(1);
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