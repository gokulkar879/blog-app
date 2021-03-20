import React from 'react'
import { Redirect, Route } from 'react-router'
import { useGlobalContext } from '../context'

function ProtectedRoute({component: Component, ...rest}) {
    const { user } = useGlobalContext()
    return (
        <Route
        {...rest}
        render={
            props => {
                return user ? <Component {...props}/>: <Redirect to="/" />
            }
        }
        ></Route>
    )
}

export default ProtectedRoute
