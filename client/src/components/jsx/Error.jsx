import React from 'react'
import "../css/Error.css"

export default function Error() {
    return (
        <div className='errorContainer'>
            <div className='displayError'>
                <h1>Error 404</h1>
                <h2>
                    The connection to the server has failed or a non-existent route has been entered</h2>
            </div>
            <img src='https://st.depositphotos.com/1229718/4152/i/600/depositphotos_41528755-stock-photo-lost-pet.jpg' alt="dogcriying"></img>
        </div>
    )
}
