import rateLimit from "../db/upstash.js";
import asyncHandler from "../utils/asyncHandler.js";

const rateLimiter = asyncHandler(async(req, res, next) => {
    
    try {
        const {success} = await rateLimit.limit("my-limit-key")
    
        if(!success){
            return res.status(429).json({
                message: "Rate limit exceeded"
            })
        }
        next()
    } catch (error) {
        console.log("Rate limiter error",error);
        next(error)
    }
})

export default rateLimiter