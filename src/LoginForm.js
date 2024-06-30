import React, { useRef } from 'react';
import Header from './Header/Header.js';
import './LoginForm.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "./firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        console.log('Login successfully', user);
        window.alert('Login successful!');
        navigate("/Dashboard");
      } else {
        console.log('User not authenticated');
        window.alert('User not authenticated');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      window.alert('Login failed. Please try again.');
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '40px' }}>
        <div id='abc' className="col-md-4 p-3 shadow-sm border rounded-5 border-primary login" style={{ width: '370px', height: '440px' }}>
          <h2 className="text-center mb-4 text-primary" style={{ height: '50px' }}>Login Form</h2>
          <form id="loginForm" ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control border border-primary"
                placeholder='Enter your Email'
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{width:'325px',height:'45px'}}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder='Enter password'
                className="form-control border border-primary"
                id="exampleInputPassword1"
                name="password"
                style={{width:'325px',height: '45px'}}
                required
              />
            </div>
            <div className="d-grid">
              <NavLink to="#" onClick={handleLinkClick} className="login-btn1 btn btn-primary" style={{color:'white'}}>
                Login
              </NavLink>
            </div> 
          </form>
          <div className="mt-3">
            <p className="mb-0 text-center">
              I forgot my password?{' '}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hexafire4@gmail.com&su=Subject&body=Body"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0000ff", textDecoration: 'none' }}
              >
                <FaEnvelope style={{ color: "#0000ff", marginRight: "0.5rem" }} />
                <span style={{ color: "#0000ff" }}>Contact Dev</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;