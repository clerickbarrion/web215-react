import React, {useState, useEffect} from 'react'
import axios from 'axios';
import ReviewSection from '../components/reviewSection';

function OneMovie() {
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5NmFhZmRiOGIwNWJkNGMwMzkyNDM3ZTEzNGJjNyIsInN1YiI6IjY1NzcyZWE1NTY0ZWM3MDBhY2Q0ZDFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fjvHhYWM0hzn830zTKHtyuru8HLOqQyuXlntPsVrUQw"
    const movie_id = window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
    const [section,setSection] = useState('Overview');
    const [props, setProps] = useState({
        title: '',
        poster_path: '',
        release_date: '',
        overview: '',
        movie_id: ''
    })
    const [favorite, setFavorite] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        if (user !== null) setFavorite(user.favorites.includes(props.movie_id))
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
                    movie_id: String(res.data.id)
                })
            }
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

    function handleFavorite(e) {
        e.preventDefault()
        if (e.target.innerText.includes('Add')) {
            axios.post('https://web215-react.onrender.com/favorites', {
                username: user.username,
                movie_id: props.movie_id
            })
            setFavorite(true)
            setUser({
                ...user,
                favorites: [...user.favorites, props.movie_id]
            })
            localStorage.setItem('user', JSON.stringify({
                ...user,
                favorites: [...user.favorites, props.movie_id]
            }))
        } else if (e.target.innerText.includes('Remove')) {
            console.log(user.username)
            axios.delete('https://web215-react.onrender.com/favorites', {
                username: user.username,
                movie_id: props.movie_id
            })
            setFavorite(false)
            setUser({
                ...user,
                favorites: user.favorites.filter(fav => fav !== props.movie_id)
            })
            localStorage.setItem('user', JSON.stringify({
                ...user,
                favorites: user.favorites.filter(fav => fav !== props.movie_id)
            }))
        }
    }
    return (
        <main id='oneMovie'>
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
                    section === 'Overview' ? <p>{props.overview}</p> : <ReviewSection movie_id={props.movie_id}/>
                }
                </section>
            </aside>
        </main>
    )
}


export default OneMovie