import express from "express";
import {
    createProject,
    deleteProject,
    getProjectById,
    getProjects,
    updateProject,
    imageProjectUpload,
} from "../controllers/project.controller.js";
import { protectedMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

router.post("/", protectedMiddleware, createProject);
router.get("/", protectedMiddleware, getProjects);
router.get("/:id", protectedMiddleware, getProjectById);
router.patch("/:id", protectedMiddleware, updateProject);
router.delete("/:id", protectedMiddleware, deleteProject);
router.post("/image-upload/:id", protectedMiddleware , upload.single('image'), imageProjectUpload);

export default router;
