// @ts-ignore: No type definitions for 'pg'
import pg, { Pool } from "pg";
import { convertPlaceholders } from "./sqlHelper.js";

export class PostgresDatabase {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
        });
    }

    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        const pgSql = convertPlaceholders(sql);
        // console.log("SQL:", pgSql);
        // console.log("PARAMS:", params);
        const result = await this.pool.query<T>(pgSql, params);
        // console.log("ROWS:", result.rows);
        return result.rows;

    }

    async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
        const pgSql = convertPlaceholders(sql);
        //console.log("SQL:", pgSql);
        //console.log("PARAMS:", params);
        const result = await this.pool.query<T>(pgSql, params);
        //console.log("ROWS:", result.rows[0]);
        return result.rows[0] ?? null;

    }

}