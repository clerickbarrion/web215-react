import React, {useState, useEffect} from 'react'
import axios from 'axios';
import ReviewSection from '../components/reviewSection';
import Header from '../components/header';
import Footer from '../components/footer';
import { useParams } from 'react-router-dom';
function OneMovie() {
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5NmFhZmRiOGIwNWJkNGMwMzkyNDM3ZTEzNGJjNyIsInN1YiI6IjY1NzcyZWE1NTY0ZWM3MDBhY2Q0ZDFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fjvHhYWM0hzn830zTKHtyuru8HLOqQyuXlntPsVrUQw"
    const movie_id = useParams().id
    const [section,setSection] = useState('Overview');
    const [props, setProps] = useState({
        title: '',
        poster_path: '',
        release_date: '',
        overview: '',
        movie_id: ''
    })
    const [favorite, setFavorite] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        document.title = props.title
        const options = {
            "method": 'GET',
            "url": 'https://api.themoviedb.org/3/movie/' + movie_id + '?language=en-US',
            "headers": { "Authorization": `Bearer ${apiKey}` },
        }
        axios.request(options).then(res => {
            if (res.status === 200) {
                setProps({
                    title: res.data.title,
                    poster_path: res.data.poster_path,
                    release_date: res.data.release_date,
                    overview: res.data.overview,
                    movie_id: movie_id
                })
            }
        })
        if (user !== null) {
            axios.get('https://web215-react.onrender.com/users/' + user.username).then(res => {
                setFavorite(res.data.favorites.some(fav => fav.movie === movie_id))
            })
        }        
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

    function handleFavorite(e) {
        e.preventDefault()
        if (e.target.innerText.includes('Add')) {
            axios.post('https://web215-react.onrender.com/favorites', {
                username: user.username,
                movie_id: movie_id,
                title: props.title,
                poster_path: props.poster_path
            })
            setFavorite(true)
        } else if (e.target.innerText.includes('Remove')) {
            axios.delete('https://web215-react.onrender.com/favorites', {
                data: {
                username: user.username,
                movie_id: movie_id
                }
            })
            setFavorite(false)
        }
    }
    return (
        <>
        <Header/>
        <main className='asideFrame'>
            <figure>
                <img src={`${'https://www.themoviedb.org/t/p/w440_and_h660_face'+props.poster_path}`} alt={props.title}/>
            </figure>
            <aside>
                <h1>{props.title}</h1>
                <small>Release Date: {props.release_date}</small>
                {
                    user == null ? 
                    <p>Log in to add to your favorites</p> : 
                    <button onClick={handleFavorite}>{favorite ? "Remove from" : "Add to"} Favorites</button>
                }
                
                <div>
                    <button className='active' onClick={activate}>Overview</button>
                    <button onClick={activate}>Reviews</button>
                </div>
                <section>
                    {
                    section === 'Overview' ? <p>{props.overview}</p> : <ReviewSection movie_id={props.movie_id} title={props.title} poster_path={props.poster_path}/>
                }
                </section>
            </aside>
        </main>
        <Footer/>
        </>
    )
}


export default OneMovie