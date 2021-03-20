import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import './Dashboard.css'
import Singleblog from './Singleblog'


function Dashboard() {
    const { user, db } = useGlobalContext()
    const[myblogs, setmyBlogs] = useState(null)


   const fetchData = e => {
       db.collection("blogs").where("id", "==", user.uid).get()
       .then(snapshot => {
           let temp = [];
           snapshot.docs.forEach(doc => {
               let file = {uid:doc.id, ...doc.data()};

               temp.push(file)
           })
           
           setmyBlogs(temp)
       })
   }

    useEffect(() => {
      fetchData()
    },[])
    return (
        <div className="dashboard">
            <h2 className="dashboard__heading1">Write a Blog...</h2>
            <Link to="/create" className="create__dash">Create</Link>

            <div className="your__blogs">
               <h3>Your blogs</h3>
               {
                   myblogs && myblogs.map(blog => {
                       const { uid, title, content } = blog;
                       
                       return <Singleblog key={uid} id={uid} title={title} content={content} />
                   })
               }
            </div>
        </div>
    )
}

export default Dashboard
