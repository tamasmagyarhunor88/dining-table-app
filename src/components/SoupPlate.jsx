// components/SoupPlate.jsx - Simplified Soup plate component
import React from 'react';
import './SoupPlate.css';

function SoupPlate({ state }) {
  const served = state === 'served' || state === 'finished';
  const empty = state === 'finished';

  return (
    <div className="soup-plate">
      {served && !empty && <div className="soup">Soup</div>}
      {served && empty && <div className="empty-soup">Empty</div>}
      {!served && <div className="no-soup"></div>}
    </div>
  );
}

export default SoupPlate;