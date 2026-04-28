import { Request, Response } from "express";
import { GroupService } from "../application/group.service.js";
import { ValidationError } from "@/shared/domain/errors/ValidationError.js";

export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) { }

    createGroup = async (req: Request, res: Response) => {

        const { name } = req.body;
        if (!name) {
            throw new ValidationError("Name is required");
        }

        const group = await this.groupService.createGroup({ name });
        return res.json(group.toPrimitives());
    }

    getGroups = async (req: Request, res: Response) => {
        const groups = await this.groupService.getGroups();
        return res.json(
            groups.map(group => group.toPrimitives())
        );
    };

}