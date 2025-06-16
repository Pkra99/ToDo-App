import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace('Bearer ', "")

        if (!token) {
            return next(new ApiError(401, "Not authorized to access this route"))
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decoded?.id).select('-password -refreshToken')
        if (!user) {
            return new ApiError(401, "Not authorized to access this route")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Not authorized to access this route")
    }
})

