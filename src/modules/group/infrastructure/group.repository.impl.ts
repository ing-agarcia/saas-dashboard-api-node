import { GroupEntity } from "../domain/group.entity.js";
import { GroupRepository } from "../domain/group.repository.js";
import { GroupModel } from "./models/group.model.js";

export class GroupRepositoryImpl implements GroupRepository {

  private mapToDomain = (model: GroupModel): GroupEntity => {
    return GroupEntity.fromPrimitives({
      id: model.id,
      name: model.name
    });
  }

  async save(group: GroupEntity): Promise<GroupEntity> {
    const created = await GroupModel.create({
      name: group.name
    });

    return this.mapToDomain(created);
  }

  async findByName(name: string): Promise<GroupEntity | null> {
    const group = await GroupModel.findOne({
      where: { name: name }
    });

    if (!group) return null;

    return group ? this.mapToDomain(group) : null;
  }

  async findAll(): Promise<GroupEntity[]> {
    const groups = await GroupModel.findAll();

    return groups.map(this.mapToDomain

    );
  }

}