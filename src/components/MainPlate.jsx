// components/MainPlate.jsx - Main plate component
import React from 'react';
import './MainPlate.css';

function MainPlate({ hasFood, empty }) {
  return (
    <div className="main-plate">
      {hasFood && !empty && <div className="main-food">Main Course</div>}
      {hasFood && empty && <div className="empty-plate">Empty Plate</div>}
    </div>
  );
}

export default MainPlate;