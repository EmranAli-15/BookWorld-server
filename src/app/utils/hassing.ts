const bcrypt = require('bcrypt');
const saltRounds = 10;

export const makeHash = async (password: string) => {
    const encrypted = await bcrypt.hash(password, saltRounds);
    return encrypted;
};

export const decryptHash = async (plain: string, hash: string) => {
    const decrypted = await bcrypt.compare(plain, hash);
    return decrypted;
}