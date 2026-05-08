export class OpportunityEntity {

    private constructor(
        public readonly id: number | null,
        public ownerId: number,
        public user: { id: number; name: string } | undefined,
        public name: string,
        public stage: string,
        public probability: number,
        public readonly createdAt: Date | null,
    ) { }

    static createOpportunity(
        id: number | undefined,
        ownerId: number,
        name: string,
        stage: string,
        probability: number
    ): OpportunityEntity {

        if (probability < 0 || probability > 100) {
            throw new Error("Probability must be between 0 and 100");
        }

        if (!name || name.trim().length === 0) {
            throw new Error("Name is required");
        }

        return new OpportunityEntity(
            id! ?? undefined,
            ownerId,
            undefined,
            name,
            stage,
            probability,
            new Date()
        );
    }

    static fromPrimitives(data: {
        id: number;
        ownerId: number;
        user: { id: number; name: string } | undefined,
        name: string;
        stage: string;
        probability: number;
        createdAt: Date;
    }): OpportunityEntity {
        return new OpportunityEntity(
            data.id,
            data.ownerId,
            data.user,
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