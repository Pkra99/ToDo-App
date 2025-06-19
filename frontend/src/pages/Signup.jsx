import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"

function Signup() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const{name, email, password, confirmPassword} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))

    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
        <seaction className="heading">
        <h1>
        <FaUser/> Signup
        </h1>
        <p>Sign up to create new account</p>
        </seaction>

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