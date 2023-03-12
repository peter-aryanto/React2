import React, { useState } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';

function App() {
  const [fishes, setFishes] = useState({});

  React.useEffect(() => {
    console.log(`Fishes`);
    console.log(fishes);
  }, [fishes]);

  const addFish = (newFish) => {
    const allFishes = {...fishes};
    allFishes[newFish.name] = newFish;
    setFishes(allFishes);
  };

  const loadSample = () => {
    setFishes(sampleFishes);
    // console.log(fishes);
  };

  return (
    <div className='catch-of-the-day'>
      <div className='menu'>
        <Header />
      </div>
      <Order />
      <Inventory addFish={addFish} loadSample={loadSample}/>
    </div>
  );
}

export default App;