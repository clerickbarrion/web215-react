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

        if (user === null) {
            navigate('/login');
            return;
        }

        axios.get('https://web215-react.onrender.com/users/' + user.username).then(res => {
            setFavorites(res.data.favorites);
            setReviews(res.data.reviews);
        })
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
                <img src={user?.picture || anon} alt="Profile" />
                <input type='submit' value='Logout' onClick={handleLogout}/>
            </figure>
            <aside>
                <h1>Welcome to your profile page, {user?.username}!</h1>

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
                                    <li key={index}>
                                        <Review username={<Link to={'/movie/'+review.movie}>{review.title}</Link>} comment={review.comment} picture={'https://www.themoviedb.org/t/p/w440_and_h660_face'+review.poster_path} date={review.date} />
                                    </li>
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
