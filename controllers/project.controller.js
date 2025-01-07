import project from '../models/project.model.js';


export const createProject = async (req, res) => {
    try {
        const { title, type, as, techstack, description, url } = req.body;

        const createProject = await project.create({
            title,
            type,
            as,
            techstack,
            description,
            url,
        });

        return res.status(201).json({
            status: "success",
            data: {
                createProject,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await project.find();

        return res.status(200).json({
            status: "success",
            data: {
                projects,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

export const getProjectById = async (req, res) => {
    try {
        const {id} = req.params;
        const projectById = await project.findById(id);

        return res.status(200).json({
            status: "success",
            data: {
                projectById,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

export const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, type, as, teckstack, description, image, url } = req.body;

        const updateProjectById = await project.findByIdAndUpdate(id, {
            title,
            type,
            as,
            teckstack,
            description,
            image,
            url
        })

        if (!updateProjectById) {
            return res.status(404).json({
                status: "error",
                message: "Project not found",
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                updateProjectById,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteProjectById = await project.findByIdAndDelete(id);

        if (!deleteProjectById) {
            return res.status(404).json({
                status: "error",
                message: "Project not found",
            });
        }

        return res.status(204).json({
            status: "success",
            message: "Project deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

export const imageProjectUpload = async (req, res) => {
    const file = req.file;

    if(!file) {
        return res.status(400).json({
            status: "error",
            message: "Please upload an image",
        });
    }

    const split = file.originalname.split(".");
    const ext = split[split.length - 1];
    const filename = split[0];
    const fileBuffer = file.buffer;
    const fileName = `Project-${filename}-${Date.now()}.${ext}`;

    const uploadedFile = await imagekit.upload({
        file: fileBuffer,
        fileName: fileName,
    });

    const imageUrl = uploadedFile.url;

    const uploadProject = await project.findByIdAndUpdate(
        req.params.id,
        { image: uploadedFile.url },
        { new: true }
    );

    if (!uploadProject) {
        return res.status(404).json({
            status: "error",
            message: "Project not found",
        });
    }

    res.status(201).json({
        status: "success",
        message: "File uploaded successfully",
        data: uploadProject,
    });
}