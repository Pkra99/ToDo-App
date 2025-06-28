import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
  todos: [],
  error: false,
  success: false,
  loading: false,
  message: "",
};

// Add Todo

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todoData, thunkAPI) => {
    try {
      // Get token from state
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.addTodo(todoData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// get todo

export const getTodos = createAsyncThunk(
  "todos/get", async (_, thunkAPI) => {
    try {
      // Get token from state
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.getTodos(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete todo

export const deleteTodo = createAsyncThunk(
  "todos/delete", async (todoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.deleteTodo(todoId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.todos = action.payload; // Update the todos with fetched data
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Remove the deleted todo from the state
        state.todos = state.todos.filter(todo => todo._id !== action.payload._id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;