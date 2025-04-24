import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/header";
import Footer from "../components/footer";
function Login() {
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Login";
    }, [])

    const [signUpToggle, setSignUpToggle] = useState(false)
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function handleLogin(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        axios.post('https://web215-react.onrender.com/login', { username, password })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate('/profile');
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Login failed', error);
                setError(error.response.data.message || 'An error occurred');
            });
    }
    function handleSignUp(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        axios.post('https://web215-react.onrender.com/users', { username, password })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate('/profile');
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Sign up failed', error);
                setError(error.response.data.message || 'An error occurred');
            });

    }
    return (
        <>
        <Header />
        <main>
            <h2>Login</h2>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={signUpToggle ? handleSignUp : handleLogin}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <br />
                {signUpToggle ?
                    <>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                    <br />
                    <input type="submit" value="Sign Up"/>
                    <p onClick={() => setSignUpToggle(!signUpToggle)}>Already have an account? <Link>Log in</Link></p>
                    </>
                    :    
                    <>
                    <br/>
                    <input type="submit" value='Login'/>
                    <p onClick={() => setSignUpToggle(!signUpToggle)}>Don't have an account? <Link>Sign up</Link></p>
                    </>
                }
            </form>
        </main>
        <Footer />
        </>
    )
}

export default Login
