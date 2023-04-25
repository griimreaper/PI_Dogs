import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './components/jsx/Nav';
import Cards from './components/jsx/Cards';
import Landing from "./components/jsx/Landing";
import Detail from './components/jsx/Detail';
import Form from './components/jsx/Form';
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

  
  async function onSearch(name) {
    try {
        const { data } = await axios.get(`http://localhost:3001/dogsname?name=${name}`)
        setDogs([data])
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav onSearch={onSearch}/>}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Cards dogs={dogs}/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/create" element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
