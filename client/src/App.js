import './App.css';
import React, { useEffect } from 'react';
import Nav from './components/jsx/Nav';
import Cards from './components/jsx/Cards';
import Landing from "./components/jsx/Landing";
import Detail from './components/jsx/Detail';
import Form from './components/jsx/Form';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addDogs, addTemperaments } from './redux/actions';
import axios from "axios";

function App() {

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get("http://localhost:3001/dogs")
      .then(({ data }) => {
        dispatch(addDogs(data))
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get("http://localhost:3001/temperaments")
      .then(({ data }) => {
        dispatch(addTemperaments(data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])


  async function onSearch(name) {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogsname?name=${name}`)
      dispatch(addDogs(data))
    } catch ({ response }) {
      alert(response.data.error)
    }
  }

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Cards />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
