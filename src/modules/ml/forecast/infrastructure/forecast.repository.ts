import { QueryTypes } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";

export class ForecastRepository {

  async getMonthlyTotals(userId: number) {

    const result = await sequelizeInstance.query<{ month: number, total: number }>(`
        SELECT 
            EXTRACT(MONTH FROM os.created_at) AS month,
            SUM(amount) AS total
        FROM
           opportunity_summary os
           JOIN user_hierarchy uh ON os.owner_id = uh.child_user_id
        WHERE
          uh.parent_user_id = :userId
          AND EXTRACT(YEAR FROM os.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
        GROUP BY
          month
        ORDER BY
          month
        `,
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      });

    return result.map(r => ({
      month: r.month,
      total: Number(r.total)
    }));
  }

}