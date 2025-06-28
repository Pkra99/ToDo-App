import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getTodo = asyncHandler(async(req, res) => {

     if(!req.user || !req.user._id){
        throw new ApiError(401, "Not authorized to access this route")
    }
    const todo = await Todo.find({user: req.user._id})

    if(!todo){
        throw new ApiError(404, "No todo found")
    }
     

    res.status(200).json(
        new ApiResponse(200, todo, "Todo fetched successfully")
    )


})


const setTodo = asyncHandler(async(req, res) => {

    const {title, description} = req.body

    
    if(!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Please provide title and description",
        })    
    }
    
    const todo = await Todo.create({
        title,
        description,
        user: req.user._id,
        completed: false,
    })

    const user = await User.findById(req.user._id)

    if(!user){
        throw new ApiError(404, "User not found")
    }

    user.todos.push(todo._id)
    await user.save()

    res.status(200)
    .json(new ApiResponse(200, todo, "Todo created successfully"));

})


const updateTodo = asyncHandler(async(req, res) => {

     const {title, description} = req.body

    if(!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Please provide title and description",
        })    
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id,
        {
            title,
            description
        },
        {
            new: true
        }   
    )

    if(!todo){
        throw new ApiError(404, "No todo found")
    }

    if(todo.user.toString() !== req.user._id.toString()){
        throw new ApiError(401, "User not authorized")
    }

    res.status(200).json(
        new ApiResponse(200, todo, "Todo updated successfully")
    )
})


const deleteTodo = asyncHandler(async(req, res) => { 
    
    const todo = await Todo.findById(req.params.id)
    
    if(!todo){
        throw new ApiError(404, "No todo found")
    }

    if(todo.user.toString() !== req.user._id.toString()){
        throw new ApiError(401, "User not authorized")
    }
    
    await todo.deleteOne(todo._id);

    const user = await User.findById(req.user._id)
     if(!user){
        throw new ApiError(404, "User not found")
    }

    user.todos.pop(todo._id)
    await user.save()

    res.status(200).json(
        new ApiResponse(200, todo, "Todo deleted successfully")
    )   
})

export {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo,
}