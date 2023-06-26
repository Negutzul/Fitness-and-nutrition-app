const WorkoutModal = ({ element, closeModal }) => {
return (
    <div className="modal-overlay">
    <div className="modal">
        <h2>{element.title}</h2>
        <p>{element.description}</p>
        <div className="modal-footer">
            <button onClick={closeModal}>Close</button>
        </div>
    </div>
    </div>
);
};
export default WorkoutModal;