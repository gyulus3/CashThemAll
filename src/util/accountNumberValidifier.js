
export default (accountNumber) => {
    const REGEX = new RegExp(/[a-z]{2}\d{12}/g);
    return REGEX.test(accountNumber);
}