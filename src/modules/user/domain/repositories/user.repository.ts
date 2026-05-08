import { UserEntity } from "../entities/user.entity.js";
import { PaginatedResult } from "@/shared/domain/paginated-result.js";

export interface UserRepository {

    save(user: UserEntity): Promise<UserEntity>;

    findByEmail(email: string): Promise<UserEntity | null>;

    findById(id: number): Promise<UserEntity | null>;

    update(user: UserEntity): Promise<UserEntity>;

    delete(id: number): Promise<void>;

    findAll(userId: number, page: number, pageSize: number): Promise<PaginatedResult<UserEntity>>;

    findUserById(id: number): Promise<UserEntity | null>;

    getManagersByRole(roleId: number): Promise<UserEntity[] | []>;

    findAllForReport(userId: number): Promise<UserEntity[]>;

    findUsersByRole(roleId: number): Promise<UserEntity[] | []>;
}