import React, { useState, useEffect, useContext } from 'react'
import { db, auth, googleProvider } from './config'
const AppContext = React.createContext()


const AppProvider = ({children}) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
 

 function signInWithGoogle() {
     return auth.signInWithPopup(googleProvider)
 }

 function signOut() {
     return auth.signOut()
 }
 const fetchBlogs =  e => {
let temp = [];
 db.collection('blogs').get()
 .then(snapshot => {
     snapshot.docs.forEach(doc => {
         let obj = {uid: doc.id, ...doc.data()};

         temp.push(obj)
     })
    
     setBlogs(temp)
 })

 }

 useEffect(() => {
   fetchBlogs()
   
 },[])

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {

       setUser(user)
       setLoading(false)
   })
   return unsubscribe
  },[])
   

    return <AppContext.Provider value={{
        user,
        loading,
        db,
        blogs,
        setBlogs,
        signInWithGoogle
    }}>
        {
           !loading && children
        }
    </AppContext.Provider>
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}

export {AppProvider}