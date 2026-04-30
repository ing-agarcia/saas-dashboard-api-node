import { ForecastRepository } from "../infrastructure/forecast.repository.js";
import { ForecastMLClient } from "../infrastructure/forecast.ml-client.js";
import { ValidationError } from "@/shared/domain/errors/ValidationError.js";

type ChartData = {
    nameMonth: string;
    currentYear: number | null;
    forecast: number | null;
};

export class ForecastService {
    constructor(
        private forecastRepository: ForecastRepository = new ForecastRepository(),
        private forecastMLClient: ForecastMLClient = new ForecastMLClient()
    ) { }


    async getTrendForecast(userId: number, model: string) {
        const trend = await this.forecastRepository.getMonthlyTotals(userId);

        const dataPrediction = await this.forecastMLClient.predict(
            trend.map(t => t.total)
            , model
        );

        const { prediction } = dataPrediction;

        if (prediction == null) {
            throw new ValidationError(dataPrediction.message || "Invalid prediction response");
        }

        const chartData = trend.map<ChartData>(item => ({
            nameMonth: new Date(item.month).toLocaleString("en", { month: "short" }),
            currentYear: item.total,
            forecast: null
        }));

        // último índice real
        const lastIndex = chartData.length - 1;

        if (prediction !== null) {
            const lastReal = chartData[lastIndex].currentYear;

            // conectar forecast con último punto real
            chartData[lastIndex].forecast = lastReal;

            // agregar siguiente mes (forecast)
            chartData.push({
                nameMonth: "Next",
                currentYear: null,
                forecast: prediction
            });
        }

        return chartData;
    }

}   