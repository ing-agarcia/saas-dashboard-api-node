import { Request, Response } from "express";
import { ForecastService } from "../application/forecast.service.js";
import { UnauthorizedError } from "@/shared/domain/errors/UnauthorizedError.js";

export class ForecastController {
    constructor(
        private forecastService: ForecastService
    ) { }

    getTrendForecast = async (req: Request, res: Response) => {

        const user = req.user;
        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }

        const result = await this.forecastService.getTrendForecast(user.id);
        return res.json(result);
    };
}