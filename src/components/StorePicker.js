import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function StorePicker(props) {
  const storeNameRef = useRef();
  const navigate = useNavigate();

  const goToStore = (e) => {
    e.preventDefault();
    const storeName = storeNameRef.current.value;
    const storeUrl = `/store/${storeName}`;
    navigate(storeUrl);
  };    

  return (
    <form onSubmit={goToStore} className='store-selector'>
      <h2>Please Enter A Store</h2>
      <input ref={storeNameRef} type='text' required placeholder='Store Name' />
      <button>Visit Store</button>
    </form>
  );
}

export default StorePicker;