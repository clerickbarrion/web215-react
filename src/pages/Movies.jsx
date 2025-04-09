import axios from 'axios'
import Header from '../components/header';
import Footer from '../components/footer';
import Movie from '../components/movie';
import Pagination from '../components/pagination';
import React, { useEffect, useState } from 'react';

function Movies() {
    const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5NmFhZmRiOGIwNWJkNGMwMzkyNDM3ZTEzNGJjNyIsInN1YiI6IjY1NzcyZWE1NTY0ZWM3MDBhY2Q0ZDFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fjvHhYWM0hzn830zTKHtyuru8HLOqQyuXlntPsVrUQw"
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`);
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Movies";
        handlePageChange(url + `&page=${page}`);
    }, [])
    
    function handlePageChange(newUrl) {
        const options = {
            "method": 'GET',
            "url": newUrl,
            "headers": { "Authorization": `Bearer ${apiKey}` },
        };
        axios.request(options).then(res => {
            if (res.status === 200) {
                setMovies(res.data.results);
            }
        }).catch(error => {
            console.error('Error fetching movies', error);
        });
    }
    return (
        <>
        <Header />
        <main>
            <h2>Movies</h2>
            <p>These are the movies that are trending today.</p>
            <p>Click on the movie title to see more information, add it to your favorites, or it's reviews.</p>
            <br/>
            <input className="search" onChange={e => {
                const searchTerm = e.target.value;
                const newUrl = searchTerm.length > 0
                    ? `https://api.themoviedb.org/3/search/movie?language=en-US&query=${searchTerm}`
                    : `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

                setUrl(newUrl);
                setPage(1);
                handlePageChange(newUrl + `&page=1`);
            }} type="text" placeholder="Search for a movie..."/>
            <Pagination page={page} setPage={setPage} url={url} handlePageChange={handlePageChange} />
            <ul id='movieList'>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Movie movie_id={movie.id} title={movie.title} poster_path={movie.poster_path} overview={movie.overview} release_date={movie.release_date} />
                    </li>
                ))}
            </ul>
            <Pagination page={page} setPage={setPage} url={url} handlePageChange={handlePageChange} />
        </main>
        <Footer />
        </>
    )
}

export default Movies
