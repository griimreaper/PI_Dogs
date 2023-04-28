import React from 'react'
import Card from './Card'
import "../css/Cards.css"
import { useSelector, useDispatch } from 'react-redux'
import { nextPage, prevPage } from '../../redux/actions'


export default function Cards() {
    const { numPage, dogs } = useSelector((state) => state)
    const dispatch = useDispatch()

    let desde = (numPage - 1) * 8
    let hasta = numPage * 8

    let cantPages = Math.round(dogs.length / 8)
    let viewDogs = dogs.slice(desde, hasta)

    function next() {
        dispatch(nextPage())
    }
    function prev() {
        dispatch(prevPage())
    }

    return (
        <div className='homeContainer'>
            <svg className={numPage > 1 ? 'buttonEnabled' : "buttonDisabled"} onClick={numPage > 1 ? prev : null} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" stroke-width="2.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
            </svg>
            <div className='cardGrid'>
                {viewDogs.map((d) => {
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
            <svg className={numPage < cantPages ? 'buttonEnabled' : "buttonDisabled"} onClick={numPage < cantPages ? next : null} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" stroke-width="2.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="9 6 15 12 9 18" />
            </svg>
        </div>
    )
}