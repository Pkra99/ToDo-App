import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/userModel.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res)=>{
    // get user data from front end via body
    // validation
    // check if user already exists
    // create user document and save to DB
    // remove password and refersh token from the response

    const {username, email, password} = req.body;

    if(!username || !email || !password){
        throw new ApiError(400,'Please provide all the fields')
    }

    User.findOne({
        $or: [{email}, {username}]
    })
    
    if(User){
        throw new ApiError(400,'User already exists')
    }

    User.create({
        username: username.toLowerCase(),
        email,
        password, 
    })

    const createdUser = await User.findById(User._id).select('-password, -refreshToken')

    if(!createdUser){
        throw new ApiError(500,'Could not create user')
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User created successfully')
    )
})

const loginUser = asyncHandler(async(req,res)=>{
    // get user credentials from the front end via body
    // validate for input
    // find user
    // check email and password
    // generate access and refresh tokens
    // send tokens via coockie
})

const logoutUser = asyncHandler(async(req, res) => {
    // get user
    // remove cookie
    // remove refreshToken from DB
    // send response
})

export{
    registerUser,
    loginUser,
    logoutUser
}