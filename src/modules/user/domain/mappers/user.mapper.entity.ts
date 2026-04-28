import { UserHierarchyDTO } from "../../application/dto/user.hierarchy.dto.js";
import { ResponseUserDTO } from "../../application/dto/user.response.dto.js";
import { UserEntity } from "../entities/user.entity.js";

export class UserMapperEntity {

    static toDto(entity: UserEntity): ResponseUserDTO {
        return {
            id: entity.id!,
            name: entity.name,
            email: entity.email,

            roleId: entity.roleId,
            role: entity.role?.name ?? null,

            groupId: entity.groupId,
            group: entity.group?.name ?? null,

            managerId: entity.managerId,
            manager: entity.manager?.name ?? null,

            createdAt: entity.createdAt,
        };
    }

    static toDtoList(entities: UserEntity[]): ResponseUserDTO[] {
        return entities.map(this.toDto);
    }

    static toHierarchyDto(entity: UserEntity): UserHierarchyDTO {
        if (!entity.id) {
            throw new Error("User must have an id");
        }

        return {
            id: entity.id,
            name: entity.name,
        };
    }

    static toHierarchyDtoList(entities: UserEntity[]): UserHierarchyDTO[] {
        return entities.map(this.toHierarchyDto);
    }

}