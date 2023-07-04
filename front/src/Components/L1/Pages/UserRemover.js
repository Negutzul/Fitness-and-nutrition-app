import React, { useState } from 'react';
import "./styles.css";

const UserRemover = ({ setLoginOpen ,setImage}) => {
  const [toBeRemovedId, setToBeRemovedId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const backgroundImageUrl = require('./../../../removeContent.jpg');
  setImage(backgroundImageUrl);

  const handleToBeRemovedId = (e) => {
    setToBeRemovedId(e.target.value);
  };


  const handleRegisterFormSubmit = async (e) => {
    
    e.preventDefault();
    
    const token = JSON.parse(sessionStorage.getItem('access_token'));

    const response = await fetch(('http://localhost:8080/api/v1/admin/deleteUser/' + toBeRemovedId), {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
      body: '',
    });

    if (response.ok) {
      setModalMessage('User removed successfuly!');
    } else {
      setModalMessage('Removing user failed!');
    }
    setModalVisible(true);
  };


  return (
    <div>
      {modalVisible &&
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
        <div className="bg-gray-900 absolute inset-0 opacity-75"></div>
        <div className="bg-white p-8 rounded-lg text-black relative" style={{ maxHeight: '80vh', overflowY: 'auto' }}><div className="modal">
          <span>{modalMessage}</span> <br/>
          <button onClick={() => setModalVisible(false)}className="mt-4 inline-block bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >Close</button>
        </div></div>
        </div>
      }
      {<form className="w-full flex justify-center items-center" onSubmit={handleRegisterFormSubmit}>
      <div className="w-96">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-black dark:text-white">User id</label>
          <input type="text"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 value={toBeRemovedId} placeholder="Enter the id of the user you want to remove" onChange={handleToBeRemovedId} required>
          </input>
        </div>
        <button type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
          Remove user
        </button>        
      </div>
    </form>}
    </div>
  );
};

export default UserRemover;