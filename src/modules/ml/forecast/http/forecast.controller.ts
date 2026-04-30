import { Request, Response } from "express";
import { ForecastService } from "../application/forecast.service.js";
import { UnauthorizedError } from "@/shared/domain/errors/UnauthorizedError.js";
import { ValidationError } from "@/shared/domain/errors/ValidationError.js";

export class ForecastController {
    constructor(
        private forecastService: ForecastService
    ) { }

    getTrendForecast = async (req: Request, res: Response) => {

        const user = req.user;
        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }

        const query = req.query as { model?: string };
        const model = query.model ?? "linear";

        if (!["linear", "ridge", "lasso"].includes(model)) {
            throw new ValidationError("Invalid model");
        }

        const result = await this.forecastService.getTrendForecast(user.id, model);
        return res.json(result);
    };
}