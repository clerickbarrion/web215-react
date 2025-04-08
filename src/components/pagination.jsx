import React from 'react'

function Pagination(props) {
    return (
        <div className='pagination'>
            <div>
                <p>Page {props.page - 1}</p>
                <button onClick={() => {
                    props.setPage(props.page - 1)
                    props.handlePageChange(props.url + `&page=${props.page - 1}`)
                }} disabled={props.page === 1}>Previous</button>
            </div>
            <div>
                <p>Page {props.page + 1}</p>
                <button onClick={() => {
                    props.setPage(props.page + 1)
                    props.handlePageChange(props.url + `&page=${props.page + 1}`)
                }} disabled={props.page === props.totalPages}>Next</button>
            </div>
        </div>
    )
}

export default Pagination
