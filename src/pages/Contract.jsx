import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from "../components/header";
import Footer from "../components/footer";
function Contract() {
    useEffect(() => {
        document.title = "Clerick Barrion's Crazy Bat | WEB215 | Contract"
    }, [])
    
    return (
        <>
        <Header />
        <main>
            <h2>Contract</h2>
            <p>I, <Link to="/introduction">Clerick D. Barrion</Link>, agree to abide by the terms in my Spring 2025 WEB215-N801 Adv Markup and Scripting with my instructor, Professor D.I. von Briesen.</p>
            <p>I understand that all work that I do on my school and personal websites will be publicly available to the world. I will not put information there that is inappropriate for schoolwork, or that I wish to keep private.</p>
            <p>I also understand that it is my work that counts for attendance, not logins or showing up for class. As such, failure to turn in assignments may show as absences.</p>
            <p>Signed: <em>Clerick D. Barrion, 28 January 2025</em></p>
        </main>
        <Footer />
        </>
    )
}

export default Contract
