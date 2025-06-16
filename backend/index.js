import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import todoRouter from "./routes/todoRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT;
const app = express();

app.use(express.json({ limit: "32kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true
}))

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


app.use("/api/todos", todoRouter)
// app.use("/api/todos", getTodo);
// app.use("/api/todos", setTodo);
// app.use("/api/todos", updateTodo);
// app.use("/api/todos", deleteTodo);

app.use("/api/users", userRouter)









