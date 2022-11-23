import command from '../../src/commands/profile.js';

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01',
    accounts: [
        { accountNumber: 'aa111222333444', type: 'saving', amount: 0, histories: [], proxies: [] },
        { accountNumber: 'bb111222333444', type: 'personal', amount: 0, histories: [], proxies: ['user'] }
    ]
};

test('Should throw error when user is not logged in.', () => {
    const { data } = setup();
    expect(() => command.execute(data)())
            .toThrow('User is not logged in!');
});

test('Should print the profile details, when user is logged in.', () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { data } = setup(mockUser);
    expect(() => command.execute(data)())
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