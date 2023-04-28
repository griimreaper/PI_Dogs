import React, { useEffect, useState } from 'react'
import "../css/Nav.css"
import { Link, useLocation } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { resetDogs } from '../../redux/actions'
import Filter from './Filter'

export default function Nav({ onSearch }) {
    const dispatch = useDispatch()
    const location = useLocation()
    const [showFilters, setShowFilters] = useState(false)

    function handlerButtonFilter() {
        showFilters ? setShowFilters(false) : setShowFilters(true)
    }

    useEffect(() => {
        setShowFilters(false);
    }, [location.pathname]);
    
    return (
        <div className="navContainer">
            <Link to="/create">
                <button>Create</button>
            </Link>
            <Link to="/home">
                <button onClick={location.pathname === "/home" ? dispatch(resetDogs) : null}>Home</button>
            </Link>
            <Link>
                {location.pathname === "/home" && <button onClick={handlerButtonFilter}>Filter</button>}
                {showFilters && location.pathname === "/home" ? <Filter handlerButtonFilter={handlerButtonFilter}></Filter> : null}
            </Link>
            <Searchbar onSearch={onSearch}></Searchbar>
        </div>
    )
}
