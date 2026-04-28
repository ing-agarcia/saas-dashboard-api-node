import { db } from "@/config/db.js";
import { ByStage, Kpis, TrendRaw } from "../application/dashboard.types.js";

export class DashboardRepository {

  async getKpis(userId: number) {
    const result = await db.queryOne<Kpis>(
      `
      SELECT
        count(*)::INTEGER as "totalOpps",
        coalesce(sum(amount)::DOUBLE PRECISION, 0) as "totalValue",
        coalesce(sum(amount * probability / 100)::DOUBLE PRECISION, 2) as "weightedValue",
        count(case when stage = 'Won' then 1 end) * 1.0 / NULLIF(count(*), 0)::DOUBLE PRECISION as "winRate"
      FROM
        opportunity_summary os
        JOIN user_hierarchy uh ON os.owner_id = uh.child_user_id
      WHERE
        uh.parent_user_id = ?
        AND EXTRACT(YEAR FROM os.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)  
      `, [userId]);

    if (!result) {
      return {
        totalOpps: 0,
        totalValue: 0,
        weightedValue: 0,
        winRate: 0,
      };
    }
    return {
      totalOpps: result.totalOpps,
      totalValue: result.totalValue,
      weightedValue: result.weightedValue,
      winRate: result.winRate * 100,
    };
  }

  async getByStage(userId: number) {
    const result = await db.query<ByStage>(
      `
      SELECT
        stage, 
        count(*)::INTEGER as "totalOpps",
        -- Porcentaje basado en el número de oportunidades
        round(count(*) * 100.0 / sum(count(*)) over(), 2)::DOUBLE PRECISION as "totalOppsPct",
        sum(amount)::DOUBLE PRECISION as "totalValue",
        -- Porcentaje basado en el valor monetario
        round(sum(amount) * 100.0 / sum(sum(amount)) over(), 2)::DOUBLE PRECISION as "totalValuePct"
      FROM
        opportunity_summary os
        JOIN user_hierarchy uh ON os.owner_id = uh.child_user_id
      WHERE
        uh.parent_user_id = ?
        AND EXTRACT(YEAR FROM os.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY
        stage
      ORDER BY 
        "totalValue" DESC
      `, [userId]
    );

    if (!result) {
      return [];
    }

    return result;
  }

  async getTrend(userId: number) {
    const result = await db.query<TrendRaw>(
      `
      SELECT
        EXTRACT(MONTH FROM os.created_at)::INTEGER AS month,
        COALESCE(
          SUM(
            CASE
              WHEN EXTRACT(YEAR FROM os.created_at) = EXTRACT(YEAR FROM CURRENT_DATE) - 1
              THEN os.amount
              END
          ), 0) AS "lastYear",
        COALESCE(
          SUM(
            CASE
              WHEN EXTRACT(YEAR FROM os.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
              THEN os.amount
              END
          ), 0) AS "currentYear"
      FROM
        opportunity_summary os
        JOIN user_hierarchy uh ON os.owner_id = uh.child_user_id
      WHERE
        uh.parent_user_id = ? AND
        os.created_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
      GROUP BY
        EXTRACT(MONTH FROM os.created_at)
      ORDER BY
        month
      `, [userId]
    );

    return result || [];
  }
}
