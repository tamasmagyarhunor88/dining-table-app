// components/Placemat.jsx - Placemat component with state management
import React, { useState, useEffect } from 'react';
import MainPlate from './MainPlate';
import SoupPlate from './SoupPlate';
import Utensils from './Utensils';
import './Placemat.css';

// In Placemat.jsx, change the initial state:
function Placemat({ guest }) {
  const [hasSoup, setHasSoup] = useState(true); // Start with soup plate visible
  const [soupEaten, setSoupEaten] = useState(false);
  const [soupServed, setSoupServed] = useState(false); // New state for soup being served
  const [hasMain, setHasMain] = useState(true); // Start with main plate visible 
  const [mainEaten, setMainEaten] = useState(false);
  const [mainServed, setMainServed] = useState(false); // New state for main being served
  const [message, setMessage] = useState('');

  // Update the getSoup function
  const getSoup = () => {
    if (hasSoup && !soupServed) {
      setSoupServed(true);
      setMessage(`Hot soup served to ${guest}!`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Update the eatSoup function
  const eatSoup = () => {
    if (hasSoup && soupServed && !soupEaten) {
      setSoupEaten(true);
      setMessage(`${guest} has finished their soup!`);
      
      // Add a delay before removing the soup plate completely
      setTimeout(() => {
        setMessage('');
        setHasSoup(false); // This will remove the soup plate completely
      }, 3000);
    }
  };

  // Update the getMain function
  const getMain = () => {
    if (hasMain && !soupServed) {
      setMessage('Please serve and eat your soup first!');
      setTimeout(() => setMessage(''), 3000);
    } else if (hasMain && soupServed && !soupEaten) {
      setMessage('Please finish your soup first!');
      setTimeout(() => setMessage(''), 3000);
    } else if (hasMain && !mainServed) {
      setMainServed(true);
      setMessage(`Main course served to ${guest}!`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Update the eatMain function
  const eatMain = () => {
    if (hasMain && mainServed && !mainEaten) {
      setMainEaten(true);
      setMessage(`${guest} has finished their main course!`);
      
      // Add a delay before removing the main plate
      setTimeout(() => {
        setMessage('');
        setHasMain(false); // This will remove the main plate completely
      }, 3000);
    }
  };

  // Update the JSX rendering
  return (
    <div className="placemat">
      <h3>{guest}'s Setting</h3>
      <div className="setting">
        <div className="plate-area">
          {hasMain && <MainPlate hasFood={mainServed} empty={mainEaten} />}
          {hasSoup && <SoupPlate served={soupServed} empty={soupEaten} />}
        </div>
        <Utensils />
      </div>
      <div className="message">{message}</div>
      <div className="controls">
        <button onClick={getSoup} disabled={!hasSoup || soupServed}>Serve Soup</button>
        <button onClick={eatSoup} disabled={!hasSoup || !soupServed || soupEaten}>Eat Soup</button>
        <button onClick={getMain} disabled={!hasMain || mainServed || (hasSoup && !soupEaten)}>Serve Main</button>
        <button onClick={eatMain} disabled={!hasMain || !mainServed || mainEaten}>Eat Main</button>
      </div>
    </div>
  );
}

export default Placemat;