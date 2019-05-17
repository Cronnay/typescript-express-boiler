import { User } from '../Models/UserModel';
import { Token } from '../Models/TokenModel';
import Hashing from '../Helpers/Crypting';
import TokenHandler from './Tokenhandler';
import { ICreateUser } from '../Interfaces/ICreateUser';

export default class AuthenticationHandler {
    /**
     * 
     * @param email {string}
     * @param password {string}
     */
    public static async loginUser(email: string, password: string) {
        try {
            const user = await User.findOne({ username: email });
            if (!user) {
                throw 'No user was found.';
            }

            if (await Hashing.compareHash(password, user.password)) {
                const generatedToken = TokenHandler.createToken({ userEmail: email, password: user.password });
                const hashedToken = await Hashing.hash(generatedToken);
                const token = new Token();
                token.token = hashedToken;
                token.user = user;
                token.save();
                return this.returnMethod(generatedToken);
            } else {
                throw 'Password doesn\'t match'; 
            }
        } catch(userError) {
            return { status: false, message: userError };
        }
    }
    /**
     * 
     * @param user {ICreateUser}
     * Creates user and saves it.
     */
    public static async createUser(user: ICreateUser) {
        try {
            const createdUser = new User();
            createdUser.name = user.name;
            createdUser.username = user.username;
            createdUser.password = await Hashing.hash(user.password);
            createdUser.save();
            return this.returnMethod({});
        } catch (userError) {
            return { status: false, message: userError }
        }
    }

    private static returnMethod(returnObject: string | object) {
        return { status: true, message: returnObject };
    }
}