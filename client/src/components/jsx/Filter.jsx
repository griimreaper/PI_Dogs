import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import "../css/Nav.css"
import { orderAlphabethycally, orderWeight, filterCreated, resetDogs } from "../../redux/actions";

export default function Filter({ handlerButtonFilter }) {
    const [visible, setVisible] = useState(false);
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
            handlerButtonFilter()
        }, 500);
    }
    
    function alphabethycally(e){
        dispatch(orderAlphabethycally(e.target.value))
    }

    function weight(e){
        dispatch(orderWeight(e.target.value))
    }

    function created(e){
        dispatch(filterCreated(e.target.value))
    }
    function reset(){
        dispatch(resetDogs())
    }

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
            <button onClick={handlerButtonHide}>Hide</button>
        </div>
    )
}