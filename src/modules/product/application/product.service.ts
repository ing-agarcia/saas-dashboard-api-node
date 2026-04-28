import { ProductEntity } from "../domain/product.entity.js";
import { ProductRepository } from "../domain/product.repository.js";
import { PaginatedResponse } from "@/shared/http/paginated.response.js";

export class ProductService {

    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async getAll(
        page: number = 0,
        pageSize: number = 50
    ): Promise<PaginatedResponse<ProductEntity>> {

        const safePage = Math.max(0, page);
        const safePageSize = Math.min(Math.max(1, pageSize), 50);

        return await this.productRepository.findAll(safePage, safePageSize);
    }

}