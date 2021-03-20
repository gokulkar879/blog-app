import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Singleblog.css'


function Singleblog({id, title, content}) {
    return (
        <div className="singleblog">
            <h4>{title}</h4>
            <div className="content">
                <p>{content}</p>
            </div>
            <Link to={`/blog/${id}`} className="btn btn-primary">Details</Link>
        </div>
    )
}

export default Singleblog
