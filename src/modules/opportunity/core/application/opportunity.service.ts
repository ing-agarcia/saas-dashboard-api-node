import { OpportunityRepository } from "../domain/opportunity.repository.js";
import { OpportunityEntity } from "../domain/opportunity.entity.js";
import { ConflictError } from "@/shared/domain/errors/ConflictError.js";
import { EventPublisher } from "./ports/event.publisher.js";
import { PaginatedResponse } from "@/shared/http/paginated.response.js";
import { OpportunityCreateDTO } from "./dto/opportunity.create.dto.js";
import { OpportunityMapperEntity } from "../domain/opportunity.mapper.entity.js";
import { OpportunityResponseDTO } from "./dto/opportunity.response.dto.js";

export class OpportunityService {

    constructor(
        private readonly opportunityRepository: OpportunityRepository,
        private readonly eventPublisher: EventPublisher
    ) { }

    async save(opportunity: OpportunityCreateDTO): Promise<OpportunityResponseDTO> {

        const data = OpportunityMapperEntity.toEntity(opportunity);

        const exists = await this.opportunityRepository.findByName(data.name);

        if (exists && exists.toPrimitives().id !== data.id) {
            throw new ConflictError("Opportunity name already exists");
        }

        const isNew = !data.id;
        const currentOpportunity = !isNew
            ? await this.opportunityRepository.findById(data.id)
            : null;

        const result = await this.opportunityRepository.save(data);
        const opportunityDto = OpportunityMapperEntity.toDto(result);

        await this.handleStageChanges(currentOpportunity, opportunityDto);

        await this.handleProbabilityChanges(currentOpportunity, opportunityDto);

        await this.handleCreation(isNew, opportunityDto);

        return OpportunityMapperEntity.toDto(result);
    }

    async getOpportunities(
        userId: number,
        page: number,
        pageSize: number
    ): Promise<PaginatedResponse<OpportunityEntity>> {
        return this.opportunityRepository.findAll(userId, page, pageSize);
    }

    private async handleStageChanges(
        current: any,
        opportunity: OpportunityResponseDTO
    ): Promise<void> {

        if (!current) return;

        if (current.stage !== opportunity.stage) {

            await this.eventPublisher.publish({
                type: "STAGE_CHANGED",
                data: {
                    opportunityId: opportunity.id,
                    previousStage: current.stage,
                    newStage: opportunity.stage
                }
            });
        }
    }

    private async handleProbabilityChanges(
        current: any,
        opportunity: OpportunityResponseDTO
    ): Promise<void> {

        if (!current) return;

        if (current.probability !== opportunity.probability) {

            const probability = current.probability > opportunity.probability
                ? "PROBABILITY_DECREASES"
                : "PROBABILITY_INCREASED"

            await this.eventPublisher.publish({
                type: probability,
                data: {
                    opportunityId: opportunity.id,
                    previousProbability: current.probability,
                    newProbability: opportunity.probability
                }
            });
        }
    }

    private async handleCreation(
        isNew: boolean,
        opportunity: OpportunityResponseDTO
    ): Promise<void> {

        if (!isNew) return;

        await this.eventPublisher.publish({
            type: "OPPORTUNITY_CREATED",
            data: opportunity
        });
    }

}