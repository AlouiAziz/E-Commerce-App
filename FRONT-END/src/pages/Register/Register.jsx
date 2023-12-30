import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/authSlice'
import '../Register/Register.css'
import logo from '../../Assests/images/logo-color.png'

const Register = () => {

    const [data, setData] = useState({ nom: "", prenom: "", email: "", password: "" })

    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(data))
    }

    useEffect(() => {
        if (user) {
            navigate('/Profile')
        }
    }, [user, navigate])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Register</h2>
                    <div className="text-center mb-5 text-dark">Smart Tech Hub</div>
                    <div className="card my-5">
                        <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>
                            <div className="text-center">
                                <img
                                    src={logo}
                                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px"
                                    alt="profile"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nom"
                                    name="nom"
                                    aria-describedby="emailHelp"
                                    placeholder="Nom"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="prenom"
                                    name="prenom"
                                    placeholder="Prenom"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5 w-100" style={{ color: "#fff", backgroundColor: "#0e1c36" }}>
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
