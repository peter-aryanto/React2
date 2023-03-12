import React from 'react';
import AddFish from './AddFish';

function Inventory(props) {
  return (
    <div className='inventory'>
      <AddFish addFish={props.addFish} />
    </div>
  );
}

export default Inventory;