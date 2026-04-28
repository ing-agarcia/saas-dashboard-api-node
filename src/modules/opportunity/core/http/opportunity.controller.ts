import { OpportunityService } from "../application/opportunity.service.js";
import { Request, Response } from "express";

export class OpportunityController {
    constructor(
        private readonly opportunityService: OpportunityService
    ) { }

    createOpportunity = async (req: Request, res: Response) => {
        const data = await this.opportunityService.save(req.body);
        return res.json(data);
    };
}