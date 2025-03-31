// components/Table.jsx - Main Table component
import React, { useState } from 'react';
import Cloth from './Cloth';
import './Table.css';

function Table() {
  const [placemats, setPlacemats] = useState([
    { id: 1, name: "Hunor" },
    { id: 2, name: "Lara" },
    { id: 3, name: "Isabela" },
    { id: 4, name: "Lee" }
  ]);

  return (
    <div className="table">
      <h2>The Dining Table</h2>
      <Cloth placemats={placemats} />
    </div>
  );
}

export default Table;