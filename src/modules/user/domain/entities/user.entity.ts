import { DomainError } from "@/shared/domain/errors/DomainError.js";
import { ValidationError } from "@/shared/domain/errors/ValidationError.js";

const ADMIN_ROLE = 1;

export class UserEntity {

    private constructor(
        public readonly id: number | null,
        public name: string,
        public email: string,
        private passwordHash: string,

        public roleId: number,
        public role: { id: number; name: string } | undefined,

        public groupId: number,
        public group: { id: number; name: string } | undefined,

        public managerId: number | null,
        public manager: { id: number; name: string } | undefined,

        public readonly createdAt: Date
    ) { }

    static create(data: {
        name: string,
        email: string,
        passwordHash: string,
        roleId: number,
        groupId: number,
        managerId: number | null
    }): UserEntity {

        if (!data.name.trim()) throw new ValidationError("Name is required");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            throw new ValidationError("Invalid email");
        }

        if (!data.passwordHash) {
            throw new ValidationError("Password is required");
        }

        return new UserEntity(
            null,
            data.name,
            data.email,
            data.passwordHash,
            data.roleId,
            undefined,
            data.groupId,
            undefined,
            data.managerId ?? null,
            undefined,
            new Date()
        );
    }

    static fromPrimitives(data: {
        id: number,
        name: string,
        email: string,
        passwordHash: string,
        roleId: number,
        role: { id: number; name: string } | undefined,
        groupId: number,
        group: { id: number; name: string } | undefined,
        managerId: number | null,
        manager: { id: number; name: string } | undefined,
        createdAt: Date
    }): UserEntity {

        return new UserEntity(
            data.id,
            data.name,
            data.email,
            data.passwordHash,
            data.roleId,
            data.role,
            data.groupId,
            data.group,
            data.managerId,
            data.manager,
            data.createdAt
        );
    }

    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            passwordHash: this.passwordHash,
            roleId: this.roleId,
            groupId: this.groupId,
            managerId: this.managerId,
            createdAt: this.createdAt
        };
    }

    isAdmin(): boolean {
        return this.roleId === ADMIN_ROLE;
    }

    changeRole(newRole: number) {
        if (this.isAdmin()) {
            throw new DomainError("Admin role cannot be changed");
        }
        this.roleId = newRole;
    }

    getPasswordHash() {
        return this.passwordHash;
    }

    validateDeletion(): void {
        if (this.isAdmin()) {
            throw new DomainError("Admin user cannot be deleted");
        }
    }

}
