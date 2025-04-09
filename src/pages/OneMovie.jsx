import React, {use, useState} from 'react'
import { useLocation } from 'react-router-dom'
import ReviewSection from '../components/reviewSection';

function OneMovie() {
    const location = useLocation();
    const props = location.state;
    const [section,setSection] = useState('Overview');

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
        <main id='oneMovie'>
            <figure>
                <img src={`${'https://www.themoviedb.org/t/p/w440_and_h660_face'+props.poster_path}`} alt={props.title}/>
            </figure>
            <aside>
                <h1>{props.title}</h1>
                <small>Release Date: {props.release_date}</small>
                <button>Add to Favorites</button>
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