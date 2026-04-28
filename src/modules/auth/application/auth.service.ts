import jwt from "jsonwebtoken";
import { UserRepository } from "@/modules/user/domain/repositories/user.repository.js";
import { PasswordHasher } from "@/modules/user/domain/password-hasher.js";
import { ConflictError } from "@/shared/domain/errors/ConflictError.js";
import { NotFoundError } from "@/shared/domain/errors/NotFoundError.js";
import { UnauthorizedError } from "@/shared/domain/errors/UnauthorizedError.js";
import { UserMapperEntity } from "@/modules/user/domain/mappers/user.mapper.entity.js";

export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly jwtSecret: string
    ) { }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user || !user.id) {
            throw new NotFoundError("User not found");
        }

        const isValid = await this.passwordHasher.compare(
            password,
            user.getPasswordHash()
        );

        if (!isValid) {
            throw new ConflictError("Invalid credentials");
        }

        const data = await this.userRepository.findUserById(user.id);
        if (!data) {
            throw new NotFoundError("User not found");
        }

        const result = UserMapperEntity.toDto(data);

        const token = jwt.sign(
            {
                id: result.id,
                email: result.email,
                roleId: result.roleId,
            },
            this.jwtSecret,
            { expiresIn: "1h" }
        );

        return {
            token,
            user: result
        };
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, this.jwtSecret) as {
                id: number;
                email: string;
                roleId: number;
            };
        } catch {
            throw new UnauthorizedError("Invalid token");
        }
    }

    async getProfile(userId: number) {
        const user = await this.userRepository.findUserById(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return {
            user: user
        };
    }

}