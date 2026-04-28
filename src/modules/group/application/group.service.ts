import { ConflictError } from "@/shared/domain/errors/ConflictError.js";
import { GroupEntity } from "../domain/group.entity.js";
import { GroupRepository } from "../domain/group.repository.js";

export class GroupService {

    constructor(
        private readonly groupRepository: GroupRepository
    ) { }

    async createGroup(data: { name: string }): Promise<GroupEntity> {

        const existing = await this.groupRepository.findByName(data.name);
        if (existing) {
            throw new ConflictError("Role already exists");
        }

        const group = GroupEntity.create({
            name: data.name
        })

        return await this.groupRepository.save(group);

    }

    async getGroups(): Promise<GroupEntity[]> {
        return await this.groupRepository.findAll();
    }

}