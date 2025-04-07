import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import pfp from '../images/clerickblowingrock.jpg'

function Introduction() {
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Introduction";
    }, [])
    return (
        <>
        <Header />
        <main>
            <h2>Introduction</h2>
            <figure>
                <img src={pfp} alt="me sitting on blowing rock"/>
                <figcaption>On top of Blowing Rock</figcaption>
            </figure>
            <ul>
                <li><strong>Personal Background: </strong>I was born in the Philippines and I moved to New Jersey when I was 5. I moved to North Carolina when I was 11 and I have been living here since.</li>
                <li><strong>Professional Background: </strong>I was a coding apprentice in a program called Road to Hire. It's a 6 month program where they teach us skills regarding web development. After that, they set me up for an interview with Bank of America, and now I'm currently an apprentice for a year doing QA and automation.</li>
                <li><strong>Academic Background: </strong>I graduated high school in 2022 and now I'm working towards an Associate's Degree in Full Stack Programming in CPCC. This is my last class and then I'm done.</li>
                <li><strong>Background in this Subject: </strong>I took AP computer science and Python in high school. I learned PHP in WEB-250 and JavaScript at Road to Hire. I've made websites and useful applications for myself.</li>
                <li><strong>Primary Computer Platform: </strong>Windows 11 computer</li>
                <li>
                    <strong>Courses I'm Taking &amp; Why:</strong>
                    <ol>
                        <li><Link to="/contract"><strong>WEB215 - Adv Markup and Scripting: </strong></Link>To get a refresher on React and Node.</li>
                    </ol>
                    
                </li>
                <li><strong>Funny/Interesting Item to Remember me by: </strong>I can juggle.</li>
            </ul>
        </main>
        <Footer />
        </>
    )
}

export default Introduction
