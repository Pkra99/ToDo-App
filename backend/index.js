import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import {getTodo, setTodo, updateTodo, deleteTodo} from "./routes/todoRoutes.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT;
const app = express();

app.use(express.json("limit: 16kb"))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())


app.use(cors({
    origin: process.env.CROS_ORIGIN.CROS_ORIGIN,
    Credentials: true
}))

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.use("/api/todos", getTodo);
app.use("/api/todos", setTodo);
app.use("/api/todos", updateTodo);
app.use("/api/todos", deleteTodo);







