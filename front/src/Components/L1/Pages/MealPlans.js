import React, { useEffect, useState } from 'react';
import styles from './MealPlans.module.css';
import jwt_decode from 'jwt-decode';

const MealPlans = ({setImage}) => {
  const backgroundImageUrl = require('./../../../mealplan.jpg');
  setImage(backgroundImageUrl);
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [canEditModal, setCanEditModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [refreshList,setRefreshList] = useState(true);
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('access_token'));
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/mealPlans/listMealPlans', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setMealPlans(data);
    };
    fetchData();
    
  }, [refreshList]);

  const openModal = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
    setModalIsOpen(true);
    setTitle(mealPlan.title);
    setDescription(mealPlan.description);
    setBodyType(mealPlan.bodyType);
    const token = JSON.parse(sessionStorage.getItem('access_token'));
    const decodedToken = jwt_decode(token);
    if(mealPlan.userID == Number(decodedToken.id) || decodedToken.Role == "ADMIN")
      setCanEditModal(true);
      else
      setCanEditModal(false)
  };

  const closeModal = () => {
    setSelectedMealPlan(null);
    setModalIsOpen(false);
    setEditModalOpen(false);
    setTitle('');
    setDescription('');
    setBodyType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(sessionStorage.getItem('access_token'));

    const requestData = {
      title,
      description,
      bodyType,
    };
    const api = 'http://localhost:8080/api/mealPlans/changeMealPlan/' + selectedMealPlan.id;
    try {
      const response = await fetch(api, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Post created successfully');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setTimeout(() => {
      setRefreshList((state)=>!state)
    }, 700);
    closeModal()
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const token = JSON.parse(sessionStorage.getItem('access_token'));

    const api = 'http://localhost:8080/api/mealPlans/deleteMealPlan/' + selectedMealPlan.id;
    try {
      const response = await fetch(api, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: '',
      });

      if (response.ok) {
        console.log('Post deleted successfully');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setTimeout(() => {
      setRefreshList((state)=>!state)
    }, 700);
    closeModal()
  };

return (
    <div className={styles['meal-plans']}>
      {mealPlans.map(mealPlan => (
        <div className={styles['meal-plan-card']} key={mealPlan.id} onClick={() => openModal(mealPlan)}>
          <h2>{mealPlan.title}</h2>
          <p>{mealPlan.bodyType}</p>
        </div>
      ))}

      {modalIsOpen && ( editModalOpen ? 
        (
        <div className={styles['modal-overlay']}>
        <div className={styles['meal-plan-modal']}>
          <form onSubmit={handleSubmit}>
            <label>
              Title: &nbsp;
              <input style={{ borderRadius: '5px' }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
              Description: &nbsp;
              <input style={{ borderRadius: '5px' }}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
        Body Type: &nbsp;
        <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} style={{ borderRadius: '5px' }}>
          <option value="ectomorph">Ectomorph</option>
          <option value="mesomorph">Mesomorph</option>
          <option value="endomorph">Endomorph</option>
        </select>
            <br />
      </label>
            <br />
            <button type="submit" onClick={()=>setEditModalOpen(true)} style={{border :'5px solid blue',borderRadius: "10px",background:'blue' ,color:"white"}}>Submit mealPlan changes</button>
          </form>
            <button onClick={closeModal} style={{border :'5px solid red',borderRadius: "10px",background:'red' ,color:"white"}}>Close</button>
          </div>
        </div>
        ) : (
        <div className={styles['modal-overlay']}>
          <div className={styles['meal-plan-modal']}>
          
          
          <h2>Title: {selectedMealPlan.title}</h2>
          <p>Author id: {selectedMealPlan.userID}</p>
          <p>Description: {selectedMealPlan.description}</p>
        
          <p></p>
            {canEditModal &&
            <button onClick={()=>setEditModalOpen(true)} style={{border :'5px solid blue',padding:"5px",borderRadius: "10px",background:'blue' ,color:"white"}}>Edit</button>
            } &nbsp;
              {canEditModal &&
              <button onClick={handleDelete} style={{border :'5px solid blue',borderRadius: "10px",padding:"5px",background:'blue' ,color:"white"}}>Delete</button>
              }
            &nbsp;
            <button onClick={closeModal} style={{border :'5px solid red',borderRadius: "10px",background:'red' ,padding:"5px",color:"white"}}>Close</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealPlans;