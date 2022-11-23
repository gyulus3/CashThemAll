import accountNumberValidifier from "../../src/util/accountNumberValidifier.js";

test('Should say correct, when its correct.', () => {
    expect(accountNumberValidifier('ab123456789123')).toBe(true);
});

test('Should say incorrect, when its incorrect.', () => {
    expect(accountNumberValidifier('ab1234563')).toBe(false);
});