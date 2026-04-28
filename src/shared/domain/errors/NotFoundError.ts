import { BaseError } from "./BaseError.js";

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404);
    }
}