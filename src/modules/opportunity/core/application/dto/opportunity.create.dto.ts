export interface OpportunityCreateDTO {
    id: number | undefined,
    ownerId: number,
    name: string,
    stage: string,
    probability: number,
}