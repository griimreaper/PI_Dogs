import React, { useEffect, useState } from 'react'
import "../css/Nav.css"
import { Link, useLocation } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { handleNumber } from '../../redux/actions'
import Filter from './Filter'

export default function Nav() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [showFilters, setShowFilters] = useState(false)

    function handlerButtonFilter() { // manejamos el boton filter para que se muestre cuando se presione el boton
        showFilters ? setShowFilters(false) : setShowFilters(true)
    }
    function handlerButtonHome() { // manejamos el boton home para que al presionarlo nos devuelva a la pagina 1
        if (location.pathname === "/home")
            dispatch(handleNumber(1))
    }
    useEffect(() => {
        setShowFilters(false); //ocultamos los filtros si vamos a otra ruta
    }, [location.pathname]);

    return (
        <div className="navContainer">
            <Link to="/create">
                <button>Create</button>
            </Link>
            <Link to="/home">
                <button onClick={handlerButtonHome}>Home</button>
            </Link>
            <Link>
                {location.pathname === "/home" && <button onClick={handlerButtonFilter}>Filter</button>}
                {showFilters && location.pathname === "/home" ? <Filter handlerButtonFilter={handlerButtonFilter}></Filter> : null}
            </Link>
            <Searchbar></Searchbar>
        </div>
    )
}
