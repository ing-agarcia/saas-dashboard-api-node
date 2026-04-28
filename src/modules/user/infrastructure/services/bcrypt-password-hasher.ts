import bcrypt from "bcrypt";
import { PasswordHasher } from "../domain/password-hasher.js";

export class BcryptPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}