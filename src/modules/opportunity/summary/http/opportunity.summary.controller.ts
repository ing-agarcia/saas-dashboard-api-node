import { UnauthorizedError } from "@/shared/domain/errors/UnauthorizedError.js";
import { OpportunitySummaryService } from "../application/opportunity.summary.service.js";
import { Request, Response } from "express";

export class OpportunitySummaryController {
    constructor(
        private readonly opportunitySummaryService: OpportunitySummaryService
    ) { }

    findOpportunitiesByUserHierarchy = async (req: Request, res: Response) => {
        const page = Number(req.query.page ?? 0);
        const pageSize = Number(req.query.pageSize ?? 50);
        const user = req.user;

        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }

        const data = await this.opportunitySummaryService.opportunitiesByUserHierarchy(user.id, page, pageSize);
        return res.json(data);
    };
}