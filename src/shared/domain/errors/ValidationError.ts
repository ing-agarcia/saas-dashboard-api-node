// ValidationError.ts
import { BaseError } from "../../../shared/domain/errors/BaseError.js";

export class ValidationError extends BaseError {
    constructor(message: string) {
        super(message, 400);
    }
}