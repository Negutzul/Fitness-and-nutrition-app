import React, { useEffect, useState } from 'react';
import styles from './MealPlans.module.css';

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  }, []);

  const openModal = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMealPlan(null);
    setModalIsOpen(false);
  };

  return (
    <div className={styles['meal-plans']}>
      {mealPlans.map(mealPlan => (
        <div className={styles['meal-plan-card']} key={mealPlan.id} onClick={() => openModal(mealPlan)}>
          <h2>{mealPlan.title}</h2>
          <p>{mealPlan.bodyType}</p>
        </div>
      ))}

      {modalIsOpen && (
        <div className={styles['modal-overlay']}>
          <div className={styles['meal-plan-modal']}>
            <h2>{selectedMealPlan.title}</h2>
            <p>{selectedMealPlan.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlans;