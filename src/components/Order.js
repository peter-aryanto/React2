import React from 'react';
import { formatPrice } from '../helper';

function Order(props) {
  const fishes = props.fishes;
  const order = props.order;
  const orderIds = Object.keys(order);

  function renderFish(k) {
    const fish = fishes[k]
    const count = order[k];
    if (!fish || count === null || count === undefined) {
      return null;
    }

    return (
      <li key={k}>
        {(fish.status ?? '').toLowerCase() === 'available' ?
        `${fish.name}: ${count} * ${formatPrice(fish.price)} = ${formatPrice(count * fish.price)}` :
        `${fish.name} is not available.`}
      </li>
    );
  }

  const total = orderIds.reduce((currentTotal, k) => {
    if (!fishes[k]) {
      return currentTotal;
    }

    const isAvailable = (fishes[k].status ?? '').toLowerCase() === 'available';
    if (isAvailable) {
      const count = order[k];
      const price = fishes[k].price;
      currentTotal += count * price;
    }
    return currentTotal;
  }, 0);

  return (
    <div className='order-wrap'>
      <h2>Order</h2>
      <ul className='order'>
        {orderIds.map((k) =>
          /*<li key={`order${k}`}>
            {(fishes[k].status ?? '').toLowerCase() === 'available' ? `${fishes[k].name}: ${order[k]} * ${formatPrice(fishes[k].price)} = ${formatPrice(order[k] * fishes[k].price)}` : `${fishes[k].name} is not available.`}
          </li>*/
          renderFish(k)
        )}
      </ul>
      <div className='total'>Total: <strong>{formatPrice(total)}</strong></div>
    </div>
  );
}

export default Order;