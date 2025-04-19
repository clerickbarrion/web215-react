import React, {useState} from 'react'
import anon from '../images/anonymous.png'
import noimg from '../images/noimg.png'
import EditModal from './editModal'
import DeleteModal from './deleteModal'
import { Link } from 'react-router-dom'
function Review(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const username = user ? user.username : null
    const [comment, setComment] = useState(props.comment)
    const [edit, setEdit] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    if (deleted) return null

    function convertDate(date) {
        date = new Date(Number(date))
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    return (
        <div className='review'>
            <img onError={e => e.target.src = noimg} src={props.picture ? props.picture : anon} alt={props.username} />
            <div>
                <div className='top'>
                    <p>{props.username}</p>
                    <p>{convertDate(props.date)}</p>
                    {username === props.username ? 
                    (
                        <div className='reviewButtons'>
                            <button onClick={() => setEdit(!edit)}>Edit</button>
                            <button onClick={() => {setDeleteModal(!deleteModal)}}>Delete</button>
                        </div>
                    )
                    : null }
                </div>
                <p>{comment}</p>
            </div>
            <EditModal username={props.username} comment={comment} date={props.date} setComment={setComment} setEdit={setEdit} edit={edit} />
            <DeleteModal username={props.username} date={props.date} setDeleted={setDeleted} deleted={deleted} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
        </div>
    )
}

export default Review
