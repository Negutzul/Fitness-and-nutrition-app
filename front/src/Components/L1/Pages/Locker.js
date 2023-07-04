import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import styles from './Locker.module.css'; 
import Modal from 'react-modal';

const Locker = ({setImage}) => {
  const backgroundImageUrl = require('./../../../locker.jpg');
  setImage(backgroundImageUrl);
  const [notes, setNotes] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [welcomeMessage] = useState("Welcome to your own locker! Here, you can add notes about workouts, meal plans, or any other text you need.");
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  Modal.setAppElement('#root');  // This line is needed for accessibility purposes


  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('access_token'));
    fetch('http://localhost:8080/api/locker/getLockerContent', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.text())
    .then(data => setNotes(data))
    .catch(err => console.log(err));
    

    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = () => {
    const token = JSON.parse(sessionStorage.getItem('access_token'));
    fetch('http://localhost:8080/api/locker/putLockerContent', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/plain'
      },
      body: notes
    })
    .then(response => {
      if (response.ok) {
        setMessage("Edit Successful");
        handleClose();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage("Edit Failed");
        handleClose();
        setTimeout(() => setMessage(''), 3000);
      }
    })
    .catch(err => console.log(err));

  };

  const handleMessage = ()=>{
    if(message == "Edit Successful") 
      return styles.message 
    return styles.badmessage

  }
  return (
    <div className={styles.lockerContainer}>
      <h2 className={styles.welcomeMessage}>{welcomeMessage}</h2>
      <Form.Group className={styles.notesArea}>
        <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleShow} className="text-white mt-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
        Submit
      </Button>
  
      <Modal 
    isOpen={show}
    onRequestClose={handleClose}
    contentLabel="Confirm Submission"
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)', 
        zIndex: '9999'
      },
      content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: windowDimensions.width < 600 ? '70%' : '40%',
        height: windowDimensions.width < 600 ? '50%' : '40%',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '20px',
        outline: 'none',
        padding: '20px',
        boxShadow: '0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }}
  >
  <p className={styles.modalText}>Do you want to submit the changes?</p>
  <div style={{display: 'flex',
  flexDirection: 'row'}}>
  <Button variant="secondary" onClick={handleClose} className="text-white mt-2 bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none">
    Close
  </Button>
  <Button variant="primary" onClick={handleSubmit} className="text-white mt-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
    Save Changes
  </Button>
  </div>
</Modal>
  
      {message && (
        <div className={handleMessage()}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Locker;