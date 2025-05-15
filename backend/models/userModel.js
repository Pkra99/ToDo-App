import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 20,
        index: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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


userSchema.pre("Save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password)
    next();
})

userSchema.method.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken = function () {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
userSchema.method.generateRefreshToken = function () {
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};

export default mongoose.model("User", userSchema);