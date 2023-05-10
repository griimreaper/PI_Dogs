import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../css/Nav.css"
import { orderAlphabethycally, orderWeight, filterCreated, resetDogs, filterTemperament, handleNumber, filterBreed } from "../../redux/actions";

export default function Filter({ handlerButtonFilter }) {
    const [visible, setVisible] = useState(false);
    const { dogsOrigin, temperaments } = useSelector((state) => state)
    const dispatch = useDispatch()
    const styles = {
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.5s ease',
    };

    useEffect(() => {
        setVisible(true)
    }, [])


    function handlerButtonHide() {
        setVisible(false)
        setTimeout(() => {
            handlerButtonFilter() // ocultamos el filtro luego de un tiempo para que de lugar a la transicion
        }, 500);
    }

    function alphabethycally(e) {
        dispatch(orderAlphabethycally(e.target.value))
        dispatch(handleNumber(1))
    }

    function weight(e) {
        dispatch(orderWeight(e.target.value))
        dispatch(handleNumber(1))
    }

    function created(e) {
        dispatch(filterCreated(e.target.value))
        dispatch(handleNumber(1))
    }
    function reset() {
        dispatch(resetDogs())
        dispatch(handleNumber(1))
    }
    function temperament(e) {
        dispatch(filterTemperament(e.target.value))
        dispatch(handleNumber(1))
    }
    function breed(e) {
        dispatch(filterBreed(e.target.value))
        dispatch(handleNumber(1))
    }

    const breeds = Array.from(new Set(dogsOrigin.map((d) => d.breedgroup)))
    console.log(breeds)
    return (
        <div style={styles} className='filterComp'>
            <button onClick={reset}>Reset</button>
            <select onChange={alphabethycally} name="Alphabethycally" defaultValue="DEFAULT">
                <option value="DEFAULT" disable="true">Alphabethycally</option>
                <option value="Asc">A - Z</option>
                <option value="Desc">Z - A</option>
            </select>
            <select onChange={weight} name="Weight" defaultValue="DEFAULT">
                <option value="DEFAULT" disable="true">Weight</option>
                <option value="Asc">Ascending</option>
                <option value="Desc">Descending</option>
            </select>
            <select onChange={created} name="filterCreated" defaultValue="DEFAULT">
                <option value="DEFAULT">Filter for</option>
                <option value="Breed">Breeds</option>
                <option value="Created">Created</option>
            </select>
            <select onChange={breed} name="filterBreed" defaultValue="DEFAULT">
                <option value="DEFAULT">Breed</option>
                {breeds.map((b, i) => b ? <option key={i} value={b}>{b}</option> : null)}
            </select>
            <select onChange={temperament} name="filterTemperament" defaultValue="DEFAULT">
                <option value="DEFAULT">Temperament</option>
                {temperaments.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
            <button onClick={handlerButtonHide}>Hide</button>
        </div>
    )
}
