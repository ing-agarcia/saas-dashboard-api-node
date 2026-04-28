import { Request, Response, NextFunction } from "express";
import { BaseError } from "@/shared/domain/errors/BaseError.js";

const handlePostgresError = (err: any) => {
    switch (err.code) {
        case "23503":
            return {
                status: 409,
                body: { message: "Tiene registros relacionados", code: "ForeignKeyViolation" },
            };
        case "23505":
            return {
                status: 409,
                body: { message: "Registro duplicado", code: "UniqueViolation" },
            };
        case "23502":
            return {
                status: 400,
                body: { message: "Campos obligatorios faltantes", code: "NotNullViolation" },
            };
        default:
            return null;
    }
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({
            message: err.message,
            code: err.name
        });
    }

    const pgError = handlePostgresError(err);
    if (pgError) {
        return res.status(pgError.status).json(pgError.body);
    }

    return res.status(500).json({
        message: "Internal server error",
        code: "InternalError",
    });
};