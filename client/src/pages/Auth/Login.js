import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went Wrong');
        }
    };
    return (
        <Layout title='Login-Ecommerce app'>

            <div className='login'>
                <h1>Login Here</h1>
                <form onSubmit={handleSubmit}>

                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary ">Submit</button>
                    </div>
                </form>


            </div>

        </Layout>
    )
}

export default Login