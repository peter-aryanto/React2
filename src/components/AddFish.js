import React from 'react';

function AddFish(props) {
  const nameRef = React.useRef();
  const priceRef = React.useRef();
  const statusRef = React.useRef();
  const descRef = React.useRef();
  const imgRef = React.useRef();

  const addFish = (e) => {
    e.preventDefault();
    const newFish = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      status: statusRef.current.value,
      desc: descRef.current.value,
      img: imgRef.current.value,
    };
    props.addFish(newFish);

    const addFishForm = e.currentTarget;
    addFishForm?.reset();
  };

  return (
    <form className='fish-edit' onSubmit={addFish}>
      <input ref={nameRef} type='text' placeholder='Name' />
      <input ref={priceRef} type='text' placeholder='Price' />
      <select ref={statusRef}>
        <option value='available'>Fresh</option>
        <option value='unavailable'>Sold Out</option>
      </select>
      <textarea ref={descRef} placeholder='Description'></textarea>
      <input ref={imgRef} type='text' placeholder='Image' />
      <button>Add Fish</button>
    </form>
  );
}

export default AddFish;