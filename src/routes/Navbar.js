import React, {useState} from 'react'
import { Link} from 'react-router-dom';
import '../App.css'

function Navbar({userSignedIn}) {
 


  return (
    <div >
    <nav className="navbar bg-light fixed-top bg-dark">
    <div  className="container-fluid">
              <div ><Link className=' navbar-brand' style={{fontFamily: 'Sigmar One', color:'white', }} to="/calendar"><img style={{marginRight: '10px'}} src="https://img.icons8.com/arcade/31/FA5252/experimental-calendar-arcade.png"/>E-Planner</Link></div>
        <div  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <i className="bi bi bi-list fa-lg icon-color" ></i>
        </div>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div  className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Account<div className="profile-email"><Link to="/profile">
          {userSignedIn ? (
              <span className=''>{userSignedIn}</span>
            ) : <li className='nav-link'><Link   to="/login" > Login</Link></li>
          }
        </Link>
        </div></h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 links">
            <li className="nav-item">
            <li className='nav-link '><Link to="/calendar">Calendar </Link></li>
            <li className='nav-link '><Link to="/profile">Profile </Link></li>
            </li>
            <li className="nav-item">
            <li className='nav-link '><Link to="/clients">Events </Link></li>
            <li className='nav-link '><Link to="/">About </Link></li>
            </li>
            <li className='nav-link'><Link to="/logout"> Logout</Link></li>
            </ul>
        </div>
        </div>
    </div>
    </nav>
    </div>
  )
}

export default Navbar
