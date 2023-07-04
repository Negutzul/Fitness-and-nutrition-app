import React, { useState } from 'react';
import "./styles.css";

const RegisterTrainer = ({ setLoginOpen ,setImage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const backgroundImageUrl = require('./../../../addTrainer.jpg');
  setImage(backgroundImageUrl);

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
    const response = await fetch('http://localhost:8080/api/v1/auth/registerTrainer', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "firstname": firstName,
        "lastname": lastName,
        "email": email,
        "password": password
      })
    });

    if (response.ok) {
      setModalMessage('Registration successful!');
    } else {
      setModalMessage("Registration failed! \n An account with the specified email already exists");
    }
    setModalVisible(true);
  };

  const handleRegisterToLogin = () => {
    setLoginOpen((state) => { return !state })
  }

  return (
    <div>
      {modalVisible &&
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
        <div className="bg-gray-900 absolute inset-0 opacity-75"></div>
        <div className="bg-white p-8 rounded-lg text-black relative" style={{ maxHeight: '80vh', overflowY: 'auto' }}><div className="modal">
          <span style={{whiteSpace: 'pre-line'}}>{modalMessage}</span> <br/>
          <button onClick={() => setModalVisible(false)}className="mt-4 inline-block bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >Close</button>
        </div></div>
        </div>
      }
      {<form className="w-full flex justify-center items-center" onSubmit={handleRegisterFormSubmit}>
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
                 value={email} placeholder="Email" onChange={handleEmailChange} required>
          </input>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Password</label>
          <input type="text"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={password} placeholder="Password" onChange={handlePasswordChange} required>
          </input>
        </div>
        <button type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
          Add trainer
        </button>        
      </div>
    </form>}
    </div>
  );
};

export default RegisterTrainer;