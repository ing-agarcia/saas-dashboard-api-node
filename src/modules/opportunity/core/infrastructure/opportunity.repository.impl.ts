import { OpportunityRepository } from "../domain/opportunity.repository.js";
import { Opportunity } from "../domain/opportunity.entity.js";
import { OpportunityModel } from "./models/opportunity.model.js";


export class OpportunityRepositoryImpl implements OpportunityRepository {

    private toDomain(record: any): Opportunity {
        return Opportunity.fromPrimitives({
            id: record.id,
            ownerId: record.ownerId,
            name: record.name,
            stage: record.stage,
            probability: record.probability,
            createdAt: record.createdAt
        });
    }

    async save(opportunity: Opportunity): Promise<Opportunity> {
        const data = opportunity.toPrimitives();

        let record;

        if (data.id) {
            await OpportunityModel.update(data, {
                where: { id: data.id }
            });

            record = await OpportunityModel.findByPk(data.id);

            if (!record) {

                throw new Error("Opportunity not found after update");
            }

        } else {
            record = await OpportunityModel.create(data);
        }

        return Opportunity.fromPrimitives(record.toJSON());
    }

    async findById(id: number): Promise<Opportunity | null> {
        const record = await OpportunityModel.findByPk(id);

        if (!record) return null;

        return this.toDomain(record);
    }

    async findByName(name: string): Promise<Opportunity | null> {
        const record = await OpportunityModel.findOne({
            where: { name },
        })

        if (!record) return null;

        return this.toDomain(record);
    }


}