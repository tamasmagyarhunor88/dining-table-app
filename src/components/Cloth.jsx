// components/Cloth.jsx - Tablecloth component
import React from 'react';
import Placemat from './Placemat';
import './Cloth.css';

function Cloth({ placemats }) {
  return (
    <div className="cloth">
      <div className="placemats-container">
        {placemats.map(placemat => (
          <Placemat key={placemat.id} guest={placemat.name} />
        ))}
      </div>
    </div>
  );
}

export default Cloth;