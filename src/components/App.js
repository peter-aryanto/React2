import React, { useState } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

function App() {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});

  React.useEffect(() => {
    // console.log(`Fishes`);
    // console.log(fishes);
  }, [fishes]);

  const addFish = (newFish) => {
    const allFishes = {...fishes};
    allFishes[newFish.name] = newFish;
    setFishes(allFishes);
  };

  const loadSample = () => {
    setFishes(sampleFishes);
  };

  const addToOrder = (fishKey) => {
    const currentOrder = {...order};
    currentOrder[fishKey] = currentOrder[fishKey] + 1 || 1;
    console.log(currentOrder);
    setOrder(currentOrder);
  };

  return (
    <div className='catch-of-the-day'>
      <div className='menu'>
        <Header />
        <ul className='fishes'>
          {Object.keys(fishes).map((k) => (
            <Fish key={`menu${k}`} fish={fishes[k]} addToOrder={addToOrder} fishKey={k} />
          ))}
        </ul>
      </div>
      <Order fishes={fishes} order={order} />
      <Inventory addFish={addFish} loadSample={loadSample} fishes={fishes}/>
    </div>
  );
}

export default App;