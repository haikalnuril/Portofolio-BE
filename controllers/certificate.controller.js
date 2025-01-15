import certificate from "../models/certificate.model.js";
import imagekit from "../lib/imagekit.js";

export const createCertificate = async (req, res) => {
    try {
        const { name, publisher, year, description, image, url } = req.body;
        if (!name || !publisher || !year || !description || !url) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all required fields",
            });
        }

        const createCertificate = await certificate.create({
            name,
            publisher,
            year,
            description,
            image,
            url,
        });

        return res.status(201).json({
            status: "success",
            data: {
                createCertificate,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export const getCertificates = async (req, res) => {
    try {
        const certificates = await certificate.find();

        return res.status(200).json({
            status: "success",
            data: {
                certificates,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export const getCertificateById = async (req, res) => {
    try {
        const { id } = req.params;
        const certificateById = await certificate.findById(id);

        return res.status(200).json({
            status: "success",
            data: {
                certificateById,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export const updateCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, publisher, year, description, image, url } = req.body;

        if (!name || !publisher || !year || !description || !url) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all required fields",
            });
        }

        const updateCertificateById = await certificate.findByIdAndUpdate(id, {
            name,
            publisher,
            year,
            description,
            image,
            url,
        });

        return res.status(200).json({
            status: "success",
            data: {
                updateCertificateById,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        await certificate.findByIdAndDelete(id);

        return res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

export const imageCertificateUpload = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            status: "error",
            message: "Please upload an image",
        });
    }

    const split = file.originalname.split(".");
    const ext = split[split.length - 1];
    const filename = split[0];
    const fileBuffer = file.buffer;
    const fileName = `Certificate-${filename}-${Date.now()}.${ext}`;

    const uploadedFile = await imagekit.upload({
        file: fileBuffer,
        fileName: fileName,
    });

    const imageUrl = uploadedFile.url;

    const uploadCertificate = await certificate.findByIdAndUpdate(
        req.params.id,
        { image: uploadedFile.url },
        { new: true }
    );

    if (!uploadCertificate) {
        return res.status(404).json({
            status: "error",
            message: "Certificate not found",
        });
    }

    res.status(201).json({
        status: "success",
        message: "File uploaded successfully",
        data: uploadCertificate,
    });
};
