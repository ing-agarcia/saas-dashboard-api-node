import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initDatabase } from "./config/db.js";

const PORT = process.env.PORT;

async function startServer() {
    try {
        await initDatabase();

        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Error iniciando la aplicación:", error);
        process.exit(1);
    }
}

startServer();
