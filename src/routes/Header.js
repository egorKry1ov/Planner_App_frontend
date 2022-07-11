import React from 'react'
import {Link} from 'react-router-dom'

function Header({userSignedIn}) {
  console.log(userSignedIn)
  return (
    <div className='nav nav-pills nav-fill'>
      {userSignedIn ? (
          <span>{userSignedIn}</span>
        ) : null
      }

      <ul className='nav nav-pills nav-fill'>
        <li className='nav-link nav-item'><Link to="/">Home </Link></li>
        <li className='nav-link'><Link to="/signup"> Sign Up </Link></li>
        <li className='nav-link'><Link to="/login">Login </Link></li>
        <li className='nav-link'><Link to="/logout"> Logout</Link></li>
      </ul>

    </div>
  )
}

export default Header