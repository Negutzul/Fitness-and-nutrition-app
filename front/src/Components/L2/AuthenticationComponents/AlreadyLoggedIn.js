import jwt_decode from 'jwt-decode';
import "./styles.css";
const AlreadyLoggedIn = ({token,setAuthenticated}) => {

  const decodedToken = jwt_decode(token);
  const fieldValue = decodedToken.sub;
  
  const logoutBtnHandler = () =>{
    sessionStorage.removeItem('access_token');
    setAuthenticated(false);
  }

  return (
    <>
      
      <div className="profile-container bg-white">
      <h2 className="profile-title">You are logged in.</h2>
      <div className="profile-details">
        {/* <p>
          <span className="profile-label">ID:</span> {id}
        </p> */}
        <p>
          <span className="profile-label">Email:</span> {fieldValue}
        </p>
        <p>
          <span className="profile-label">Role:</span> {decodedToken.Role}
        </p>
      </div>
      <button onClick={logoutBtnHandler} className="profile-logout-btn">Logout</button>
    </div>
    </>
  );
};

export default AlreadyLoggedIn;