import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/userModel.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'


const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, 'Please provide all the fields')
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw new ApiError(400, 'User already exists')
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if (!createdUser) {
        throw new ApiError(500, 'Could not create user')
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User created successfully')
    )
})

const loginUser = asyncHandler(async (req, res) => {

    const GenerateAccessAndRefreshtoken = async (userID) => {
        try {
            const user = await User.findById(userID)
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();
            user.refreshToken = refreshToken

            await user.save({ validateBeforeSave: false })
            return { accessToken, refreshToken }

        } catch (error) {
            throw new ApiError(500, 'Could not generate tokens')
        }
    }

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'Please provide all the fields')
    }
    const user = await User.findOne({ email })

    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(400, 'Invalid email or password')
    }

    const { accessToken, refreshToken } = await GenerateAccessAndRefreshtoken(user._id)

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, {}, 'Logged in successfully'))

})
const logoutUser = asyncHandler(async (req, res) => {
    
    
    if(!req.user){
        
        throw new ApiError(401, 'Not authorized')
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    res.status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, {}, "logged out"))
})

const refreshAccessToken = asyncHandler(async(req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Invalid refresh token")
    }
    
    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET)
        const user = await User.findById(decoded?._id)

        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }

        if(user.refreshToken !== incomingRefreshToken){
            throw new ApiError(401, "Invalid refresh token")
        }

        const options = {
        httpOnly: true,
        secure: true,
        }

        const {acessToken, newRefreshToken} = await GenerateAccessAndRefreshtoken(user._id, options)    
        
        return res
        .status(200)
        .cookie('accessToekn', acessToken, options)
        .cookie('refreshToken', newRefreshToken, options)
        .json(
            new ApiResponse(200, {accessToken, refresToken: newRefreshToken}, 'AcessToken refreshed')
        )


    } catch (error) {
        new ApiError(401, "Invalid refresh token")
    }
})

const updatePassword = asyncHandler(async(req, res)=>{

    const {oldPassword, newPassword, confPassword} = req.body

    const user = await User.findById(req.user._id)

    const isPasswordCorrect = user.comparePassword(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid password")
    }

    if(newPassword !== confPassword){
        throw new ApiError(400, "Passwords do not match")
    }

    user.password = newPassword
    user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password updated successfully")
    )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updatePassword,
}