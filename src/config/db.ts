import "dotenv/config";

import { getDatabase } from "@/infrastructure/database/index.js";
import { sequelize } from "@/infrastructure/database/sequelize.js";

export const db = getDatabase();
export const sequelizeInstance = sequelize;

export async function initDatabase() {
    try {
        await sequelizeInstance.authenticate();
        console.log("✅ Sequelize conectado");

    } catch (error) {
        console.error("❌ Error conectando Sequelize:", error);
        process.exit(1);
    }
}