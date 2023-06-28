import { useState } from 'react';
import './App.css';
import NavigationMenu from './Components/L1/NavigationMenu';

function App() {
  const backgroundImageUrl = require('./Images/contact.jpg');
  const [image,setImage] = useState(backgroundImageUrl)

    const backgroundStyle = {
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflowY: 'scroll',    
      height: '100vh',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
    };

  
  return (
    <div  style={backgroundStyle}>
      <NavigationMenu setImage={setImage}/>
    </div>
  );
}

export default App;
