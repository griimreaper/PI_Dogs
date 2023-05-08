import React from 'react'
import "../css/Loader.css"

export default function Loader() {
    return (
        <div className='backgroundLoading'>
            <div className='loadingContainer'>
                <h1 class="loader">Loading</h1>
                <div className='gifContainer'>
                    <img src='https://media.tenor.com/YdsMwdIApe4AAAAC/running-dog.gif' alt="Loading..."></img>
                </div>
                <div className='footerLoading'>
                <h1> </h1>
                </div>
            </div>
        </div>
    )
}
