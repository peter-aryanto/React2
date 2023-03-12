import React from 'react';
import { formatPrice } from '../helper';

function Fish(props) {
  // const fish = props.fish;
  const { name, price, status, desc, img } = props.fish;
  const isAvailable = (status ?? '').toLowerCase() == 'available';
  return (
    <li className='menu-fish'>
      <img src={img} alt={name} />
      <h3 className='fish-name'>
        {name}
        <span className='price'>{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        type='button'
        disabled={!isAvailable}
        onClick={() => props.addToOrder(props.fishKey)}
      >{isAvailable ? 'Add to Cart' : 'Sold Out'}</button>
    </li>
  );
}

export default Fish;