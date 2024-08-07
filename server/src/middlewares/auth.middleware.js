import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";



export const verifyJwt = asyncHandler( async (req, _, next) => {
    try {
        const accessToken = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if(!accessToken) {
            throw new ApiError(401, "Unauthorized request")
        }

        const verifyToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
                
        const user = await User.findById(verifyToken?.id).select("-password -refreshToken")
        
        if(!user) {
            throw new ApiError(401, "Unauthorized accessToken")
        }
        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid accessToken")
    }
})