import { UserEntity } from "../../domain/entities/user.entity.js";
import { UserModel } from "../models/user.model.js";

export class UserMapperModel {

    static toEntity(model: UserModel): UserEntity {
        const data = model.get({ plain: true });

        return UserEntity.fromPrimitives({
            id: data.id,
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,

            roleId: data.roleId,
            role: data.role
                ? { id: data.role.id, name: data.role.name }
                : undefined,

            groupId: data.groupId,
            group: data.group
                ? { id: data.group.id, name: data.group.name }
                : undefined,

            managerId: data.managerId ?? null,
            manager: data.manager
                ? { id: data.manager.id, name: data.manager.name }
                : undefined,

            createdAt: data.createdAt
        });
    }

    static toEntityList(models: UserModel[]): UserEntity[] {
        return models.map(this.toEntity);
    }

    static toPersistence(entity: UserEntity) {
        return entity.toPrimitives();
    }

}