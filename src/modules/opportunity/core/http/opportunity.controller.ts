import { UnauthorizedError } from "@/shared/domain/errors/UnauthorizedError.js";
import { OpportunityService } from "../application/opportunity.service.js";
import { Request, Response } from "express";
import { OpportunityMapperEntity } from "../domain/opportunity.mapper.entity.js";

export class OpportunityController {
    constructor(
        private readonly opportunityService: OpportunityService
    ) { }

    createOpportunity = async (req: Request, res: Response) => {
        const data = await this.opportunityService.save(req.body);
        return res.json(data);
    };

    getOpportunities = async (req: Request, res: Response) => {
        const page = Number(req.query.page ?? 0);
        const pageSize = Number(req.query.pageSize ?? 50);
        const user = req.user;

        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }

        const result = await this.opportunityService.getOpportunities(user.id, page, pageSize);

        return res.json({
            data: OpportunityMapperEntity.toListDto(result.data),
            total: result.total,
            page: result.page,
            pageSize: result.pageSize
        });
    }
}