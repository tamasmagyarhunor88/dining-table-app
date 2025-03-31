// components/SoupPlate.jsx - Soup plate component
import React from 'react';
import './SoupPlate.css';

function SoupPlate({ empty }) {
  return (
    <div className="soup-plate">
      {!empty ? <div className="soup">Soup</div> : <div className="empty-soup">Empty</div>}
    </div>
  );
}

export default SoupPlate;