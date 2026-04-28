import { PaginatedResult } from "@/shared/domain/paginated-result.js";
import { OpportunitySummaryRepository } from "../domain/opportunity.summary.repository.js";
import { OpportunitySumaryDTO } from "../application/dto/opportunity.summary.dto.js";
import { QueryTypes } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";

export class OpportunitySummaryRepositoryImpl implements OpportunitySummaryRepository {

    async opportunitiesByUserHierarchy(
        userId: number,
        page: number = 0,
        pageSize: number = 50
    ): Promise<PaginatedResult<OpportunitySumaryDTO>> {

        const offset = page * pageSize;

        const [countResult] = await sequelizeInstance.query<{ total: number }>(
            `
        SELECT COUNT(*) as total
        FROM opportunity_summary os
        WHERE os.owner_id IN (
            SELECT child_user_id
            FROM user_hierarchy
            WHERE parent_user_id = :userId
        )
        `,
            {
                replacements: { userId },
                type: QueryTypes.SELECT
            }
        );

        const result = await sequelizeInstance.query<OpportunitySumaryDTO>(
            `
        SELECT
            os.id AS id,
            os.name AS name,
            os.stage AS stage,
            os.probability AS probability,
            os.amount AS amount,
            os.created_at AS "createdAt",
            MAX(CASE WHEN uh.level = 0 THEN u2.name END) AS "salesName",
            MAX(CASE WHEN uh.level = 1 THEN u2.name END) AS "managerName",
            MAX(CASE WHEN uh.level = 2 THEN u2.name END) AS "directorName",
            MAX(CASE WHEN uh.level = 3 THEN u2.name END) AS "vpName",
            MAX(CASE WHEN uh.level = 4 THEN u2.name END) AS "rootName"
        FROM opportunity_summary os
        JOIN user_hierarchy uh
            ON uh.child_user_id = os.owner_id
        JOIN users u2
            ON u2.id = uh.parent_user_id
        WHERE os.owner_id IN (
            SELECT child_user_id
            FROM user_hierarchy
            WHERE parent_user_id = :userId
        )
        GROUP BY
            os.id,
            os.name,
            os.amount,
            os.stage,
            os.probability,
            os.created_at
        LIMIT :pageSize OFFSET :offset
        `,
            {
                replacements: { userId, pageSize, offset },
                type: QueryTypes.SELECT
            }
        );

        return {
            data: result,
            total: Number(countResult?.total ?? 0),
            page,
            pageSize
        };
    }



}