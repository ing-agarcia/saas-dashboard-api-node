import { PaginatedResult } from "@/shared/domain/paginated-result.js";
import { ProductRepository } from "../domain/product.repository.js";
import { ProductEntity } from "../domain/product.entity.js";
import { ProductModel } from "./models/product.model.js";

export class ProductRepositoryImpl implements ProductRepository {

    async findAll(
        page: number = 0,
        pageSize: number = 50
    ): Promise<PaginatedResult<ProductEntity>> {

        const safePage = Math.max(0, page);
        const safePageSize = Math.min(Math.max(1, pageSize), 50);

        const offset = safePage * safePageSize;

        const { count, rows } = await ProductModel.findAndCountAll({
            limit: safePageSize,
            offset: offset
        });

        const products = rows.map(row =>
            ProductEntity.fromPrimitives({
                id: row.id,
                name: row.name,
                category: row.category,
                price: row.price
            })
        );

        return {
            data: products,
            total: count,
            page: safePage,
            pageSize: safePageSize,
        }
    }

}