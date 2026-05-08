import { PaginatedResult } from "@/shared/domain/paginated-result.js";
import { OpportunityEntity } from "./opportunity.entity.js";

export interface OpportunityRepository {

    save(opportunity: OpportunityEntity): Promise<OpportunityEntity>;

    findById(id: number): Promise<OpportunityEntity | null>;

    findByName(name: string): Promise<OpportunityEntity | null>;

    findAll(userId: number, page: number, pageSize: number): Promise<PaginatedResult<OpportunityEntity>>;


}