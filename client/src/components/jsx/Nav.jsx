import React from 'react'
import Style from "../css/Nav.css"
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div className={Style.container}>
        <Link to="/create">
        <button>create</button>
        </Link>
            <input></input>
            <button>Search</button>
            
        </div>
    )
}
