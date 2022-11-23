import command from '../../src/commands/transfer.js';
import { jest } from '@jest/globals'

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 100, histories: [] },
    ]
};

test('Should throw error when user is not logged in.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['af123456789123', 'af123456789123', 100]))
            .toThrow('User is not logged in!');
});

test('Should throw error when account origin is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)([]))
            .toThrow('Account origin is not provided!');
});

test('Should throw error when account destination is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123']))
            .toThrow('Account destination is not provided!');
});

test('Should throw error when account origin is not valid.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af12349123', 'af123456789123', 100]))
            .toThrow('Account number must be a combination of 2 letters and 12 digits!');
});

test('Should throw error when account destination is not valid.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'af1239123', 100]))
            .toThrow('Account number must be a combination of 2 letters and 12 digits!');
});

test('Should throw error when amount is not provided.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'af123456789123'])).
            toThrow('Amount is not provided!');
});

test('Should throw error when amount is not a number.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'af123456789123', 'nan']))
            .toThrow('Amount is not provided!');
});

test('Should throw error when amount is greater than 1000000.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'af123456789123', 10000001]))
            .toThrow('Amount cannot be greater than 1.000.000 and less than 1!');
});

test('Should throw error when amount is less than 1.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['aa111222333444', 'af123456789123', -1]))
            .toThrow('Amount cannot be greater than 1.000.000 and less than 1!');
});

test('Should throw error when account origin is not found.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['af123456789123', 'af123456789123', 1000]))
            .toThrow('Account is not found!');
});

test('Should throw error when account has not enough amount.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['aa111222333444', 'af123456789123', 1000]))
            .toThrow('Not enough amount on account!');
});

test('Should throw error when account destination is not found.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['aa111222333444', 'af123456789123', 100]))
            .toThrow('Destination is not found!');
});


test('Should transfer amount, when account has enought amount.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['aa111222333444', 'bb111222333444', 50]))
            .not.toThrow();

    expect(data.loggedInUser.accounts[0].amount).toBe(50);
    expect(data.loggedInUser.accounts[0].histories.length).toBe(1);
    expect(data.users[0].accounts[0].amount).toBe(150);
    expect(data.users[0].accounts[0].histories.length).toBe(1);
    expect(data.saveData).toHaveBeenCalledTimes(1);
});


const setup = (loggedInUser = null) => {
    const data = {
        saveData: jest.fn(),
        isLoggedIn: () => loggedInUser !== null,
        loggedInUser,
        users: [
            {
                email: 'user@user.com',
                password: '12345',
                username: 'user01',
                accounts: [ 
                    { accountNumber: 'bb111222333444', type: 'personal', amount: 100, histories: [] }
                ] 
            }
        ]
    };
    return { data };
}