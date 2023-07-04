import AlreadyLoggedIn from "../../L2/AuthenticationComponents/AlreadyLoggedIn";
import Login from "../../L2/AuthenticationComponents/Login"
import Register from "../../L2/AuthenticationComponents/Register"
import PageContentWrapper from "../../L2/PageContentWrapper";
import { useEffect, useState } from "react";
const Authentication = ({setImage}) => {

  const backgroundImageUrl = require('./../../../auth1.jpg');
  setImage(backgroundImageUrl);

  const [loginOpen,setLoginOpen] = useState(true)
  const [authenticated,setAuthenticated] = useState(false)
  useEffect(()=>{
    const sessionData = JSON.parse(sessionStorage.getItem('access_token'));
    if(sessionData){
      setAuthenticated(true);
    }
    else{
      setAuthenticated(false);
    }
  },[])
    return <PageContentWrapper>
      {authenticated ? <AlreadyLoggedIn token={sessionStorage.getItem('access_token')} setAuthenticated={setAuthenticated}/> :
      (loginOpen ? <Login setLoginOpen={setLoginOpen} setAuthenticated={setAuthenticated}/> : <Register setLoginOpen={setLoginOpen} setAuthenticated={setAuthenticated}/>)}
      </PageContentWrapper>;
  };
  
  export default Authentication;