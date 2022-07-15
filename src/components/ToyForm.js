import React, { useState } from "react";

function ToyForm({addNewToy}) {
  const [newToy, setNewToy] = useState({
    name:'',
    image: '',
    likes: 0
  })

  function handleChange(event){
    setNewToy({...newToy, [event.target.name]: event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault()
    addNewToy(newToy)
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChange}
          value={newToy.name}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChange}
          value={newToy.image}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
