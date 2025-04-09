import React from 'react'
import anon from '../images/anonymous.png'
function Review(props) {
    return (
        <div className='review'>
            <img src={props.picture ? props.picture : anon} alt={props.username} />
            <div>
                <p>{props.username}</p>
                <p>{props.comment}</p>
            </div>
        </div>
    )
}

export default Review
