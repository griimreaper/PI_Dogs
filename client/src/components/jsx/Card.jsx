import React from 'react'

export default function Card(props) {

    const { name, image, height, weight, age } = props
    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt={name} />
            <h2>{height}</h2>
            <h2>{weight}</h2>
            <h2>{age}</h2>
        </div>
    )
}
