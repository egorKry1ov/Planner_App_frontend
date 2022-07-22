import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function LogOut({userSignedIn, setUserSignedIn, setAccessToken}) {

    const navigate = useNavigate()
    const [userName, setUserName] = useState(userSignedIn)
    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        setUserSignedIn(null)
        setAccessToken(null)
        navigate('/')
    }, [])
  return (
    <h3>Successfully signed out<em>{userName}</em></h3>
  )
}

export default LogOut