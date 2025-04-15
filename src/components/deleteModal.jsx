import React from 'react'
import axios from 'axios'

function DeleteModal(props) {
    if (props.deleted || !props.deleteModal) return null
    function handleDelete() {
        const username = JSON.parse(localStorage.getItem('user')).username
        axios.delete('https://web215-react.onrender.com/review/', {
            data: {
                username,
                date: props.date
            }}
        )
        props.setDeleted(!props.deleted)
        props.setDeleteModal(!props.deleteModal)
    }
    return (
        <div className='modalContainer'>
            <div className='modal'>
                <h2>Are you sure you want to delete your review?</h2>
                <div className='modalButtons'>
                    <button onClick={() => {props.setDeleteModal(!props.deleteModal)}}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
