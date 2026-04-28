import { Request, Response } from "express";
import { UserService } from "../application/services/user.service.js";
import { UnauthorizedError } from "@/shared/domain/errors/UnauthorizedError.js";
import { ValidationError } from "@/shared/domain/errors/ValidationError.js";
import { UserMapperEntity } from "../domain/mappers/user.mapper.entity.js";
import { UserReportService } from "../application/services/user-report.service.js";
import { ExcelUserReport } from "../infrastructure/reports/excel-user-report.js";

export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly userReportService: UserReportService,
        private readonly excelUserReport: ExcelUserReport,
    ) { }

    createUser = async (req: Request, res: Response) => {
        const data = await this.userService.create(req.body);
        return res.json(UserMapperEntity.toDto(data));
    };

    updateUser = async (req: Request, res: Response) => {
        const data = await this.userService.update(req.body);
        return res.json(UserMapperEntity.toDto(data));
    };

    deleteUser = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            throw new ValidationError("Invalid user id");
        }

        const data = await this.userService.delete(id);
        return res.json({ success: true });
    };

    getAll = async (req: Request, res: Response) => {
        const page = Number(req.query.page ?? 0);
        const pageSize = Number(req.query.pageSize ?? 50);
        const user = req.user;

        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }

        const result = await this.userService.getAll(user.id, page, pageSize);

        return res.json({
            data: UserMapperEntity.toDtoList(result.data),
            total: result.total,
            page: result.page,
            pageSize: result.pageSize
        });

    };

    getManagersByRole = async (req: Request, res: Response) => {
        const id = Number(req.params.roleId);

        if (isNaN(id)) {
            throw new ValidationError("Invalid role id");
        }

        const users = await this.userService.getManagersByRole(id);
        return res.json(UserMapperEntity.toHierarchyDtoList(users));
    };

    download = async (req: Request, res: Response) => {
        const user = req.user;

        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }
        const data = await this.userReportService.generateReport(user.id);
        const buffer = await this.excelUserReport.generate(UserMapperEntity.toDtoList(data));

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=users-report.xlsx"
        );

        res.send(buffer);
    };


};