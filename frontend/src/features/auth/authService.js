import axios from 'axios'

const API_URL = 'https://todo-app-lve8.onrender.com/api/users/'

//register user

const signup = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user

const logout = () => {
    localStorage.removeItem('user')
}

// login user

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
    
}

const authService = {
    signup,
    logout,
    login,
}

export default authService