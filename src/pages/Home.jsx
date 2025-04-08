import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
function Home() {
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Home";
    }, [])
    return (
        <>
        <Header />
        <main>
            <h2>Home</h2>
            <p>
                Welcome to the home page of Crazy Bat!
                Here, you can find, review and favorite movies that are trending today.
                Whether you're hunting for a new movie to watch or just want to see what's popular, this is the place to be.
                <Link to="/introduction"> Learn more about me here</Link>.
            </p>
            <br/>
            <p>
                Using the TMDB API, Crazy Bat allows you to search for any movie by title and instantly see relevant results. 
                Dive into movie details, view trending titles, and find your next favorite watch. 
                Each movie has its own page where you can read reviews and see what others think.
            </p>
            <br/>
            <p>
                After signing up and logging in, users can start building their personal movie collection. 
                Add or remove movies from your favorites, and write reviews to share your opinions. 
                You can also edit or delete your own reviews at any time. 
                Reviews from other users help bring more insight to every film.
            </p>
            <br />
            <p>
                The Users page showcases everyone who's joined Crazy Bat. 
                Click on any user to explore their profile, see what movies they've favorited, and read the reviews they've written. 
                It's a great way to discover films you might've missed and connect with like-minded movie fans.
            </p>
        </main>
        <Footer />
        </>
    )
}

export default Home
