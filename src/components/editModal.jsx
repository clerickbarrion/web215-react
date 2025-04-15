import React, { useEffect, useState } from 'react'
import axios from 'axios'

function EditModal(props) {
    const [newComment, setNewComment] = useState(props.comment)
    if (!props.edit) return null
    function handleSave(e) {
        e.preventDefault()
        props.setComment(e.target.edit.value)
        axios.put('https://web215-react.onrender.com/review', {
            username: props.username,
            comment: e.target.edit.value,
            date: props.date,
        })
        props.setEdit(false)
    }
    return (
        <div className='modalContainer'>
            <form className='modal' onSubmit={handleSave}>
                <h2>Edit your review</h2>
                <textarea id='edit' onChange={e => setNewComment(e.target.value)} value={newComment}></textarea>
                <div className='modalButtons'>
                    <button onClick={() => {
                        setNewComment(props.comment)
                        props.setEdit(false)
                        }}>Cancel</button>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditModal
