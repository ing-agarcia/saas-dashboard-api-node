import { PaginatedResponse } from "@/shared/http/paginated.response.js";
import { OpportunitySummaryRepository } from "../domain/opportunity.summary.repository.js";
import { OpportunitySumaryDTO } from "./dto/opportunity.summary.dto.js";

export class OpportunitySummaryService {

    constructor(
        private readonly opportunitySummaryRepository: OpportunitySummaryRepository
    ) { }

    async opportunitiesByUserHierarchy(
        userId: number,
        page: number,
        pageSize: number
    ): Promise<PaginatedResponse<OpportunitySumaryDTO>> {
        return await this.opportunitySummaryRepository.opportunitiesByUserHierarchy(userId, page, pageSize);
    }

}