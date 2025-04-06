import React, {useEffect} from 'react'

function Template() {
    useEffect(() => {
            document.title = "Clerick Barrion's Crazy Bat | WEB215 | Template Page - CHANGE FOR THIS PAGE";
        }, [])
    return (
        <main>
            <h2>Template Page - CHANGE TO PAGE NAME</h2>
            <p>
                This is a Template page. I've built it so that i can easily copy it and then just change the contents to match the page i'm working on
            </p>
            <p>
                This is a 2nd sample paragraph for the template page. I'll change it or delete it depending on the assignment i create from it. 
            </p>
        </main>
    )
}

export default Template
