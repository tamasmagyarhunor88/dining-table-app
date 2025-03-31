// components/Placemat.jsx - Placemat component with state management
import React, { useState, useEffect } from 'react';
import MainPlate from './MainPlate';
import SoupPlate from './SoupPlate';
import Utensils from './Utensils';
import './Placemat.css';

function Placemat({ guest }) {
  const [hasSoup, setHasSoup] = useState(false);
  const [soupEaten, setSoupEaten] = useState(false);
  const [hasMain, setHasMain] = useState(false);
  const [mainEaten, setMainEaten] = useState(false);
  const [message, setMessage] = useState('');

  // useEffect to demonstrate lifecycle - show message when soup is served
  useEffect(() => {
    if (hasSoup) {
      setMessage(`Hot soup served to ${guest}!`);
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasSoup, guest]);

  // useEffect to demonstrate conditional effects - show message when main course is served
  useEffect(() => {
    if (hasMain) {
      setMessage(`Main course served to ${guest}!`);
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasMain, guest]);

  // Function to serve soup
  const getSoup = () => {
    if (!hasSoup) {
      setHasSoup(true);
      setSoupEaten(false);
    }
  };

  // Function to eat soup
  const eatSoup = () => {
    if (hasSoup && !soupEaten) {
      setSoupEaten(true);
      setMessage(`${guest} has finished their soup!`);
      
      // Add a delay before removing the soup plate completely
      setTimeout(() => {
        setMessage('');
        setHasSoup(false); // This will remove the soup plate completely
      }, 3000);
    }
  };

  // Function to serve main course
  const getMain = () => {
    if (soupEaten && !hasMain) {
      setHasMain(true);
      setMainEaten(false);
    } else if (!soupEaten) {
      setMessage('Please finish your soup first!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Function to eat main course
  const eatMain = () => {
    if (hasMain && !mainEaten) {
      setMainEaten(true);
      setMessage(`${guest} has finished their main course!`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="placemat">
      <h3>{guest}'s Setting</h3>
      <div className="setting">
      <div className="plate-area">
        {hasSoup && <SoupPlate empty={soupEaten} />}
        <MainPlate hasFood={hasMain} empty={mainEaten} />
      </div>
        <Utensils />
      </div>
      <div className="message">{message}</div>
      <div className="controls">
        <button onClick={getSoup} disabled={hasSoup}>Get Soup</button>
        <button onClick={eatSoup} disabled={!hasSoup || soupEaten}>Eat Soup</button>
        <button onClick={getMain} disabled={!soupEaten || hasMain}>Get Main</button>
        <button onClick={eatMain} disabled={!hasMain || mainEaten}>Eat Main</button>
      </div>
    </div>
  );
}

export default Placemat;