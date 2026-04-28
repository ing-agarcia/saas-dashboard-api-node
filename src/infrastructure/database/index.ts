import { Database } from "./database.js";
import { MySQLDatabase } from "./mysql.js";
import { PostgresDatabase } from "./postgres.js";

let db: Database | null = null;

export function getDatabase(): Database {
    if (!db) {
        db = (
            process.env.DB_TYPE === "postgres"
                ? new PostgresDatabase()
                : new MySQLDatabase()
        ) as Database;
    }

    return db;
}