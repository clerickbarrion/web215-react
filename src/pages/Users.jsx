import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import User from '../components/user';


function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Users";
        axios.get('http://localhost:5000/users').then(res => {
            if (res.status === 200) {
                setUsers(res.data);
            }
        }).catch(error => {
            console.error('Error fetching users', error);
        });
    }, [])
    return (
        <>
        <Header />
        <main>
            <h2>Users</h2>
            <p>Have a look at everyone's favorites/reviews!</p>
            <ul id='userList'>
                {users.map(user => (
                    <li key={user._id}>
                        <User username={user.username} picture={user.picture} />
                    </li>
                ))}
            </ul>
        </main>
        <Footer />
        </>
    )
}

export default Users
