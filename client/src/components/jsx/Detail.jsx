import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import "../css/Detail.css"
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
        <div class="dog-detail">
            <div class="dog-header">
                <h1 href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" type="text/css">{name}</h1>
            </div>
            <div class="dog-content">
                <img src={image} alt={name} />
                <div class="dog-details">
                    <h2>#{dog.id}</h2>
                    <h2>height: {height}</h2>
                    <h2>weight: {weight}</h2>
                    {temperament && <p>Temperaments:</p>}
                    {temperament && temperament.map((t) => {
                        return (<li>{t}</li>)
                    })}
                </div>
            </div>
        </div>
    )
}
