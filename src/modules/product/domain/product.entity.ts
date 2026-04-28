export class ProductEntity {

    private constructor(
        public readonly id: number | null,
        public name: string,
        public category: string,
        public price: number,) {
    }

    static create(data: {
        name: string;
        category: string;
        price: number;
    }): ProductEntity {

        if (data.price < 0) {
            throw new Error("Price cannot be negative");
        }

        return new ProductEntity(
            null,
            data.name,
            data.category,
            data.price
        );
    }

    static fromPrimitives(data: {
        id: number | null;
        name: string;
        category: string;
        price: number | string;
    }): ProductEntity {

        const price = Number(data.price);

        if (isNaN(price)) {
            throw new Error("Invalid price");
        }

        return new ProductEntity(
            data.id,
            data.name,
            data.category,
            price

        );
    }

    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            price: this.price
        };
    }

}