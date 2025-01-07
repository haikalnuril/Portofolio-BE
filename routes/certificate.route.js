import express from "express";
import {
    createCertificate,
    deleteCertificate,
    getCertificateById,
    getCertificates,
    updateCertificate,
    imageCertificateUpload,
} from "../controllers/certificate.controller.js";
import { protectedMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

router.post("/", protectedMiddleware, createCertificate);
router.get("/", protectedMiddleware, getCertificates);
router.get("/:id", protectedMiddleware, getCertificateById);
router.patch("/:id", protectedMiddleware, updateCertificate);
router.delete("/:id", protectedMiddleware, deleteCertificate);
router.post("/image-upload/:id", protectedMiddleware, upload.single('image'), imageCertificateUpload);

export default router;