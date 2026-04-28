import { UserEntity } from "../../domain/entities/user.entity.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";

export class UserReportService {

    constructor(private userRepository: UserRepository) { }

    async generateReport(userId: number): Promise<UserEntity[]> {
        return await this.userRepository.findAllForReport(userId);
    }

}