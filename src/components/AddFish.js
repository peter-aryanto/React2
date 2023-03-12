import React from 'react';

const initStatusOptions = ['...', 'Available', 'Unavailable',];
const changedStatusOptions = ['Available', 'Unavailable',];

function AddFish(props) {
  const nameRef = React.useRef();
  const priceRef = React.useRef();
  const statusRef = React.useRef();
  const descRef = React.useRef();
  const imgRef = React.useRef();

  const [statusOptions, setStatusOptions] = React.useState(initStatusOptions);
  const [status, setStatus] = React.useState(initStatusOptions[0]);
  const changeStatus = (e) => {
    // Clean-Up
    // if (currentStatus != null) {
    if (status == initStatusOptions[0]) {
      setStatusOptions(changedStatusOptions);
    }

    // Select
    const currentStatus = statusRef.current.value;
    console.log(currentStatus);
    setStatus(currentStatus);
  }

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

    setStatusOptions(initStatusOptions);
    setStatus(initStatusOptions[0])
  };

  return (
    <form className='fish-edit' onSubmit={addFish}>
      <input ref={nameRef} type='text' placeholder='Name' />
      <input ref={priceRef} type='text' placeholder='Price' />
      <select ref={statusRef} onChange={changeStatus} value={status}>
        {/*<option value='available'>Fresh</option>
        <option value='unavailable'>Sold Out</option>*/}
        {statusOptions.map((s, i) => (<option key={`status${i}`} value={s}>{s}</option>))}
      </select>
      <textarea ref={descRef} placeholder='Description'></textarea>
      <input ref={imgRef} type='text' placeholder='Image' />
      <button>Add Fish</button>
    </form>
  );
}

export default AddFish;