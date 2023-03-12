import React, { useEffect, useState, } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import { firebaseApp, firebaseDb } from '../firebase-helper';
import { useLocation, useParams } from 'react-router-dom';
import { getDatabase, ref ,set, onValue } from 'firebase/database';

function App() {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});

  const location = useLocation();
  // console.log(location);

  const params = useParams();
  // console.log(params.storeId);
  const firebaseDbPath = `${params.storeId}/fishes`;

  const fishesDbRef = ref(firebaseDb, firebaseDbPath);

  React.useEffect(() => {
    onValue(
      fishesDbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setFishes(data);
        }
      }
    );
    
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      console.log(localStorageRef);
      setOrder(JSON.parse(localStorageRef));
    }
  }, []);

  const saveFishes = (allFishes) => {
    // set(ref(firebaseDb, firebaseDbPath), allFishes);
    set(fishesDbRef, allFishes);
  };

  React.useEffect(() => {
    try {
      if (Object.keys(fishes).length > 0) {
        saveFishes(fishes);
      }
    } catch {}
  }, [fishes]);

  React.useEffect(() => {
    try {
      if (Object.keys(order).length > 0) {
        localStorage.setItem(params.storeId, JSON.stringify(order))
      }
    } catch {}
  }, [order]);

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

  const removeFish = (fishKey) => {
    const currentFishes = {...fishes};
    // delete currentFishes[fishKey];
    currentFishes[fishKey].status = 'Unavailable';
    setFishes(currentFishes);
  }

  const updateFish = (fishKey, propName, propValue) => {
    const currentFishes = {...fishes};

    const fish = currentFishes[fishKey];
    if (!fish || !Object.hasOwn(fish, propName)) {
      return;
    }

    fish[propName] = propValue;
    setFishes(currentFishes);
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
      <Inventory addFish={addFish} loadSample={loadSample} fishes={fishes} removeFish={removeFish} updateFish={updateFish} />
    </div>
  );
}

export default App;