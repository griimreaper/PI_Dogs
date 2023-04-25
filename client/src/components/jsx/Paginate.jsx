import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextPage, prevPage } from '../../redux/actions'

export default function Paginate({cantPages}) {
    const { numPage } = useSelector((state) => state)
    const dispatch = useDispatch()
    function next() {
        dispatch(nextPage())
    }
    function prev() {
        dispatch(prevPage())
    }

    return (
        <div className='Page'>
            {numPage > 1 ? <button onClick={prev}>PREV</button> : null}
            {numPage > 1 ? <p>{numPage - 1}</p> : null}
            <h3>{numPage}</h3>
            {numPage < cantPages? <p>{numPage + 1}</p> : null}
            {numPage < cantPages? <button onClick={next}>NEXT</button> : null}
        </div>
    )
}
