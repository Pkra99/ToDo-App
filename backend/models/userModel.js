import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uniquie: true,
    },
    password: {
        type: String,
        required: true,
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Todo",
    }]
})

export default mongoose.model("User", userSchema);