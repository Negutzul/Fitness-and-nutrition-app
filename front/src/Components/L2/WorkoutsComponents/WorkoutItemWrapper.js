import React from "react";

const WorkoutItemWrapper = ({ workout, onCardClick }) => {
  return (
    <div 
        onClick={() => onCardClick(workout)} 
        className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out"
        style={{ width: '98%', margin: '10px' }}>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{workout.title}</div>
            <p className="text-gray-700 text-base">{workout.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{workout.difficulty}</span>
        </div>
    </div>
  );
};

export default WorkoutItemWrapper;