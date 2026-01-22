"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormModel = void 0;
const database_1 = require("../config/database");
exports.FormModel = {
    create: async (data) => {
        try {
            const [result] = await database_1.pool.query("INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)", [data.name, data.email, data.socialMedia || null, data.message]);
            return result;
        }
        catch (error) {
            console.error("[FormModel] Insert failed:", error.sqlMessage || error.message);
            throw error;
        }
    },
    findAll: async () => {
        const [rows] = await database_1.pool.query("SELECT * FROM portfolio ORDER BY createdAt DESC");
        return rows;
    },
};
