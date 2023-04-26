import React from 'react'
import "../css/Nav.css"
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'
import { resetDogs } from '../../redux/actions'

export default function Nav({ onSearch }) {
    const dispatch = useDispatch()
    return (
        <div className="navContainer">
            <Link to="/create">
                <button>Create</button>
            </Link>
            <Link to="/home">
                <button onClick={dispatch(resetDogs)}>Home</button>
            </Link>
            <Searchbar onSearch={onSearch}></Searchbar>
        </div>
    )
}
