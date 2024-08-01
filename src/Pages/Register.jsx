import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Logo from '../../src/assets/Logo.jpg';
import { MDBRadio } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../Utils/base_url';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Footer from '../Components/Footer';


function Register() {

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('')
  const [secretPass,setSecretPass] = useState('')
  const navigate = useNavigate('')

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!username || !password || !email) {
      toast.error("Please enter all fields");
      return;
    }
  
    if (!role) {
      toast.error("Please select the role");
      return;
    }
  
    if (role === 'admin' && !secretPass) {
      toast.error("Enter your Admin code to register");
      return;
    }
  
    try {
        await axios.post(`${baseURL}/api/register`, {
        username,
        email,
        password,
        userType: role,
        secretID: secretPass
      });
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/');
      }, 2000);
     
    } catch (err) {
      toast.error("Email already exists!");
    } 
  }
  

    const renderTextBox = (e)=>
      {
        if(role === 'admin')
          {
           return(

                <Form.Group className="mt-3" controlId="exampleForm.ControlInput3">
                <Form.Control type="password" placeholder="Enter your Admin code " value={secretPass} onChange={(e) => setSecretPass(e.target.value)} />
                </Form.Group>
           )
          }
         return null;
      }


  return (
    <div>
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
            transition: Bounce
            />

<div className="container w-75 transparent-bg p-5 mt-3">
      <div className="row justify-content-center p-5">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="text-center mb-4">
            <img src={Logo} width="120px" style={{ marginTop: "-30px" }} alt="Logo" />
          </div>
          <Form onSubmit={handleRegister}>
            <h3 className="text-center" style={{marginTop:"-50px"}}><b className="text-primary">Book<span className="text-warning">Holic</span></b></h3>
            
            <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Username " value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput2">
              <Form.Control type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Control type="password" placeholder="Password " value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="d-flex justify-content-center mt-4">
              <MDBRadio name="inlineRadio" id="inlineRadio1" value="user" label=" user" inline  onChange={(e) => setRole(e.target.value)} />
              <MDBRadio name="inlineRadio" id="inlineRadio2" value="admin" label=" admin" inline onChange={(e) => setRole(e.target.value)} />
            </Form.Group>

            {
              renderTextBox()              
            }

            <button className="btn btn-primary w-100 mt-3">Register</button>
            <p className="text-center mt-3">Already have an account? <Link className='text-warning' style={{textDecoration:'none'}} to={'/'}>Login Now</Link></p>
            
          </Form>
        </div>
      </div>
                 
    </div>
    

    </div>
  )
}

export default Register