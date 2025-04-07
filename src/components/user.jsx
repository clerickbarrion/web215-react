import React from 'react'
import anon from '../images/anonymous.png'

function User(props) {
    return (
        <figure className='userFigure'>
            <img src={props.picture || anon } alt="Profile" />
            <figcaption>
                <h3>{props.username}</h3>
            </figcaption>
        </figure>
    )
}

export default User
