import { GroupEntity } from "./group.entity.js";

export interface GroupRepository {

    save(group: GroupEntity): Promise<GroupEntity>;

    findByName(group: string): Promise<GroupEntity | null>;

    findAll(): Promise<GroupEntity[]>;

}