import { RoleRepository } from "../domain/role.repository.js";
import { RoleEntity } from "../domain/role.entity.js";
import { RoleModel } from "./models/role.model.js";

export class RoleRepositoryImpl implements RoleRepository {

  private mapToDomain = (model: RoleModel): RoleEntity => {
    return RoleEntity.fromPrimitives({
      id: model.id,
      name: model.name
    });
  }

  async save(role: RoleEntity): Promise<RoleEntity> {

    const created = await RoleModel.create({
      name: role.name,
    })

    return this.mapToDomain(created);
  }

  async findByName(name: string): Promise<RoleEntity | null> {

    const result = await RoleModel.findOne({
      where: { name }
    })

    if (!result) return null;

    return this.mapToDomain(result);
  }

  async findAll(): Promise<RoleEntity[]> {

    const roles = await RoleModel.findAll();

    return roles.map(this.mapToDomain);
  }

}