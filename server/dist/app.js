"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const form_route_1 = __importDefault(require("./routes/form.route"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// ✅ Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});
// ✅ API routes
app.use("/api/form", form_route_1.default);
// ✅ Serve React app in production
if (process.env.NODE_ENV === "production") {
    const buildPath = path_1.default.join(__dirname, "../../client/build");
    app.use(express_1.default.static(buildPath));
    // All other routes go to React app
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(buildPath, "index.html"));
    });
}
exports.default = app;
//# sourceMappingURL=app.js.map