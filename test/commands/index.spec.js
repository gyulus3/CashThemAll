import { isCommandExit, isCommandInvalid } from "../../src/commands/index.js";

test('IsCommandExit should return true when command is exit.', () => {
    expect(isCommandExit('exit')).toBe(true);
});

test('IsCommandExit should return false when command is not exit.', () => {
    expect(isCommandExit('different')).toBe(false);
});

test('IsCommandInvalid should return false when command exists.', () => {
    expect(isCommandInvalid('profile')).toBe(false);
});

test('IsCommandInvalid should return true when command is undefined', () => {
    expect(isCommandInvalid()).toBe(true);
});

test('IsCommandInvalid should return true when command does not exist.', () => {
    expect(isCommandInvalid('different')).toBe(true);
});