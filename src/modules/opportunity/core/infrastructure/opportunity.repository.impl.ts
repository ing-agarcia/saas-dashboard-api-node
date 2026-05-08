import { OpportunityRepository } from "../domain/opportunity.repository.js";
import { OpportunityEntity } from "../domain/opportunity.entity.js";
import { OpportunityModel } from "./models/opportunity.model.js";
import { PaginatedResult } from "@/shared/domain/paginated-result.js";
import { UserHierarchyModel } from "@/modules/user/infrastructure/models/user.hierarchy.model.js";
import { OpportunityMapperModel } from "./mappers/opportunity.mapper.model.js";

export class OpportunityRepositoryImpl implements OpportunityRepository {

    async save(opportunity: OpportunityEntity): Promise<OpportunityEntity> {
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

        return OpportunityMapperModel.toEntity(record);
    }

    async findById(id: number): Promise<OpportunityEntity | null> {
        const record = await OpportunityModel.findByPk(id);

        if (!record) return null;

        return OpportunityMapperModel.toEntity(record);
    }

    async findByName(name: string): Promise<OpportunityEntity | null> {
        const record = await OpportunityModel.findOne({
            where: { name },
        })

        if (!record) return null;

        return OpportunityMapperModel.toEntity(record);
    }

    async findAll(userId: number, page: number, pageSize: number): Promise<PaginatedResult<OpportunityEntity>> {

        const offset = Math.max(0, page) * pageSize;

        const hierarchy = await UserHierarchyModel.findAll({
            where: { parentUserId: userId }
        });

        const childIds = hierarchy.map(h => h.childUserId);

        if (childIds.length === 0) {
            return {
                data: [],
                total: 0,
                page,
                pageSize
            };
        }

        const { rows, count } = await OpportunityModel.findAndCountAll({
            include: ["user"],
            where: {
                ownerId: childIds
            },
            limit: pageSize,
            offset: offset,
            order: [
                ['ownerId', 'ASC'],
                ['name', 'ASC']
            ],
        });

        return {
            data: OpportunityMapperModel.toListEntity(rows),
            total: count,
            page,
            pageSize
        };
    }

}