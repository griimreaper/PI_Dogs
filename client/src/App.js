import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/jsx/Nav';
import Cards from './components/jsx/Cards';
import Landing from "./components/jsx/Landing";
import Detail from './components/jsx/Detail';
import Loader from './components/jsx/Loader';
import Form from './components/jsx/Form';
import Error from './components/jsx/Error';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addDogs, addTemperaments } from './redux/actions';
import axios from "axios";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => { //al iniciar la aplicacion cargamos en nuestra store los perros y los temperaments
    axios.get("https://pi-dogs-server.vercel.app/dogs")
      .then(({ data }) => {
        dispatch(addDogs(data))
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get("https://pi-dogs-server.vercel.app/temperaments")
      .then(({ data }) => {
        dispatch(addTemperaments(data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => { // establecemos el temporizador que establecerá el estado de carga en falso después de determinado tiempo
      setIsLoading(false);
    }, 3000);
  }


  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path="/" element={<Landing handleButtonClick={handleButtonClick} />} />
        <Route path="/home" element={isLoading ? <Loader /> : <Cards handleButtonClick={handleButtonClick} />} />
        <Route path="/detail/:id" element={isLoading? <Loader /> : <Detail />} />
        <Route path="/create" element={<Form handleButtonClick={handleButtonClick} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
