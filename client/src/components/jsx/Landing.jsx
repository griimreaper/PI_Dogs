import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Landing.css"

export default function Landing() {
    return (
        <div class='landingContainer'>
            <h1>An app dedicated to that great companion who makes us happy every day</h1>
            <h2>The best friend of the human</h2>
            <Link to="/home">
                <img src='https://www.pinclipart.com/picdir/big/18-184094_free-imagenes-de-huellas-perros-hanslodge-clip-pumpkifile:///C:/Users/Abby/Downloads/18-184094_free-imagenes-de-huellas-perros-hanslodge-clip-pumpkin.svgn.png' alt="huella"></img>
            </Link>
            <footer>
            <h3>
            Hi, I'm Leonel Behnke, a student of Henry's, and this is my individual project.</h3>
            <span>I hope you enjoy it, as I enjoyed creating it</span>
                <div class="footer-bottom">
                    <p>copyright &copy;2021 <a href="https://www.linkedin.com/in/leonelbehnkedev/">Leonel Behnke</a></p>
                    <p><a href="https://www.linkedin.com/in/leonelbehnkedev/">Linkedin</a></p>
                    <p><a href="https://twitter.com/66grim6reaper66">Twitter</a></p>
                    <p><a href="https://github.com/griimreaper">GitHub</a></p>
                </div>
            </footer>
        </div>
    )
}
