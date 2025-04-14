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
    const [favorites, setFavorites] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [section, setSection] = useState('Favorites');
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Profile";

        if (!user) {
            navigate('/login');
            return;
        }

        axios.get('https://web215-react.onrender.com/users/' + user.username).then(res => {
            setFavorites(res.data.favorites);
            setReviews(res.data.reviews);
        })
        // const fetchFavorites = async () => {
        //     const promises = user.favorites.map(async (id) => {
        //         const options = {
        //             method: 'GET',
        //             url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        //             headers: { Authorization: `Bearer ${apiKey}` },
        //         };
        //         const res = await axios.request(options);
        //         return res.data;
        //     });

        //     const results = await Promise.all(promises);
        //     setFavoriteMovies(results);
        // };

        // if (section === 'Favorites') {
        //     fetchFavorites();
        // }

    }, []);
    
    
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
                            {favorites.map(movie => {
                                return (
                                    <li key={movie.movie}>
                                        <Movie movie_id={movie.movie} title={movie.title} poster_path={movie.poster_path} />
                                    </li>
                                )
                            })}
                        </ul> : 
                        <ul id='reviewList'>
                            {reviews.map((review, index) => {
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
