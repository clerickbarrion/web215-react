import React, {useEffect, useState} from 'react'
import anon from '../images/anonymous.png'
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import axios from 'axios';
import Movie from '../components/movie';
import Review from '../components/review';
import { Link } from 'react-router-dom';
function Profile() {
    const user = JSON.parse(localStorage.getItem('user'))
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5NmFhZmRiOGIwNWJkNGMwMzkyNDM3ZTEzNGJjNyIsInN1YiI6IjY1NzcyZWE1NTY0ZWM3MDBhY2Q0ZDFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fjvHhYWM0hzn830zTKHtyuru8HLOqQyuXlntPsVrUQw"
    const [section,setSection] = useState('Favorites');
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Profile";

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchFavorites = async () => {
            const promises = user.favorites.map(async (id) => {
                const options = {
                    method: 'GET',
                    url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                    headers: { Authorization: `Bearer ${apiKey}` },
                };
                const res = await axios.request(options);
                return res.data;
            });

            const results = await Promise.all(promises);
            setFavoriteMovies(results);
        };

        if (section === 'Favorites') {
            fetchFavorites();
        }

    }, [section]);
    

    if (!user) {
        navigate('/login');
        return null
    }
    function handleLogout() {
        localStorage.removeItem('user');
        navigate('/');
    }

    function activate(e) {
        const sibling = e.target.nextElementSibling || e.target.previousElementSibling
        if (e.target.classList.contains('active')) {
            return
        }
        e.target.classList.toggle('active')
        sibling.classList.toggle('active')
        setSection(e.target.innerText)
    }

    return (
        <>
        <Header/>
        <main className="asideFrame">
            <figure>
                <img src={user.picture || anon} alt="Profile" />
                <input type='submit' value='Logout' onClick={handleLogout}/>
            </figure>
            <aside>
                <h1>Welcome to your profile page, {user.username}!</h1>

                <div>
                    <button className='active' onClick={activate}>Favorites</button>
                    <button onClick={activate}>Reviews</button>
                </div>
                <section>
                    {section === 'Favorites' ? 
                        <ul id='movieList'>
                            {favoriteMovies.map(movie => {
                                return (
                                    <li key={movie.id}>
                                        <Movie movie_id={movie.id} title={movie.title} poster_path={movie.poster_path} overview={movie.overview} release_date={movie.release_date} />
                                    </li>
                                )
                            })}
                        </ul> : 
                        <ul id='reviewList'>
                            {user.reviews.map((review, index) => {
                                return (
                                    <Link to={'/movie/'+review.movie} key={index}>
                                        <li key={index}>
                                            <Review username={review.title} comment={review.comment} picture={user.picture} />
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    }
                </section>
            </aside>
        </main>
        <Footer />
        </>
    )
}

export default Profile
