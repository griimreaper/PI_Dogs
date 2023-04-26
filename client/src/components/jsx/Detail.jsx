import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
    const [dog, setDog] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(({ data }) => {
                setDog(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const { name, image, weight, height, temperament } = dog
    return (
        <div>
            <h1>{dog.id}{name}</h1>
            <img src={image} alt={name} />
            <h2>height: {height}</h2>
            <h2>weight: {weight}</h2>
            {temperament && <h3>Temperaments:</h3>}
            {temperament && temperament.map((t) => {
                return (<li>{t}</li>)
            })}
        </div>
    )
}
