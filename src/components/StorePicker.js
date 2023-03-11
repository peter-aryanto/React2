import React from 'react';

function StorePicker() {
  return (
    <form className='store-selector'>
      <h2>Please Enter A Store</h2>
      <input type='text' required placeholder='Store Name' />
      <button>Visit Store</button>
    </form>
  );
}

export default StorePicker;