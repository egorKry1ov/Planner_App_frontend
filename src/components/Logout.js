import React from 'react'
import {useState, useEffect} from 'react'

function LogOut({userSignedIn, setUserSignedIn, setAccessToken}) {
    const [userName, setUserName] = useState(userSignedIn)
    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        setUserSignedIn(null)
        setAccessToken(null)
    }, [])
  return (
    <h3>Successfully signed out<em>{userName}</em></h3>
  )
}

export default LogOut