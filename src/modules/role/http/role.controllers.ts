import { Request, Response } from "express";
import { RoleService } from "../application/role.service.js";
import { ValidationError } from "@/shared/domain/errors/ValidationError.js";
import { RoleEntity } from "../domain/role.entity.js";

export class RoleController {

    constructor(private readonly roleService: RoleService) { }

    createRole = async (req: Request, res: Response) => {

        const { name } = req.body;
        if (!name) {
            throw new ValidationError("Name is required");
        }

        const role = await this.roleService.createRole({ name });
        return res.json(role.toPrimitives());
    };

    getRoles = async (req: Request, res: Response) => {

        const roles = await this.roleService.getRoles();

        return res.json(
            roles.map(role => role.toPrimitives())
        );

    };

}