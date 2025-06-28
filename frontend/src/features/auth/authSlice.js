import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

//initial state
const initialState = {
    user: user ? user : null,
    error: false,
    loading: false,
    success: false,
    message: '',
}

//register user

export const signup = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
    try {
       return await authService.signup(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout user

export const logout = createAsyncThunk('auth/logout', 
    async () => { 
        await authService.logout()
})

//login user

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
       return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,  
    reducers: {
     reset: (state) => {
        state.loading = false,
        state.error = false,
        state.success = false,
        state.message = ''
    },
    },

    extraReducers: (builder) => {
        builder
        .addCase(signup.pending, (state) => {
            state.loading = true
        })
        .addCase(signup.rejected, (state, action)=>{
            state.loading = false
            state.error = true
            state.message = action.payload
            state.user = null
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.user = action.payload
        })
        .addCase(logout.fulfilled, (state) =>{
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(login.rejected, (state, action)=>{
            state.loading = false
            state.error = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.user = action.payload
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer