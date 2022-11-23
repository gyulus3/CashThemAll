import command from '../../src/commands/login.js';
import { jest } from '@jest/globals'

const mockUser = {
    email: 'user@user.com',
    password: 111111111111,
    username: 'user01',
};

test('Should throw error when email is not provided.', () => {
    const { data } = setup();
    expect(() => command.execute(data)([]))
            .toThrow('Email is not provided!');
});

test('Should throw error when password is not provided.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['email']))
            .toThrow('Password is not provided!');
});

test('Should throw error when email is less than 5 chars.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['emai', 111111111111]))
            .toThrow('Email must be a combination of 5-20 alpahumeric characters!');
});

test('Should throw error when email is more than 20 chars.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['emailemailemailemail123451251251', 111111111111]))
            .toThrow('Email must be a combination of 5-20 alpahumeric characters!');
});

test('Should throw error when password is not a number.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['email', 'nan']))
            .toThrow('Password must be a combination of 12 digits!');
});

test('Should throw error when password is less than 12 digits.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['email', 100000000]))
            .toThrow('Password must be a combination of 12 digits!');
});

test('Should throw error when password is more than 12 digits.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['email', 1111111111111]))
            .toThrow('Password must be a combination of 12 digits!');
});

test('Should throw error when email is incorrect.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['email', 111111111111]))
            .toThrow('Email or password are not valid!');
});

test('Should throw error when password is incorrect.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['user@user.com', 111111111110]))
            .toThrow('Email or password are not valid!');
});

test('Should transfer amount, when account has enought amount.', () => {
    const { data } = setup();
    expect(() => command.execute(data)(['user@user.com', 111111111111]))
            .not.toThrow();

    expect(data.loginUser).toHaveBeenCalledWith(mockUser);
});

const setup = () => {
    const data = {
        users: [
            mockUser,
        ],
        loginUser: jest.fn(),
    };
    return { data };
}