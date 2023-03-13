import React, { useEffect, useState } from 'react';
import AddFish from './AddFish';
import Login from './Login';
import { firebaseAuth, firebaseDb } from '../firebase-helper';
import { FacebookAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { onValue, ref, set } from 'firebase/database';

function Inventory(props) {
  const fishes = props.fishes;

  const [currentUserId, setCurrentUserId] = useState(null);
  const [storeOwnerUserId, setStoreOwnerUserId] = useState(null);

  const authHandler = (userData) => {
    onValue(
      ref(firebaseDb, `${props.storeId}`),
      (snapshot) => {
        const store = snapshot.val();
        // if (!store) {
        //   return;
        // }

        if (!store?.owner) {
          set(ref(firebaseDb, `${props.storeId}/owner`), userData.uid);
        }

        setCurrentUserId(userData.uid);
        setStoreOwnerUserId(store.owner || userData.uid);
      }
    );
  };

  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      (userData) => {
        if (userData) {
          authHandler(userData)
        }
      }
    );
  }, []);

  const isLoggedIn = !!(currentUserId);
  const isStoreOwner = isLoggedIn && currentUserId === storeOwnerUserId;

  const login = async (provider) => {
    // console.log(provider);
    // let authProviderClass = FacebookAuthProvider;
    let authProvider = new FacebookAuthProvider();
    if (provider === 'Github') {
      // authProviderClass = GithubAuthProvider;
      authProvider = new GithubAuthProvider();
    }

    const result = await signInWithPopup(firebaseAuth, authProvider);
    // console.log(result);
    // const credential = authProviderClass.credentialFromResult(result);
    // console.log(credential);
    // setCurrentUserId(result.user.uid);
    authHandler(result.user);
  };

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    setCurrentUserId(null);
  };
  const logout = <button onClick={handleLogout}>Logout</button>;

  if (!isLoggedIn) {
    return (<Login login={login} />);
  }

  if (!isStoreOwner) {
    return (
      <div>
        <p>You are logged in but you are not the store owner.</p>
        {logout}
      </div>
    );
  }

  return (
    <div className='inventory'>
      {logout}
      <br />
      <br />
      <h2>Inventory</h2>
      <AddFish addFish={props.addFish} />
      <button type='button' onClick={props.loadSample}>Load Sample</button>
      <br />
      <br />
      {Object.keys(fishes).map((k) => (<AddFish key={`inv${k}`} fish={fishes[k]} fishKey={k} removeFish={props.removeFish} updateFish={props.updateFish} />))}
    </div>
  );
}

export default Inventory;