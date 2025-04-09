import React from 'react'
import noimg from '../images/noimg.png'
import { Link } from 'react-router-dom'
function Movie(props) {
    return (
        <Link to={'/movie/'+props.movie_id} state={{movie_id: props.movie_id, title: props.title, poster_path: props.poster_path, overview: props.overview, release_date: props.release_date}}>
            <figure className='movieFigure'>
                <figcaption>{props.title}</figcaption>
                <img onError={e => e.target.src = noimg} src={'https://www.themoviedb.org/t/p/w440_and_h660_face'+props.poster_path} alt={props.title} />
            </figure>
        </Link>
    )
}

export default Movie
