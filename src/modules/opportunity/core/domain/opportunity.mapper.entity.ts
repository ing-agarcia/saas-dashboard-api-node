import { OpportunityCreateDTO } from "../application/dto/opportunity.create.dto.js";
import { OpportunityResponseDTO } from "../application/dto/opportunity.response.dto.js";
import { OpportunityEntity } from "./opportunity.entity.js";

export class OpportunityMapperEntity {

    static toDto(entity: OpportunityEntity): OpportunityResponseDTO {
        return {
            id: entity.id!,
            ownerId: entity.user?.id!,
            ownerName: entity.user?.name!,
            name: entity.name,
            stage: entity.stage,
            probability: entity.probability,
            createdAt: entity.createdAt!,
        }
    }

    static toListDto(entities: OpportunityEntity[]): OpportunityResponseDTO[] {
        return entities.map(entity => this.toDto(entity));
    }

    static toEntity(dto: OpportunityCreateDTO): OpportunityEntity {

        return OpportunityEntity.createOpportunity(
            dto.id,
            dto.ownerId,
            dto.name,
            dto.stage,
            dto.probability,
        )
    }

}