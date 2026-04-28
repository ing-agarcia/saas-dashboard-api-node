import { ValidationError } from "@/shared/domain/errors/ValidationError.js";

export class GroupEntity {

    private constructor(
        public readonly id: number | null,
        public name: string,
    ) {

    }

    static create(data: { name: string }): GroupEntity {

        const name = data.name.trim();
        if (!name) {
            throw new ValidationError("Group name is required");

        }

        return new GroupEntity(null, name);
    }

    static fromPrimitives(data: {
        id: number | null;
        name: string;
    }): GroupEntity {

        return new GroupEntity(
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