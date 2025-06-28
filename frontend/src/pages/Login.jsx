import { useState, useEffect } from "react"
import { FaSignInAlt} from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux"
import{useNavigate} from "react-router-dom"
import {toast} from "react-toastify" 
import {login, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "", 
    })

    const{ email, password } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const{user, error, loading, success, message} = useSelector(
        (state) => state.auth)

     useEffect(() => {
        if(error) {
            toast.error(message)
        }
        if(success || user) {
            navigate('/')
        }
        dispatch(reset())
    },[user, error, loading, success, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))

    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        } 
        dispatch(login(userData))
    }

    if(loading) {
        return <Spinner />
    }    

  return (
    <>
        <section className="heading">
        <h1>
        <FaSignInAlt/> Login
        </h1>
        <p>Login to your account</p>
        </section>
          <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                id="email" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={onChange}
                />
                </div>

                <div className="form-group">
                <input 
                type="password" 
                className='form-control' 
                id="password" 
                name="password" 
                placeholder="Password" 
                value={password} 
                onChange={onChange}
                />
                </div>

                <div className="form-group">
                <button type="submit" className="btn btn-block">Login</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login