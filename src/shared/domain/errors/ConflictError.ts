
import { BaseError } from "../../../shared/domain/errors/BaseError.js";

export class ConflictError extends BaseError {
    constructor(message: string) {
        super(message, 409);
    }
}