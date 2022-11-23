import accountNumberGenerator from "../../src/util/accountNumberGenerator.js";

test('Should generate valid account number with a combination of 2 letters and 12 digits', () => {
    const generatedNumber = accountNumberGenerator();
    expect(new RegExp(/[a-z]{2}\d{12}/g).test(generatedNumber)).toBe(true);
});