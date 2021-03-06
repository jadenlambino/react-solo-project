import React from "react";
import { NavLink, useHistory } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
    const history = useHistory()

    return (
        <div className="landing-container">
            <div className="banner">
                <h1 class='big'>LARGE</h1>
                <h2 class='small'>Awaken your inner detective.</h2>
                <NavLink to='/signup' className='start'>Start Searching</NavLink>
            </div>
        </div>
    )
}
