import fs from 'fs';
import path from 'path';
import jwt, { SignOptions, VerifyOptions } from './node_modules/jsonwebtoken';

export default class TokenHandler {
    private static issuer: string = 'Sebbe AB';
    private static audience: string = 'https://sebastianberglonn.se';
    private static algoritm: string = 'RS256';

    private static PRIVATE_KEY = fs.readFileSync(path.resolve(`${__dirname}/private.key`), 'utf8');
    private static PUBLIC_KEY = fs.readFileSync(path.resolve(`${__dirname}/public.key`), 'utf8');

    /**
     * 
     * @param userEmail {string} - The payload
     */
    public static createToken(payload: object): string {
        const signOptions: SignOptions = {
            issuer: this.issuer,
            audience: this.audience,
            expiresIn: '7d',
            algorithm: this.algoritm
        };
        return jwt.sign(payload, this.PRIVATE_KEY, signOptions);
    }

    /**
     * 
     * @param token {string}
     * Verifies if the token is valid
     */

    public static verifyToken(token: string) {
        const verifyOptions: VerifyOptions = {
            issuer: this.issuer,
            audience: this.audience,
            algorithms: [this.algoritm]
        };
        try {
            return jwt.verify(token, this.PUBLIC_KEY, verifyOptions);
        } catch (verificationError) {
            return false;
        }
    }

    /**
     * 
     * @param token {string}
     * Verifies the token, then decodes it
     */

    public static decodeToken(token: string) {
        if (!this.verifyToken(token)) {
            return false;
        }
        try {
            return jwt.decode(token, {complete: true});
        } catch(decodeError) {
            return false;
        }
    }
}