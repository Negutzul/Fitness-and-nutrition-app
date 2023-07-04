import React, { useState } from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";


const Login = ({setLoginOpen,setAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate  = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/v1/auth/authenticate',{
      method: "POST",        
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "email": email,
        "password": password   
      })
    })
    const jsonData = await response.json();
    sessionStorage.setItem('access_token', JSON.stringify(jsonData.access_token));

    const sessionData = JSON.parse(sessionStorage.getItem('access_token'));
    setAuthenticated(true);
    navigate("/");

  };

  const handleLoginToRegister = () =>{
    setLoginOpen((state) => {return !state})
  }

  return (
    <div className="w-full flex justify-center items-center">
      <form className="w-96" onSubmit={handleLoginFormSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Email</label>
          <input type="text"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={email} placeholder="Email" onChange={handleEmailChange} required>
          </input>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Password</label>
          <input type="password"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={password} placeholder="Password" onChange={handlePasswordChange} required>
          </input>
        </div>

        <button type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
          Sign in
        </button>
        <div className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
             onClick={() => handleLoginToRegister()}>
          <div>
            New to the site?
          </div>
          <div>
            Click here to create an account
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;