// components/Placemat.jsx - Simplified Placemat component
import React, { useState, useEffect } from 'react';
import MainPlate from './MainPlate';
import SoupPlate from './SoupPlate';
import Utensils from './Utensils';
import './Placemat.css';

function Placemat({ guest }) {
  const [soupState, setSoupState] = useState('not served');
  const [mainState, setMainState] = useState('not served');
  const [message, setMessage] = useState('');
  
  // Track visibility separately from state to allow for transition effects
  const [showSoup, setShowSoup] = useState(true);
  const [showMain, setShowMain] = useState(true);

  // Helper to set messages with auto-clear
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Handle plate removal with delay after finishing
  useEffect(() => {
    if (soupState === 'finished') {
      setTimeout(() => {
        setShowSoup(false);
      }, 3000);
    }
  }, [soupState]);

  useEffect(() => {
    if (mainState === 'finished') {
      setTimeout(() => {
        setShowMain(false);
      }, 3000);
    }
  }, [mainState]);

  // Soup controls
  const serveSoup = () => {
    if (soupState === 'not served') {
      setSoupState('served');
      showMessage(`Hot soup served to ${guest}!`);
    }
  };

  const eatSoup = () => {
    if (soupState === 'served') {
      setSoupState('finished');
      showMessage(`${guest} has finished their soup!`);
    }
  };

  // Main course controls
  const serveMain = () => {
    if (soupState === 'not served') {
      showMessage('Please serve and eat your soup first!');
    } else if (soupState === 'served') {
      showMessage('Please finish your soup first!');
    } else if (mainState === 'not served') {
      setMainState('served');
      showMessage(`Main course served to ${guest}!`);
    }
  };

  const eatMain = () => {
    if (mainState === 'served') {
      setMainState('finished');
      showMessage(`${guest} has finished their main course!`);
    }
  };

  return (
    <div className="placemat">
      <h3>{guest}'s Setting</h3>
      <div className="setting">
        <div className="plate-area">
          {showMain && (
            <MainPlate 
              state={mainState}
            />
          )}
          {showSoup && (
            <SoupPlate 
              state={soupState}
            />
          )}
        </div>
        <Utensils />
      </div>
      <div className="message">{message}</div>
      <div className="controls">
        <button onClick={serveSoup} disabled={!showSoup || soupState !== 'not served'}>Serve Soup</button>
        <button onClick={eatSoup} disabled={!showSoup || soupState !== 'served'}>Eat Soup</button>
        <button onClick={serveMain} disabled={!showMain || mainState !== 'not served' || soupState !== 'finished'}>Serve Main</button>
        <button onClick={eatMain} disabled={!showMain || mainState !== 'served'}>Eat Main</button>
      </div>
    </div>
  );
}

export default Placemat;