import React, {useState, useEffect} from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import anon from '../images/anonymous.png'
import Movie from '../components/movie'
import Review from '../components/review'
import { Link } from 'react-router-dom'

function OneUser() {
    const { username } = useParams()
    const [favorites, setFavorites] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [section, setSection] = useState('Favorites');
    const [user, setUser] = useState({});

    useEffect(() => {
        document.title = username
        axios.get('https://web215-react.onrender.com/users/' + username).then(res => {
            setFavorites(res.data.favorites);
            setReviews(res.data.reviews);
            setUser(res.data);
        })
    }, [])

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
                {user.username}
            </figure>
            <aside>
                <h1>Welcome to {user.username}'s profile page!</h1>
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
                                        <Review title={review.title} movie={review.movie} username={user.username} comment={review.comment} picture={'https://www.themoviedb.org/t/p/w440_and_h660_face'+review.poster_path} date={review.date} />
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

export default OneUser
