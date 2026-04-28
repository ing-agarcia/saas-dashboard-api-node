import { ValidationError } from "@/shared/domain/errors/ValidationError.js";

export class RoleEntity {

    private constructor(
        public readonly id: number | null,
        public name: string
    ) { }

    static create(data: { name: string }): RoleEntity {

        const name = data.name.trim();
        if (!name) {
            throw new ValidationError("Role name is required");
        }

        return new RoleEntity(null, name);
    }

    static fromPrimitives(data: {
        id: number | null;
        name: string;
    }): RoleEntity {

        return new RoleEntity(
            data.id,
            data.name.trim()
        );
    }

    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
        };
    }

}