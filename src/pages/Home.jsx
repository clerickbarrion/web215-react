import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
function Home() {
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Home";
    }, [])
    return (
        <main>
            <h2>Home</h2>
            <p>
                Welcome to the home page of WEB215 course.
                Here is where I'll demonstrate things with JavaScript. 
                There will be more to come. 
                I hope you enjoy your visit.
                <Link to="/introduction"> Learn more about me here</Link>.
            </p>
        </main>
    )
}

export default Home
