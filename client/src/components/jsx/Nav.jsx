import React from 'react'
import "../css/Nav.css"
import { Link, useLocation } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'

import { resetDogs } from '../../redux/actions'

export default function Nav({ onSearch }) {
    const dispatch = useDispatch()
    const location = useLocation()

    return (
        <div className="navContainer">
            <Link to="/create">
                <button>Create</button>
            </Link>
            <Link to="/home">
                <button onClick={location.pathname === "/home" ? dispatch(resetDogs) : null}>Home</button>
            </Link>
            <Searchbar onSearch={onSearch}></Searchbar>
        </div>
    )
}
