import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../application/auth.service.js';
import { Roles } from "../domain/roles.js";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        roleId: number;
    };
}

export class AuthMiddleware {
    constructor(private readonly authService: AuthService) { }

    authenticate = (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = this.authService.verifyToken(token);
            req.user = decoded;
            next();
        } catch {
            return res.status(401).json({ message: "Invalid token" });
        }
    };

    authorize =
        (...roles: Roles[]) =>
            (req: AuthRequest, res: Response, next: NextFunction) => {

                if (!req.user) {
                    return res.status(401).json({ message: "Unauthorized" });
                }

                if (!roles.includes(req.user.roleId as Roles)) {
                    return res.status(403).json({ message: "Forbidden" });
                }

                next();
            };

}