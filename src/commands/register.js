import { saveData } from "../data.js";

export default {
    info: 'register <email> <password> <name>',
    description: 'You can....',
    execute: (data) => (email, password, username) => { 
        if (data.users.some(u => u.email !== email)) {
            data.users.push({ email, password, username, accounts: [] });
            saveData();
        }
    }
}