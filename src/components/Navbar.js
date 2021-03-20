import { Button } from 'react-bootstrap'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context'
import './Navbar.css'



function Navbar() {
    const { signInWithGoogle } = useGlobalContext()
    const { user } = useGlobalContext()
    const handleClick = e => {
        e.preventDefault()

        signInWithGoogle().then(res => {
            // console.log(res.user)
        })

    }
    return (
        <div className="navbar">
            <Link to="/" className="navbar_home">
                BLOG-APP
            </Link>
           {
               user ? <Link to="/dashboard" className="navbar_dash">Dashboard</Link>: <Button onClick={handleClick}>Sign In</Button>
           }
           
            
        </div>
    )
}

export default Navbar
