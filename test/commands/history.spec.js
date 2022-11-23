import command from '../../src/commands/history.js';
import { jest } from '@jest/globals'

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 0, histories: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [
            { amountBefore: 100, amountTransfered: 10, amountAfter: 110, accountDestionation: 'asd1234' },
            { amountBefore: 100, amountTransfered: 10, amountAfter: 110 },
            { amountBefore: 100, amountTransfered: 10, amountAfter: 110 },
            { amountBefore: 100, amountTransfered: 10, amountAfter: 110, accountDestionation: 'asd1234' }
        ] }
    ]
};

test('Should throw error when user is not logged in.', () => {
    const { data } = setup();
    expect(() => command.execute(data)([]))
            .toThrow('User is not logged in!');
});

test('Should throw error when account number is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)([]))
            .toThrow('Account number is not provided!');
});

test('Should throw error when account number is not valid.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af1234569123']))
            .toThrow('Account number must be a combination of 2 letters and 12 digits!');
});

test('Should throw error when account is not found.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123']))
            .toThrow('Account is not found!');
});

test('Should print history of the account, if exists.', () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['bb111222333444']))
            .not.toThrow();

    expect(logSpy).toHaveBeenCalled();
});

const setup = (loggedInUser = null) => {
    const data = {
        isLoggedIn: () => loggedInUser !== null,
        loggedInUser,
    };
    return { data };
}