import './App.css';
import NavigationMenu from './Components/L1/NavigationMenu';

function App() {

  const backgroundImageUrl = require('./Images/contact.jpg');

    const backgroundStyle = {
      backgroundImage: `url(${backgroundImageUrl})`,
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
      <NavigationMenu/>
    </div>
  );
}

export default App;
