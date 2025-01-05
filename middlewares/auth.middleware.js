import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const protectedMiddleware = async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            return res.status(401).json({
                status: "error",
                message: "You are not authorized to access this route",
            })
        }
    } else {
        return res.status(401).json({
            status: "error",
            message: "Not Authorized, no token",
        })
    }
}