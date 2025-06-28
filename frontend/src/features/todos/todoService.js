import axios from 'axios'


const API_URL = 'http://localhost:8000/api/todos/'

// add todo

const addTodo = async(todoData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.post(API_URL + 'setTodo', todoData, config)
    return response.data
}   

// get todos
const getTodos = async(token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.get(API_URL + 'getTodo', config)
    return response.data.data  
}

// delete todo

const deleteTodo = async(todoId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.delete(API_URL + 'deleteTodo/' + todoId, config)
    return response.data.data  
}


const todoService = {
    addTodo,
    getTodos,
    deleteTodo,
}

export default todoService
