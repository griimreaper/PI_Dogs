import React from 'react'
import "../css/Card.css"
import { Link } from 'react-router-dom'

export default function Card(props) {

    const { id, name, image, temperaments, weight } = props
    return (
        <div className="cardContainer">
            <Link className='link' to={`/detail/${id}`}>
                <img src={image} alt={name} />
                <h2>{name}</h2>
                <p>W: {weight}</p>
                {temperaments && temperaments.map(t => (<li>{t}</li>))}
            </Link>
        </div>
    )
}
