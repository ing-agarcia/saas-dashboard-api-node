import { Request, Response } from "express";
import { DashboardService } from "../application/dashboard.service.js";
import { UnauthorizedError } from "@/shared/domain/errors/UnauthorizedError.js";

export class DashboardController {
    constructor(
        private dashboardService: DashboardService
    ) { }

    getPipelineOverview = async (req: Request, res: Response) => {

        const user = req.user;

        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }

        const [kpis, byStage, trend] = await Promise.all([
            this.dashboardService.getKpis(user.id),
            this.dashboardService.getByStage(user.id),
            this.dashboardService.getTrend(user.id)
        ]);

        return res.json({ kpis, byStage, trend });
    };
} 