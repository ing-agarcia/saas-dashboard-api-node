import { Request, Response } from 'express';
import { AuthService } from '../application/auth.service.js';
import { AuthRequest } from './auth.middleware.js';

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    login = async (req: Request, res: Response) => {
        const { emailUser, passwordUser } = req.body;

        const result = await this.authService.login(
            emailUser,
            passwordUser
        );

        return res.json(result);
    };

    validate = async (req: AuthRequest, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ valid: false });
        }

        return res.json({ valid: true });
    };

    me = async (req: AuthRequest, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await this.authService.getProfile(req.user.id);

        return res.json(user);
    };

};