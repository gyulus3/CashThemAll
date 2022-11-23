import command from '../../src/commands/increase.js';

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


test('Should not throw error, when user is logged in.', () => {
    const { data } = setup(mockUser);
    expect(() => command.execute(data)(['bb111222333444']))
            .not.toThrow();
});

const setup = (loggedInUser = null) => {
    const data = {
        isLoggedIn: () => loggedInUser !== null,
        loggedInUser,
    };
    return { data };
}