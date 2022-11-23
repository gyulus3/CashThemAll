import register from '../../src/commands/register.js';
import { jest } from '@jest/globals'

const mockUser = {
    email: 'user@user.com',
    password: '12345',
    username: 'user01'
};

test('Should throw error when email is not provided.', () => {
    const { data } = setup();
    expect(() => register.execute(data)([]))
            .toThrow('Email is not provided!');
});

test('Should throw error when password is not provided.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['user@user.com'])).
            toThrow('Password is not provided!');
});

test('Should throw error when name is not provided.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['user@user.com', '123456789123'])).
            toThrow('Name is not provided!');
});

test('Should throw error when email is not valid.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['us', '123456789123', 'myname'])).
            toThrow('Email must be a combination of 5-20 alpahumeric characters!');
});

test('Should throw error when password is not a number.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['user@user.com', 'asdasd', 'myname'])).
            toThrow('Password must be a combination of 12 digits!');
});

test('Should throw error when password is less digits than 12.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['user@user.com', '11111', 'myname'])).
            toThrow('Password must be a combination of 12 digits!');
});

test('Should throw error when password is more digits than 12.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['user@user.com', '11111111111111111111', 'myname'])).
            toThrow('Password must be a combination of 12 digits!');
});

test('Should throw error when name is less chars than 5.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['user@user.com', '111111111111', 'my'])).
            toThrow('Name must be a combination of 5-20 alpahumeric characters!');
});

test('Should throw error when name is more chars than 20.', () => {
    const { data } = setup();
    expect(() => register.execute(data)(['user@user.com', '111111111111', 'mynamemynamenymenaasd'])).
            toThrow('Name must be a combination of 5-20 alpahumeric characters!');
});

test('Should throw error when email is already in use.', () => {
    const { data } = setup([mockUser]);
    expect(() => register.execute(data)(['user@user.com', '111111111111', 'myname'])).
            toThrow('User with this email already exists!');
});

test('Should register user, when every attributes are correct.', () => {
    const { data } = setup([mockUser]);
    expect(() => register.execute(data)(['user1@user.com', '111111111111', 'myname'])).
            not.toThrow();
    expect(data.users).toContainEqual({ email: 'user1@user.com', password: '111111111111', username: 'myname', accounts: [] });
    expect(data.users.length).toBe(2);
    expect(data.saveData).toHaveBeenCalledTimes(1);
});

const setup = (defaultUsers = []) => {
    const data = {
        users: defaultUsers,
        saveData: jest.fn(),
    };
    return { data };
}