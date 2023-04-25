import React from 'react'
import Card from './Card'

export default function Cards({ dogs }) {
    return (
        <div>
            {dogs.map((d) => {
                const { id, name, age, height, weight, image } = d
                return (<Card key={id}
                    name={name}
                    age={age}
                    height={height}
                    weight={weight}
                    image={image}
                />)
            })}
        </div>
    )
}
