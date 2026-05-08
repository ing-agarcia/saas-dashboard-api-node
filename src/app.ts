import express from "express";
import userRoutes from "@/modules/user/http/user.routes.js";
import roleRoutes from "@/modules/role/http/role.routes.js";
import groupRoutes from "@/modules/group/http/group.routes.js";
import productRoutes from "@/modules/product/http/product.routes.js";
import authRoutes from "@/modules/auth/http/auth.routes.js";
import dashboardRoutes from "@/modules/dashboard/http/dashboard.routes.js";
import opportunityRoutes from "@/modules/opportunity/core/http/opportunity.routes.js";
import opportunitySummaryRoutes from "@/modules/opportunity/summary/http/opportunity.summary.routes.js";
import cors from "cors";
import { errorHandler } from "./shared/http/middlewares/errorHandler.js";
import forecastRoutes from "./modules/ml/forecast/http/forecast.routes.js";
import { RedisEventSubscriber } from "./shared/infrastructure/messaging/redis/redis.event.subscriber.js";

const app = express();

// Middlewares
app.use(cors())
app.use(express.json());

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/products", productRoutes)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/opportunities/summary", opportunitySummaryRoutes)
app.use("/api/forecast", forecastRoutes);

// Rutas públicas
app.use('/api/auth', authRoutes);
app.use(errorHandler);

async function bootstrap() {

    const subscriber = new RedisEventSubscriber();

    await subscriber.start();

    app.listen(3000, () => {
        console.log("Server running");
    });
}

bootstrap();

export default app;