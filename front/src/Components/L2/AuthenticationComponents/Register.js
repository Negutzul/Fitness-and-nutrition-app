import React, { useState } from 'react';
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Register = ({setLoginOpen,setAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate  = useNavigate();
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/v1/auth/register',{
      method: "POST",        
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "firstname": firstName,
        "lastname": lastName,
        "email": email,
        "password": password   
      })
    })
    if (!response.ok) {
      const notification = document.createElement('div');  
      notification.textContent = `Error: ` + 'the email is already used';
      notification.style.position = 'fixed';
      notification.style.top = '50%';
      notification.style.left = '50%';
      notification.style.transform = 'translate(-50%, -50%)';
      notification.style.padding = '10px';
      notification.style.backgroundColor = 'red';
      notification.style.color = 'white';
      notification.style.borderRadius = '5px';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 2000);
    } else {
    const jsonData = await response.json();

    sessionStorage.setItem('access_token', JSON.stringify(jsonData.access_token));

    const sessionData = JSON.parse(sessionStorage.getItem('access_token'));
    setAuthenticated(true);
    navigate("/");
    }

  };
  
  const handleRegisterToLogin = () =>{
    setLoginOpen((state) => {return !state})
  }

  return (
    <form className="w-full flex justify-center items-center" onSubmit={handleRegisterFormSubmit}>
      <div className="w-96">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">First Name</label>
          <input type="text"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={firstName} placeholder="First Name" onChange={handleFirstNameChange} required>
          </input>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Last Name</label>
          <input type="text"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={lastName} placeholder="Last Name" onChange={handleLastNameChange} required>
          </input>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Email</label>
          <input type="text"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={email} placeholder="Email" onChange={handleEmailChange} pattern="[^\s@]+@[^\s@]+\.[^\s.]+"
                 required       
                 onInput={(e) => e.target.setCustomValidity("")}
                 onInvalid={(e) => e.target.setCustomValidity("Enter a valid email address (with the format text@text.text)")}
                 >
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
          Sign up
        </button>
        <div className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
             onClick={() => handleRegisterToLogin()}>
          <div>
            Already have an account?
          </div>
          <div>
            Click here to login here
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;