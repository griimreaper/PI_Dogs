import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Landing.css"

export default function Landing() {
    return (
        <div className='landingContainer'>
        <h1>Welcome to Dogs App</h1>
            <Link to="/home">
                <img src='https://www.pinclipart.com/picdir/big/18-184094_free-imagenes-de-huellas-perros-hanslodge-clip-pumpkifile:///C:/Users/Abby/Downloads/18-184094_free-imagenes-de-huellas-perros-hanslodge-clip-pumpkin.svgn.png' alt="huella"></img>
            </Link>
        </div>
    )
}
