import { UserRepository } from "../../domain/repositories/user.repository.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { PaginatedResult } from "@/shared/domain/paginated-result.js";
import { UserModel } from "../models/user.model.js";
import { NotFoundError } from "@/shared/domain/errors/NotFoundError.js";
import { UserHierarchyModel } from "../models/user.hierarchy.model.js";
import { RoleHierarchyModel } from "@/modules/role/infrastructure/models/role.hierarchy.model.js";
import { ValidationError } from "@/shared/domain/errors/ValidationError.js";
import { UserMapperModel } from "../domain/user.mapper.model.js";
import { Op } from "sequelize";

export class UserRepositoryImpl implements UserRepository {

    // ----- dominio -----
    async save(user: UserEntity): Promise<UserEntity> {

        const created = await UserModel.create({
            name: user.name,
            email: user.email,
            passwordHash: user.getPasswordHash(),
            roleId: user.roleId,
            groupId: user.groupId,
            managerId: user.managerId,
            createdAt: user.createdAt
        })

        return UserMapperModel.toEntity(created);

    }

    async findByEmail(email: string): Promise<UserEntity | null> {

        const user = await UserModel.findOne({
            where: { email },
        })

        return user ? UserMapperModel.toEntity(user) : null;
    }

    async findById(id: number): Promise<UserEntity | null> {
        const user = await UserModel.findOne({
            where: { id },
        })

        return user ? UserMapperModel.toEntity(user) : null;
    }

    async update(user: UserEntity): Promise<UserEntity> {

        if (!user || !user.id || !user.managerId) {
            throw new NotFoundError("User not found");
        }

        const existing = await UserModel.findByPk(user.id);

        if (!existing) {
            throw new NotFoundError("User not found");
        }

        existing.name = user.name;
        existing.email = user.email;
        existing.roleId = user.roleId;
        existing.groupId = user.groupId;
        existing.managerId = user.managerId;

        const update = await existing.save();

        return UserMapperModel.toEntity(update);
    }

    async delete(id: number): Promise<void> {
        await UserModel.destroy({
            where: { id }
        })
    }

    // ----- lectura para API -----
    async findAll(
        userId: number,
        page: number = 0,
        pageSize: number = 50
    ): Promise<PaginatedResult<UserEntity>> {

        const offset = Math.max(0, page) * pageSize;

        const hierarchy = await UserHierarchyModel.findAll({
            where: { parentUserId: userId }
        });

        const childIds = hierarchy.map(h => h.childUserId);

        if (childIds.length === 0) {
            return {
                data: [],
                total: 0,
                page,
                pageSize
            };
        }

        const total = childIds.length;

        const rows = await UserModel.findAll({
            include: ["role", "group", "manager"],
            where: {
                id: childIds
            },
            limit: pageSize,
            offset: offset,
            order: [
                ['roleId', 'ASC']
            ],
        });

        return {
            data: UserMapperModel.toEntityList(rows),
            total,
            page,
            pageSize
        };
    }

    async findUserById(id: number): Promise<UserEntity | null> {

        const user = await UserModel.findByPk(id, {
            include: ["role", "group", "manager"],
        });

        return user ? UserMapperModel.toEntity(user) : null;

    };

    async getManagersByRole(roleId: number): Promise<UserEntity[] | []> {

        const hierarchy = await RoleHierarchyModel.findOne({
            where: { roleId }
        });

        if (!hierarchy) {
            throw new ValidationError("Role hierarchy not defined");
        }

        const parentRoleId = hierarchy.parentRoleId;

        const users = await UserModel.findAll({
            attributes: ["id", "name"],
            where: { roleId: parentRoleId },
            include: ["role", "group", "manager"]
        });

        return UserMapperModel.toEntityList(users);

    }

    async findAllForReport(userId: number): Promise<UserEntity[]> {

        const hierarchy = await UserHierarchyModel.findAll({
            where: { parentUserId: userId }
        });

        const childIds = hierarchy.map(h => h.childUserId);

        if (childIds.length === 0) {
            return []
        }

        const rows = await UserModel.findAll({
            include: ["role", "group", "manager"],
            where: {
                id: {
                    [Op.in]: childIds
                }
            },
            order: [
                ['roleId', 'ASC']
            ],
        });

        return UserMapperModel.toEntityList(rows);
    }

    async findUsersByRole(roleId: number): Promise<UserEntity[] | []> {

        const users = await UserModel.findAll({
            attributes: ["id", "name"],
            where: { roleId: roleId },
            include: ["role", "group", "manager"]
        });

        return UserMapperModel.toEntityList(users);
    }
}