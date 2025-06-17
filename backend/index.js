import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";

//env

dotenv.config({
    path: "./.env"
});

//port

const port = process.env.PORT;
const app = express();

//middlewares

app.use(express.json({ limit: "32kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true
}))


//DB connection

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


//Routes 

import todoRouter from "./routes/todoRoutes.js";
import userRouter from "./routes/userRoutes.js";

app.use("/api/todos", todoRouter)

app.use("/api/users", userRouter)









