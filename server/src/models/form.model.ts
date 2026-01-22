import { pool } from "../config/database";

export const FormModel = {
  create: async (data: { name: string; email: string; socialMedia?: string; message: string }) => {
    try {
      const [result] = await pool.query(
        "INSERT INTO portfolio (name, email, socialMedia, message) VALUES (?, ?, ?, ?)",
        [data.name, data.email, data.socialMedia || null, data.message]
      );
      return result;
    } catch (error: any) {
      console.error("[FormModel] Insert failed:", error.sqlMessage || error.message);
      throw error;
    }
  },
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM portfolio ORDER BY createdAt DESC");
    return rows;
  },
};
