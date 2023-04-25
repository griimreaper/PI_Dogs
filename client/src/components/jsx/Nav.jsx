import React from 'react'
import "../css/Nav.css"
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'

export default function Nav({ onSearch }) {
    return (
        <div className="navContainer">
            <Link to="/create">
                <button>create</button>
            </Link>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Searchbar onSearch={onSearch}></Searchbar>
        </div>
    )
}
