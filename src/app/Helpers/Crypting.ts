import bcrypt from 'bcrypt';

export default class Hashing {
    private static saltRounds: number = 10;

    public static hash(textToHash: string) {
        return bcrypt.hash(textToHash, this.saltRounds);
    }

    public static compareHash(plainText: string, hashedText: string) {
        return bcrypt.compare(plainText, hashedText);
    }
}