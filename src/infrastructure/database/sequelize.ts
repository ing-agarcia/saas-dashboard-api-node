import { Sequelize } from "sequelize";

// const dbType = process.env.DB_TYPE as "postgres" | "mysql";

const dbType = process.env.DB_TYPE;

if (!dbType) {
    throw new Error("DB_TYPE is not defined in the .env");
}

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: dbType as "postgres" | "mysql",
        logging: false,
    }
);
