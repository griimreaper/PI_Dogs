import React from 'react'
import "../css/Card.css"
import { Link } from 'react-router-dom'

export default function Card(props) {

    const { id, name, image } = props
    return (
        <div className="cardContainer">
        <Link to={`/detail/${id}`}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        </Link>
        </div>
    )
}
