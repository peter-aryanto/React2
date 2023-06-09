import React from 'react';

const initStatusOptions = ['...', 'Available', 'Unavailable',];
const changedStatusOptions = ['Available', 'Unavailable',];

function AddFish(props) {
  const nameRef = React.useRef();
  const priceRef = React.useRef();
  const statusRef = React.useRef();
  const descRef = React.useRef();
  const imgRef = React.useRef();

  const [statusOptions, setStatusOptions] = React.useState(
    props.fish ?
    changedStatusOptions :
    initStatusOptions
  );
  const [status, setStatus] = React.useState(
    props.fish ?
    props.fish?.status :
    initStatusOptions[0]
  );
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

    handleChange(e);
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

  const fish = props.fish;
  const handleChange = (e) => {
    if (!fish) {
      return;
    }

    const propName = e.currentTarget.name;
    const propValue = e.currentTarget.value;
    props.updateFish(props.fishKey, propName, propValue);
  }

  return (
    <form className='fish-edit' onSubmit={addFish}>

      <fieldset disabled={props.fish}>
        <input ref={nameRef} type='text' placeholder='Name' defaultValue={props.fish?.name}/>
      </fieldset>

      <input name='price' ref={priceRef} type='text' placeholder='Price' defaultValue={props.fish?.price} onChange={handleChange} />
      {<select name='status' ref={statusRef} onChange={changeStatus} value={status}>
        {/*<option value='available'>Fresh</option>
        <option value='unavailable'>Sold Out</option>*/}
        {statusOptions.map((s, i) => (<option key={`status${i}`} value={s}>{s}</option>))}
      </select>}

      <fieldset disabled={props.fish}>
        {/*props.fish && <input type='text' defaultValue={props.fish?.status} />*/}
        <textarea ref={descRef} placeholder='Description' defaultValue={props.fish?.desc}></textarea>
        <input ref={imgRef} type='text' placeholder='Image' defaultValue={props.fish?.img}/>
        {!props.fish && <button>Add Fish</button>}
      </fieldset>

      {props.fish && <button type='button' onClick={() => props.removeFish(props.fishKey)}>Remove Fish</button>}
    </form>
  );
}

export default AddFish;