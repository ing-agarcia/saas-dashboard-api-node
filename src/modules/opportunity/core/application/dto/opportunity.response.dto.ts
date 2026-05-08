export interface OpportunityResponseDTO {
    id: number,
    ownerId: number,
    ownerName: string,
    name: string,
    stage: string,
    probability: number,
    createdAt: Date,
}