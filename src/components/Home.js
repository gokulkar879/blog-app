import React, { useState, useEffect } from 'react'
import Singleblog from './Singleblog'
import './Home.css'
import { useGlobalContext } from '../context'
import Loading from './Loading'
function Home() {
    const { db, loading, blogs } = useGlobalContext()

    if(loading) {
        return <Loading />
    }
console.log(blogs)
    return (
        <div className="home">
            {
                blogs.map(blog => {
                    const { uid, title, content } = blog

                    return <Singleblog key={uid} title={title} content={content} id={uid}/>
                })
            }
        </div>
    )
}

export default Home
