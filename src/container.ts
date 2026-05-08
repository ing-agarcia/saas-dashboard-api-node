import { UserRepositoryImpl } from "./modules/user/infrastructure/repositories/user.repository.impl.js";
import { ProductRepositoryImpl } from "./modules/product/infrastructure/product.repository.impl.js";
import { BcryptPasswordHasher } from "./modules/user/infrastructure/services/bcrypt-password-hasher.js";
import { AuthService } from "@/modules/auth/application/auth.service.js";
import { AuthMiddleware } from "@/modules/auth/http/auth.middleware.js";
import { UserService } from "./modules/user/application/services/user.service.js";
import { UserReportService } from "./modules/user/application/services/user-report.service.js";
import { ExcelUserReport } from "./modules/user/infrastructure/reports/excel-user-report.js";
import { UserController } from "@/modules/user/http/user.controller.js";
import { AuthController } from "@/modules/auth/http/auth.controller.js";
import { ProductService } from "./modules/product/application/product.service.js";
import { ProductController } from "./modules/product/http/product.controller.js";

import { RoleRepositoryImpl } from "./modules/role/infrastructure/role.repository.impl.js";
import { RoleService } from "./modules/role/application/role.service.js";
import { RoleController } from "./modules/role/http/role.controllers.js";

import { GroupRepositoryImpl } from "./modules/group/infrastructure/group.repository.impl.js";
import { GroupService } from "./modules/group/application/group.service.js";
import { GroupController } from "./modules/group/http/group.controllers.js";

import { OpportunityRepositoryImpl } from "./modules/opportunity/core/infrastructure/opportunity.repository.impl.js";
import { OpportunityService } from "./modules/opportunity/core/application/opportunity.service.js";
import { OpportunityController } from "./modules/opportunity/core/http/opportunity.controller.js";

import { OpportunitySummaryRepositoryImpl } from "./modules/opportunity/summary/infrastructure/opportunity.summary.repository.impl.js";
import { OpportunitySummaryService } from "./modules/opportunity/summary/application/opportunity.summary.service.js";
import { OpportunitySummaryController } from "./modules/opportunity/summary/http/opportunity.summary.controller.js";

import { DashboardRepository } from "./modules/dashboard/infrastructure/dashboard.repository.js";
import { DashboardController } from "./modules/dashboard/http/dashboard.controller.js";
import { DashboardService } from "./modules/dashboard/application/dashboard.service.js";

import { ForecastController } from "./modules/ml/forecast/http/forecast.controller.js";
import { ForecastService } from "./modules/ml/forecast/application/forecast.service.js";
import { ForecastMLClient } from "./modules/ml/forecast/infrastructure/forecast.ml-client.js";
import { ForecastRepository } from "./modules/ml/forecast/infrastructure/forecast.repository.js";

import { RedisEventPublisher } from "./shared/infrastructure/messaging/redis/redis.event.publisher.js";

const userRepository = new UserRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const roleRepository = new RoleRepositoryImpl();
const groupRepository = new GroupRepositoryImpl();
const forecastRepository = new ForecastRepository();
const forecastMLClient = new ForecastMLClient();
const dashboardRepository = new DashboardRepository();
const opportunityRepository = new OpportunityRepositoryImpl();
const opportunitySummaryRepository = new OpportunitySummaryRepositoryImpl();
const forecastService = new ForecastService(forecastRepository, forecastMLClient);

const passwordHasher = new BcryptPasswordHasher();

// Services
const authService = new AuthService(
    userRepository,
    passwordHasher,
    process.env.JWT_SECRET!
);

const userService = new UserService(
    userRepository,
    passwordHasher,
);

const userReportService = new UserReportService(
    userRepository,
);

const excelUserReport = new ExcelUserReport(
);

const productService = new ProductService(
    productRepository,
);

const roleService = new RoleService(
    roleRepository,
)

const groupService = new GroupService(
    groupRepository,
)

const publisher = new RedisEventPublisher();
const opportunityService = new OpportunityService(
    opportunityRepository,
    publisher,
)

const opportunitySummaryService = new OpportunitySummaryService(
    opportunitySummaryRepository,
)

const dashboardService = new DashboardService(
    dashboardRepository,
)

// Controllers
export const authController = new AuthController(authService);
export const userController = new UserController(userService, userReportService, excelUserReport);
export const productController = new ProductController(productService);
export const roleController = new RoleController(roleService);
export const groupController = new GroupController(groupService);
export const opportunityController = new OpportunityController(opportunityService);
export const opportunitySummaryController = new OpportunitySummaryController(opportunitySummaryService);

export const dashboardController = new DashboardController(dashboardService);
export const forecastController = new ForecastController(forecastService);

// Middleware
export const authMiddleware = new AuthMiddleware(authService);