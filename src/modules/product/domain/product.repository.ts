import { PaginatedResult } from "@/shared/domain/paginated-result.js";
import { ProductEntity } from "./product.entity.js";

export interface ProductRepository {

    findAll(page: number, pageSize: number): Promise<PaginatedResult<ProductEntity>>;

}