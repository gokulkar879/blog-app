import React, { useRef, useState } from 'react'
import './Create.css'
import { Form, Button, Alert } from 'react-bootstrap'
import { useGlobalContext } from '../context'
import { useHistory } from 'react-router-dom'





function Create() {
    const [error, setError] = useState('')
    const history = useHistory()
  const title = useRef()
  const content = useRef()
  const { user, db, setBlogs, blogs } = useGlobalContext()
   const handleSubmit = e => {
       e.preventDefault();
       db.collection('blogs').add({
          title: title.current.value,
          content: content.current.value,
          id: user.uid,
          createdAt: new Date()
       }).then((res) => {
           console.log(res.id)
           setBlogs([...blogs, {uid: res.id,title: title.current.value,
            content: content.current.value,
            id: user.uid,
            createdAt: new Date()}])
           setError('')
           history.push("/")
       }).catch(err => {
            setError('could not add blog')
       })
   }

    return (
        <div className="create">
            {
                error && <Alert type="danger">{error}</Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="enter the title" className="input" ref={title}></Form.Control>
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" type="textarea" placeholder="enter the content" className="input" ref={content}></Form.Control>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Create
