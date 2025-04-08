import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header class="padding">
            <h1 id="header-h1">Clerick Barrion's Crazy Bat | WEB215</h1>
            <small><i></i></small>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/introduction">Introduction</Link></li>
                    <li><Link to="/contract">Contract</Link></li>
                    <li><a href="https://mern-tutorial-7srg.onrender.com/">MERN Tutorial</a></li>
                    <li><Link to="/movies">Movies</Link></li>
                    <li><Link to="/users">Users</Link></li>
                    {localStorage.getItem('user') === null ? 
                    <li><Link to="/login">Login/Signup</Link></li> 
                    : 
                    <li><Link to="/profile">Profile</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header
