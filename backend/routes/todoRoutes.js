import { Router } from "express";
import { getTodo, setTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/getTodo").get(verifyJWT, getTodo)
router.route("/setTodo").post(verifyJWT, setTodo);
router.route("/updateTodo/:id").put(verifyJWT, updateTodo)
router.route("/deleteTodo/:id").delete(verifyJWT, deleteTodo);


export default router;