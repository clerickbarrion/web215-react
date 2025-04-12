import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Review from '../components/review';


function ReviewSection(props) {
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(null);
    const _user = localStorage.getItem('user');
    useEffect(() => {
        if (_user !== null) {
            setUser(JSON.parse(_user));
        }
        axios.get('https://web215-react.onrender.com/review/' + props.movie_id).then(res => {
            setReviews(res.data);
        }).catch((error) => {
            setReviews([]);
        });
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.review.value === '') {
            return
        }
        const review = {
            movie: String(props.movie_id),
            username: user.username,
            comment: e.target.review.value,
            picture: user.picture,
            title: props.title,
        }
        axios.post('https://web215-react.onrender.com/review', review).then(res => {
            setReviews([...reviews, review]);
            localStorage.setItem('user', JSON.stringify({
                ...user,
                reviews: [...user.reviews, { movie: String(props.movie_id), comment: e.target.review.value, title: props.title }]
            }))
        }).catch((error) => {
            console.error(error);
        });
        e.target.review.value = '';
    }

    return (
        <>
        {
            user != null ? 
            <form onSubmit={handleSubmit}>
                <label htmlFor='review'>Write a review</label>
                <textarea id='review' placeholder='Write your review here...' />
                <button type='submit'>Submit</button>
            </form> :
            <p>You need to be logged in to write a review.</p>
        }
        
        <ul id='reviewList'>
            {reviews.map(review => {
                return (
                    <li key={review.movie}>
                        <Review username={review.username} comment={review.comment} picture={review.picture} />
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default ReviewSection
