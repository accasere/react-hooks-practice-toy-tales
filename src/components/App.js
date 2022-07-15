import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys,setToys]=useState([])

  let toyToDisplay = [...toys]

  useEffect(() =>{
    fetch('http://localhost:3001/toys')
    .then(response => response.json())
    .then(data =>{
      setToys(data)
    })
  }, []);
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addNewToy(newToy) {
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(r => r.json())
    .then(data => {
      setToys([...toys, data])
    })
  }

  function handleDelete(toy){
    fetch('http://localhost:3001/toys/${toy.id}',{
      method: 'DELETE'
    })
    .then (r => r.json())
    .then (data => {
      toyToDisplay = toyToDisplay.filter(toyInArray => toyInArray.id !== toy.id)
      setToys(toyToDisplay)
    })
  }

  function handleLike(toy) {
    fetch('http://localhost:3001/toys', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...toy, likes: ++toy.likes})
    })
    .then(r => r.json())
    .then(data => {
      toyToDisplay = toyToDisplay.map(toyInArray =>{
        if (toyInArray.id !== toy.id) {
          return toyInArray;
        }
        if (toyInArray.id === toy.id) {
          return data;
        }
        return toyToDisplay
      })
      setToys(toyToDisplay);
    })
  }
  

  return (
    <>
      <Header />
      {showForm ? <ToyForm addNewToy={addNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={handleDelete} handleLike={handleLike}/>
    </>
  );
}

export default App;
