import React from 'react'
import Card from './Card'
import "../css/Cards.css"
import Paginate from './Paginate'
import { useSelector } from 'react-redux'

export default function Cards({ dogs }) {

    return (
        <div className='cardGrid'>
            {dogs.map((d) => {
                const { id, name, age, height, weight, image, temperaments } = d
                return (<Card key={id}
                    id={id}
                    name={name}
                    age={age}
                    temperaments={temperaments}
                    height={height}
                    weight={weight}
                    image={image}
                />)
            })}

        </div>
    )
}
