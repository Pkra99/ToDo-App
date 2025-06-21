import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux"
import{useNavigate} from "react-router-dom"
import {toast} from "react-toastify" 
import {signup, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"


function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const{name, username, email, password, confirmPassword} = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const{user, error, loading,  success, message} = useSelector((state) => state.auth)

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

        if(password !== confirmPassword) {
            toast.error("Passwords do not match")
        }
        else {
            const userData = {
                name, 
                username, 
                email,
                password
            }
            dispatch(signup(userData))
        }


    }

    if(loading){
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
        <h1>
        <FaUser/> Signup
        </h1>
        <p>Sign up to create new account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                id="name" 
                name="name" 
                placeholder="Name" 
                value={name} 
                onChange={onChange}
                />
                </div>

                <div className="form-group">
                <input 
                type="text" 
                className='form-control' 
                id="username" 
                name="username" 
                placeholder="Username" 
                value={username} 
                onChange={onChange}
                />
                </div>

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
                <input 
                type="password" 
                className='form-control' 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={onChange}
                />
                </div>

                <div className="form-group">
                <button type="submit" className="btn btn-block">Submit</button>
                </div>
   
            </form>
        </section>
    </>
  )
}

export default Signup