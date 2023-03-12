import React from 'react';
import AddFish from './AddFish';

function Inventory(props) {
  const fishes = props.fishes;
  return (
    <div className='inventory'>
      <AddFish addFish={props.addFish} />
      <button type='button' onClick={props.loadSample}>Load Sample</button>
      <br />
      <br />
      {Object.keys(fishes).map((k) => (<AddFish key={`inv${k}`} fish={fishes[k]} />))}
    </div>
  );
}

export default Inventory;