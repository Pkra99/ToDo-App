import Todo from "../models/todoModel.js";

// @desc    Get todos
// @route   GET /api/todos  
// @access  Public
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({
            success: true,
            data: todos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching todos",
        });
    }
};
// @desc    Set todo
// @route   POST /api/todos
// @access  Public
const setTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating a todo",
        });
    }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json({
            success: true,
            data: updatedTodo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating a todo",
        });
    }
};

// @desc    Delete todo   
// @route   DELETE /api/todos/:id
// @access  Public

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting a todo",
        });
    }
};

export { getTodos, setTodo, updateTodo, deleteTodo };









































// const getTodo = ("/", (req, res) => {
//   res.status(200).json({ message: "get todo" });
// });

// const setTodo = ("/", (req, res) => {
//   res.status(200).json({ message: "set todo" });
// });

// const updateTodo = ("/:id", (req, res) => {
//   res.status(200).json({ message: "update todo" });
// });

// const deleteTodo = ("/:id", (req, res) => {
//   res.status(200).json({ message: "delete todo" });
// });

// export { getTodo, setTodo, updateTodo, deleteTodo };