import user from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const isDev = process.env.NODE_ENV === "development" ? false : true;

    const cookieOptions = {
        expire: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
        ),
        // httpOnly: false,
        secure: isDev,
        // sameSite: "none",
        // path: "/",
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        data: {
            user,
        },
    });
};

export const registerUser = async (req, res) => {
    try {
        const createUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        createSendResToken(createUser, 201, res);

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Please provide email and password",
            });
        }

        const getUser = await user.findOne({ email });

        if (!getUser || !(await getUser.matchPassword(password))) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password",
            });
        }

        createSendResToken(getUser, 200, res);
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
        
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const getUser = await user.findById(req.user._id).select("-password");

        if (!getUser) {
            return res.status(401).json({
                status: "error",
                message: "User does not exist",
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                user: getUser,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

export const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        expires: new Date(Date.now()),
    });

    res.status(200).json({
        status: "success",
        message: "User logged out",
    });
};