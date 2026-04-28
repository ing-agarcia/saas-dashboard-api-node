import mysql, { Pool } from "mysql2/promise";
import { Database } from "./database.js";
import { RowDataPacket } from "mysql2/promise";

export class MySQLDatabase implements Database {
    private pool: Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT)
        });
    }

    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(sql, params);
        return rows as T[];
    }

    async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(sql, params);
        return (rows as T[])[0] ?? null;
    }
}