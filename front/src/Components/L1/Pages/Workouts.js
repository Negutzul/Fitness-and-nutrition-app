import React, { useEffect, useState } from "react";
import PageContentWrapper from "../../L2/PageContentWrapper";
import WorkoutItemWrapper from "../../L2/WorkoutsComponents/WorkoutItemWrapper";
import jwt_decode from 'jwt-decode';
import WorkoutPlanAdder from "../../L2/ElementAdderComponents/WorkoutPlanAdder";
const Workouts = ({setImage}) => {
  
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [refreshList,setRefreshList] = useState(false);
  const [canEditModal,setCanEditModal] = useState(false); 
  const [editSelected,setEditSelected] = useState(false); 

  const backgroundImageUrl = require('./../../../fitness-muscular-man-rear-shot-o7hjg0p7g1afqd8t.jpg');
  setImage(backgroundImageUrl);

  const token = JSON.parse(sessionStorage.getItem('access_token'));

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/workouts/listWorkouts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching workouts');
        }
        
        const data = await response.json();
        setWorkouts(data);

      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };
    
    fetchWorkouts();
    
  }, [refreshList]);

  const openModal = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);

    const decodedToken = jwt_decode(token);
    if(workout)
    if(workout.userID == Number(decodedToken.id) || decodedToken.Role == "ADMIN")
      setCanEditModal(true);
      else
      setCanEditModal(false)
  };

  const closeModal = () => {
    setSelectedWorkout(null);
    setShowModal(false);
    setEditSelected(false);

    const decodedToken = jwt_decode(token);
    setRefreshList((state)=>!state)
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();

    const token = JSON.parse(sessionStorage.getItem('access_token'));

    const api = 'http://localhost:8080/api/workouts/DeleteWorkout/' + selectedWorkout.id;
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
    closeModal();
  };


  return (
    <PageContentWrapper>
      {workouts.map((workout) => (
        <WorkoutItemWrapper workout={workout} onCardClick={openModal} key={workout.id} />
      ))}
      {showModal && selectedWorkout && (editSelected ? <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
  <div className="bg-gray-900 absolute inset-0 opacity-75"></div>
  <div className="bg-white p-8 rounded-lg text-black relative" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
    <WorkoutPlanAdder PnumExercises={selectedWorkout.exercises.length} Pexercises={selectedWorkout.exercises} Preps={selectedWorkout.reps}
     Pbreaks={selectedWorkout.breaks} Ptitle={selectedWorkout.title} Pdescription={selectedWorkout.description} 
     Pdifficulty={selectedWorkout.difficulty} PeditId={selectedWorkout.id} closeModal={()=>{
      setTimeout(() => {
        setRefreshList((state)=>!state)
      }, 700);
      closeModal()}}/><button
              onClick={() => closeModal(null)}
              className="mt-4 inline-block bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Close
            </button>
  </div>
</div>
 : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 absolute inset-0 opacity-75"></div>
          <div className="bg-white p-8 rounded-lg text-black relative">
            <h2 className="text-2xl font-semibold mb-4">{selectedWorkout.title}</h2>
            <p className="mb-2">Author id: {selectedWorkout.userID}</p>
            <p className="mb-2">Description: {selectedWorkout.description}</p>
            <p className="mb-2">Difficulty: {selectedWorkout.difficulty}</p>
            <p className="mb-2">Published: {selectedWorkout.published ? 'Yes' : 'No'}</p>
            <p className="mb-2">Exercises: {selectedWorkout.exercises.join(', ')}</p>
            <p className="mb-2">Reps: {selectedWorkout.reps.join(', ')}</p>
            <p className="mb-2">Breaks: {selectedWorkout.breaks.join(', ')}</p>
            <button
              onClick={() => closeModal(null)}
              className="mt-4 inline-block bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Close
            </button> &nbsp; 
            {
            canEditModal && 
              <><button
              onClick={() => setEditSelected(true)}
              className="mt-4 inline-block bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Edit
            </button> &nbsp; 
            <button
              onClick={handleDelete}
              className="mt-4 inline-block bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Delete
            </button></>
            }
          </div>
        </div>
      ))}
    </PageContentWrapper>
  );
};

export default Workouts;