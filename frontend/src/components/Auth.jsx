import React, { useState } from 'react';
import axios from "axios"
import './Auth.css';
import { useDispatch } from 'react-redux';
import { authActions } from "./store";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
   
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      
      if (res && res.data) {
        const data = res.data;
        console.log(data);
        return data;
      } 
    
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
         
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };




  return (
    <>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='login-input-box'>
          <h1 className='login-heading'>
            {isSignup ? 'Signup' : 'Login'}
          </h1>

          {isSignup && (
            <input type='text'
              onChange={handleChange}
              placeholder='Name'
              name='name'
              value={inputs.name} />
          )}

          <input type='text'
            onChange={handleChange}
            placeholder='Email'
            name='email'
            value={inputs.email} />

          <input type='password'
            onChange={handleChange}
            placeholder='Password'
            name='password'
            value={inputs.password} />

          <button className='login-btn' type='submit'>
            Submit
          </button>
          <p>OR</p>
          <button className='create-account-btn' onClick={() => setIsSignup(!isSignup)}>
            Change To {isSignup ? 'Login' : 'Signup'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Auth;
