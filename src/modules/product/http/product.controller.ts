import { ProductService } from "../application/product.service.js";
import { Request, Response } from "express";

export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    private parseNumber(value: any, defaultValue: number): number {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? defaultValue : parsed;
    }

    getAll = async (req: Request, res: Response) => {
        const page = this.parseNumber(req.query.page, 0);
        const pageSize = this.parseNumber(req.query.pageSize, 50);

        const result = await this.productService.getAll(page, pageSize);

        return res.json({
            data: result.data.map(p => p.toPrimitives()),
            total: result.total,
            page: result.page,
            pageSize: result.pageSize
        });
    };

}