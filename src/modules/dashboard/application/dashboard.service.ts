import { DashboardRepository } from "../infrastructure/dashboard.repository.js";
import { ByStage, Kpis, Trend, TrendRaw } from "./dashboard.types.js";

export class DashboardService {

  constructor(
    private readonly dashboardRepository: DashboardRepository
  ) { }

  async getKpis(userId: number): Promise<Kpis> {
    const data = await this.dashboardRepository.getKpis(userId);
    return data;
  }

  async getByStage(userId: number): Promise<ByStage[]> {

    const data = await this.dashboardRepository.getByStage(userId);
    return data;
  }

  private getMonthName(month: number): string {
    return new Intl.DateTimeFormat("en", { month: "short" })
      .format(new Date(2024, month - 1));
  }

  private fillMissingMonths(data: TrendRaw[]): Trend[] {
    const map = new Map(data.map(i => [i.month, i]));
    const result: Trend[] = [];

    for (let m = 1; m <= 12; m++) {
      const item = map.get(m);

      result.push({
        month: m,
        nameMonth: this.getMonthName(m),
        lastYear: item?.lastYear ?? 0,
        currentYear: item?.currentYear ?? 0
      });
    }

    return result;
  }

  async getTrend(userId: number): Promise<TrendRaw[]> {

    const data = await this.dashboardRepository.getTrend(userId);
    return this.fillMissingMonths(data);
  }

}