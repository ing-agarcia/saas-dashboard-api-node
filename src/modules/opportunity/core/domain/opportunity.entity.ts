export class Opportunity {

    private constructor(
        public readonly id: number | null,
        private ownerId: number,
        private name: string,
        private stage: string,
        private probability: number,
        public readonly createdAt: Date | null,
    ) { }

    static createOpportunity(
        ownerId: number,
        name: string,
        stage: string,
        probability: number
    ): Opportunity {

        if (probability < 0 || probability > 100) {
            throw new Error("Probability must be between 0 and 100");
        }

        if (!name || name.trim().length === 0) {
            throw new Error("Name is required");
        }

        return new Opportunity(
            null,
            ownerId,
            name,
            stage,
            probability,
            new Date()
        );
    }

    static fromPrimitives(data: {
        id: number;
        ownerId: number;
        name: string;
        stage: string;
        probability: number;
        createdAt: Date;
    }): Opportunity {
        return new Opportunity(
            data.id,
            data.ownerId,
            data.name,
            data.stage,
            data.probability,
            data.createdAt
        );
    }

    toPrimitives() {
        return {
            id: this.id,
            ownerId: this.ownerId,
            name: this.name,
            stage: this.stage,
            probability: this.probability,
            createdAt: this.createdAt,
        };
    }


}