import React, { useState } from "react";
import "./SignUpFormCSS.css";
import Header from "./Header/Header.js";
import { database } from "./firebaseConfig.js";
import { ref, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check for password match only if both password and confirmPassword are not empty
    if (name === "password" && formData.confirmPassword !== "") {
      checkPasswordMatch(value, formData.confirmPassword);
    } else if (name === "confirmPassword" && formData.password !== "") {
      checkPasswordMatch(formData.password, value);
    }

    // Check for password length
    if (name === "password" && value.length < 8) {
      setPasswordLengthError(true);
    } else {
      setPasswordLengthError(false);
    }
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch || passwordLengthError) {
      return;
    }

    // Destructure the form data
    const { email, password } = formData;

    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(getAuth(), email, password);

      // Push user data to the 'users' node (you can customize the node name)
      push(ref(database, "users"), {
        email: email,
        // Note: Avoid storing passwords directly in the database for security reasons
        // Only include it here for educational purposes
        password: password,
      });

      // Clear the form data
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      // Redirect to login page
      navigate("/LoginForm");
      window.alert('User registered successfully');
    } catch (error) {
      // Handle specific error cases
      switch (error.code) {
        case 'auth/email-already-in-use':
          console.error('Error registering user:', 'Email already in use');
          // Inform the user that the email is already in use
          window.alert('Email is already in use');
          break;
        case 'auth/invalid-email':
          console.error('Error registering user:', 'Invalid email address');
          // Inform the user that the email is invalid
          window.alert('Invalid email address');
          break;
        default:
          console.error('Error registering user:', error.message);
          // Inform the user about a general registration error
          window.alert('Registration failed. Please try again.');
          break;
      }
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="email" className="signup-label" id="email1">
            Email or UserName
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email or userName"
            value={formData.email}
            onChange={handleChange}
            required
            className="signup-input"
          />

          <label htmlFor="password" className="signup-label" id="password1">
            Create Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
            className="signup-input"
          />

          <label htmlFor="confirmPassword" className="signup-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="signup-input"
          />

          {!passwordMatch &&
            formData.password !== "" &&
            formData.confirmPassword !== "" && (
              <p className="signup-error-text">Passwords do not match</p>
            )}

          {passwordLengthError && (
            <p className="signup-error-text">
              Password must be at least 8 characters
            </p>
          )}

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-login-link">
          Already have an account?{" "}
          <a href="/LoginForm" className="signup-link">
            Log in
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
