import { OpportunityEntity } from "../../domain/opportunity.entity.js";
import { OpportunityModel } from "../models/opportunity.model.js";

export class OpportunityMapperModel {

    static toEntity(model: OpportunityModel): OpportunityEntity {
        const data = model.get({ plain: true });

        return OpportunityEntity.fromPrimitives({
            id: data.id!,
            ownerId: data.user?.id!,
            user: data.user
                ? { id: data.user.id, name: data.user.name }
                : undefined,
            name: data.name,
            stage: data.stage,
            probability: data.probability,
            createdAt: data.createdAt!,
        })
    }

    static toListEntity(models: OpportunityModel[]): OpportunityEntity[] {
        return models.map(model => this.toEntity(model));
    }
}