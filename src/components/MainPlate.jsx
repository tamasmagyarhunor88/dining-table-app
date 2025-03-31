// components/MainPlate.jsx - Simplified Main plate component
import React from 'react';
import './MainPlate.css';

function MainPlate({ state }) {
  const served = state === 'served' || state === 'finished';
  const empty = state === 'finished';

  return (
    <div className="main-plate">
      {served && !empty && <div className="main-food">Main Course</div>}
      {served && empty && <div className="empty-plate">Empty</div>}
      {!served && <div className="no-food"></div>}
    </div>
  );
}

export default MainPlate;