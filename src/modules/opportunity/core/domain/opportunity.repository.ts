import { Opportunity } from "./opportunity.entity.js";

export interface OpportunityRepository {

    save(opportunity: Opportunity): Promise<Opportunity>;

    findById(id: number): Promise<Opportunity | null>;

    findByName(name: string): Promise<Opportunity | null>;

}