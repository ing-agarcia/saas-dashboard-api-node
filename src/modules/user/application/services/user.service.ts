import { UserEntity } from "../../domain/entities/user.entity.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import { CreateUserDTO } from "../dto/user.create.dto.js";
import { UpdateUserDTO } from "../dto/user.update.dto.js";
import { PasswordHasher } from "@/shared/application/password.hasher.js";
import { PaginatedResponse } from "@/shared/http/paginated.response.js";

import { ConflictError } from "@/shared/domain/errors/ConflictError.js";
import { NotFoundError } from "@/shared/domain/errors/NotFoundError.js";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
    ) { }

    async create(data: CreateUserDTO): Promise<UserEntity> {

        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new ConflictError("Email already exists");
        }

        const passwordHash = await this.passwordHasher.hash(data.password);

        const user = UserEntity.create({
            name: data.name,
            email: data.email,
            passwordHash,
            roleId: data.roleId,
            groupId: data.groupId,
            managerId: data.managerId ?? null
        });

        return await this.userRepository.save(user);

    }

    async getById(id: number): Promise<Omit<UserEntity, "passwordHash"> | null> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }

    async update(data: UpdateUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.findById(data.id);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const existing = await this.userRepository.findByEmail(data.email);
        if (existing && existing.id !== user.id) {
            throw new ConflictError("Email already exists");
        }

        if (user.roleId !== data.roleId) {
            user.changeRole(data.roleId);
        }

        user.name = data.name;
        user.email = data.email;
        user.groupId = data.groupId;
        user.managerId = data.managerId;

        return await this.userRepository.update(user);
    }

    async delete(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        user.validateDeletion();

        await this.userRepository.delete(id);
    }

    async getAll(
        userId: number,
        page: number,
        pageSize: number
    ): Promise<PaginatedResponse<UserEntity>> {

        return await this.userRepository.findAll(userId, page, pageSize);
    }

    async getManagersByRole(roleId: number): Promise<UserEntity[]> {

        return await this.userRepository.getManagersByRole(roleId);
    }
}