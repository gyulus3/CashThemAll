import register from '../../src/commands/register.js';
import { jest } from '@jest/globals'

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01'
};

test('Should add the new registered user, when the data array was empty.', () => {
    const { data } = setup();

    register.execute(data)(mockUser.email, mockUser.password, mockUser.username);

    expect(data.users[0]).toStrictEqual({ ...mockUser, accounts: [] });
    expect(data.users.length).toBe(1);
    expect(data.saveData).toHaveBeenCalledTimes(1);
});

test('Should not add the new registered user, when the data array already contained the email.', () => {
    const defaultUsers = [
        { email: mockUser.email, password: '1111', username: 'aaaa', accounts: [] }
    ];
    const { data } = setup(defaultUsers);

    register.execute(data)(mockUser.email, mockUser.password, mockUser.username);

    expect(data.users.length).toBe(1);
    expect(data.saveData).toHaveBeenCalledTimes(0);
});

const setup = (defaultUsers = []) => {
    const data = {
        users: defaultUsers,
        saveData: jest.fn(),
    };
    return { data };
}