import dotenv from "dotenv";
import express from "express";
import cookiesParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cookiesParser());
app.use(
    cors({
        origin: "https://nuril-portofolio.vercel.app",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(express.static("./public"));

import userRoutes from "./routes/user.route.js";
import projectRoutes from "./routes/project.route.js";
import certificate from "./routes/certificate.route.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/certificates", certificate);

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.DATABASE, {})
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

export default app;
