"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        console.log("🚀 Starting Server...");
        console.log("Environment:", process.env.NODE_ENV || "development");
        // Connect to database
        await (0, database_1.connectToDB)();
        // Start server
        app_1.default.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📊 Health endpoint: http://localhost:${PORT}/api/health`);
            console.log(`📤 Form endpoint: http://localhost:${PORT}/api/form/submit`);
        });
    }
    catch (error) {
        console.error("💥 Failed to start server:", error.message);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map