import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './components/jsx/Nav';
import Cards from './components/jsx/Cards';
import Landing from "./components/jsx/Landing";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [dogs, setDogs] = useState([])
  const location = useLocation()

  useEffect(() => {
    axios.get("http://localhost:3001/dogs")
      .then(({ data }) => {
        setDogs([...data])
      })
      .catch((error) => { 
        console.log(error)
      })
  }, [])

  console.log(dogs)
  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Cards dogs={dogs}/>} />
      </Routes>
    </div>
  );
}

export default App;
