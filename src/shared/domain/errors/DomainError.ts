import { BaseError } from ".//BaseError.js";

export class DomainError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}