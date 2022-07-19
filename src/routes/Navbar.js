import React, {useState} from 'react'
import { Link} from 'react-router-dom';
import '../App.css'

function Navbar({userSignedIn}) {
 


  return (
    <div >
    <nav className="navbar bg-light fixed-top bg-dark">
              {/* <div className=' navbar-text'>Planner</div> */}
    <div  className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span ><i className="bi bi bi-list fa-lg icon-color"></i></span>
        </button>
        <div className="offcanvas offcanvas-start" tabIndex="1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
            <li className='nav-link '><Link to="/">Home </Link></li>
            <li className='nav-link '><Link to="/profile">Profile </Link></li>
            </li>
            <li className="nav-item">
            <li className='nav-link '><Link to="/clients">Clients </Link></li>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More Options
                </a>
                <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                <li><a className="dropdown-item" href="#">About</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
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
