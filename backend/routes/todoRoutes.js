import { Router } from "express";

const router = Router();

const getTodo = async (req, res) => {
    try {
        const todos = await todos.find({ user: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};










export { getTodo };