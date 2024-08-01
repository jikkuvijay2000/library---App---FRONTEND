import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Logo from '../../src/assets/Logo.jpg';
import { MDBRadio } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import baseURL from '../Utils/base_url.js';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!role) {
            toast.error("Please select a role");
            return;
        }
        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post(`${baseURL}/api/login`, {
                email,
                password,
                userType: role
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID)
            window.localStorage.setItem("username", response.data.username)
            window.localStorage.setItem("role", response.data.role)
            console.log(cookies);
            if (role === 'admin') {
                toast.success(`Welcome ${response.data.username} 🎉, How are you doing today?`);
                toast.info("You now have all the ADMIN privilages")
                setTimeout(() => {
                    navigate('/admin')
                }, 2000);
                return;
            }
            if (role === 'user') {
                toast.success(`Welcome ${response.data.username} 🎉, How are you doing today?`)
                setTimeout(() => {
                    navigate('/home')
                }, 2000);
                return;
            }
        } catch (err) {
            console.log(err);
            toast.error("Have you registered?If not try registering as our member✨")
            setTimeout(() => {
                navigate('/register')
            }, 2300);
        }
    }

    return (
        <div className="container rounded w-75 transparent-bg p-5 mt-4">
            <div className="row justify-content-center p-5">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="text-center mb-4">
                        <img src={Logo} width="120px" style={{ marginTop: "-30px" }} alt="Logo" />
                    </div>
                    <Form onSubmit={handleLogin}>
                        <h3 className="text-center" style={{ marginTop: "-50px" }}>
                            <b className="text-primary">Book<span className="text-warning">Holic</span></b>
                        </h3>
                        <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-center mt-4">
                            <MDBRadio name="inlineRadio" id="inlineRadio1" value="user" label="User" onChange={(e) => setRole(e.target.value)} inline />
                            <MDBRadio name="inlineRadio" id="inlineRadio2" value="admin" label="Admin" onChange={(e) => setRole(e.target.value)} inline />
                        </Form.Group>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                        <p className="text-center mt-3">or</p>
                        <Link to={'/register'} className="btn btn-warning w-100">Register Now</Link>
                    </Form>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


        </div>
    );
}

export default Login;
