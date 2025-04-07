import React, {useEffect, useState} from 'react'
import anon from '../images/anonymous.png'
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
function Profile() {
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Profile";
    }, [])
    
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        navigate('/login');
        return null
    }
    function handleLogout() {
        localStorage.removeItem('user');
        navigate('/');
    }
    return (
        <>
        <Header/>
        <main>
            <h2>Profile</h2>
            <figure>
                <img src={user.picture || anon} alt="Profile" />
            </figure>
            <p>Welcome to your profile page, {user.username}!</p>
            <p>You can view your favorite movies and reviews here</p>
            
            <input type='submit' value='Logout' onClick={handleLogout}/>
        </main>
        <Footer />
        </>
    )
}

export default Profile
