import React from 'react';
import Header from './Header/Header.js';
import './LoginFormCSS.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "./firebaseConfig.js";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

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
        navigate("/ProfileDetails");
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
    const form = document.getElementById('loginForm');
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '40px' }}>
        <div id='abc' className="col-md-4 p-3 shadow-sm border rounded-5 border-primary login" style={{ width: '370px', height: '500px' }}>
          <h2 className="text-center mb-4 text-primary" style={{ height: '50px' }}>Login Form</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email or userName
              </label>
              <input
                type="email"
                name="email"
                className="form-control border border-primary"
                placeholder='Enter your Email'
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
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
              />
            </div>
            <p className="small">
              <a href="#!" className="text-primary">
                Forgot password?
              </a>
            </p>
            <div className="d-grid">
              <Link to="#" onClick={handleLinkClick} className="login-btn1">
                Login
              </Link>
            </div>
          </form>
          <div className="mt-3">
            <p className="mb-0 text-center">
              Don't have an account?{' '}
              <a href="/SignUpForm" className="text-primary fw-bold">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;