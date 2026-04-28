import { OpportunityRepository } from "../domain/opportunity.repository.js";
import { Opportunity } from "../domain/opportunity.entity.js";
import { ConflictError } from "@/shared/domain/errors/ConflictError.js";

export class OpportunityService {

    constructor(
        private readonly opportunityRepository: OpportunityRepository
    ) { }

    async save(opportunity: Opportunity): Promise<Opportunity> {

        const data = opportunity.toPrimitives();

        const exists = await this.opportunityRepository.findByName(data.name);

        if (exists && exists.toPrimitives().id !== data.id) {
            throw new ConflictError("Opportunity name already exists");
        }

        return await this.opportunityRepository.save(opportunity);
    }


}