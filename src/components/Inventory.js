import React from 'react';
import AddFish from './AddFish';

function Inventory(props) {
  return (
    <div className='inventory'>
      <AddFish addFish={props.addFish} />
      <button type='button' onClick={props.loadSample}>Load Sample</button>
    </div>
  );
}

export default Inventory;