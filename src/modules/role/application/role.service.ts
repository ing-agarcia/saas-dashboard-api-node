import { ConflictError } from "@/shared/domain/errors/ConflictError.js";
import {
    RoleEntity

} from "../domain/role.entity.js";
import { RoleRepository } from "../domain/role.repository.js";

export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository,
    ) { }

    async createRole(data: { name: string }): Promise<RoleEntity> {
        const existing = await this.roleRepository.findByName(data.name);

        if (existing) {
            throw new ConflictError("Role already exists");
        }

        const role = RoleEntity.create({
            name: data.name
        })

        return await this.roleRepository.save(role);

    }

    async getRoles(): Promise<RoleEntity[]> {

        return await this.roleRepository.findAll();
    }

}