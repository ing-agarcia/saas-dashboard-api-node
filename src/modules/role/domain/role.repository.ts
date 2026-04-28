import { RoleEntity } from "./role.entity.js";

export interface RoleRepository {

    findByName(name: string): Promise<RoleEntity | null>;

    save(role: RoleEntity): Promise<RoleEntity>;

    findAll(): Promise<RoleEntity[]>;

}