import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';  // Change this line
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    
    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(decoded));
    
    // Show toast notification with user details
    toast.success(
      <div>
        <h4>Login Successful!</h4>
        <p><strong>Name:</strong> {decoded.name}</p>
        <p><strong>Email:</strong> {decoded.email}</p>
        <p><strong>Token:</strong> {credentialResponse.credential.slice(0, 20)}...</p>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
    
    // Redirect to home page after successful login
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Please sign in to continue</p>
        
        <div className="google-login-button">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};

export default Login;