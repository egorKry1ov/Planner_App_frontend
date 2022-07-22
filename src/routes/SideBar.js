import React from 'react'
import { Link} from 'react-router-dom';

function SideBar() {
  return (
    <div className="sidenav">
    <hr style={{color:'white'}}></hr>   
    <span ><Link to="/calendar"><i className="bi bi-calendar3 fa-lg"></i></Link>Calendar</span>
    <hr style={{color:'white'}}></hr>
    <span ><Link to="/profile"><i className="bi bi-person-lines-fill fa-lg"></i></Link>Profile</span>
    <hr style={{color:'white'}}></hr>
    <span ><Link to="/clients"><i className="bi bi-layout-text-sidebar-reverse fa-lg"></i></Link>Events</span>
    <hr style={{color:'white'}}></hr>
    <span ><Link to="/logout"><i className="bi bi-box-arrow-right fa-lg"></i></Link>Logout</span>
    <hr style={{color:'white'}}></hr>
  </div>
  )
}

export default SideBar