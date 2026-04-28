import { PaginatedResult } from "@/shared/domain/paginated-result.js";
import { OpportunitySumaryDTO } from "../application/dto/opportunity.summary.dto.js";

export interface OpportunitySummaryRepository {

    opportunitiesByUserHierarchy(
        userId: number,
        page: number,
        pageSize: number): Promise<PaginatedResult<OpportunitySumaryDTO>>;

}