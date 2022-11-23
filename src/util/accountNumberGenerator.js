const VALID_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const VALID_NUMBERS = '0123456789';

export default () => {
    let result = '';
    for (let i = 0; i < 14; i++) {
        if (i === 0 || i === 1) {
            result += VALID_CHARACTERS.charAt(Math.floor(Math.random() * VALID_CHARACTERS.length));
        } else {
            result += VALID_NUMBERS.charAt(Math.floor(Math.random() * VALID_NUMBERS.length));
        }
    }
    return result;
}
