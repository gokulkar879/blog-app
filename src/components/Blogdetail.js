import React, {useEffect, useState } from 'react'
import { useHistory, useParams }  from 'react-router-dom'
import { useGlobalContext } from '../context'
import './Blogdetail.css'
import moment from 'moment'
import Loading from './Loading'
import { Button } from 'react-bootstrap'


function Blogdetail() {
    const {id} = useParams()

    const { db, user } = useGlobalContext()
    const [blog, setBlog] = useState({})
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(true)
   const history = useHistory()

   const handleClick = e => {
    db.collection('blogs').doc(id).delete().then((res) => {

        history.push('/dashboard')
    })
   }


    useEffect(() => {
       db.collection('blogs').doc(id).get().then(res => {
           let time = res.data().createdAt.seconds;
           setLoading(false)
           setDate(moment(time).format("MMM Do YY"))
           setBlog(res.data())
       })
    },[])


    if(loading) {
        return <Loading />
    }
    return (
        <div className="blogdetail">
            <h2>{blog.title}</h2>
            <div className="content"><p>{blog.content}</p></div>
            <h5>{date}</h5>
            {
                user && user.uid == blog.id ? <Button className="btn btn-danger" style={{"font-weight":"bold"}} onClick={handleClick}>Delete Blog</Button>:null
            }
        </div>
    )
}

export default Blogdetail
