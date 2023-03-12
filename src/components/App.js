import React, { useState } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

function App() {
  const [fishes, setFishes] = useState({});

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

  return (
    <div className='catch-of-the-day'>
      <div className='menu'>
        <Header />
        <ul className='fishes'>
          {Object.keys(fishes).map((k) => (
            <Fish key={`menu${k}`} fish={fishes[k]}/>
          ))}
        </ul>
      </div>
      <Order />
      <Inventory addFish={addFish} loadSample={loadSample} fishes={fishes}/>
    </div>
  );
}

export default App;