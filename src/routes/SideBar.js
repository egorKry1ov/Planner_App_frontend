import React from 'react'
import { Link} from 'react-router-dom';

function SideBar() {
  return (
    <div class="sidenav">
    <hr style={{color:'white'}}></hr>   
    <span ><Link to="/"><i class="bi bi-calendar3 fa-lg"></i></Link>Calendar</span>
    <hr style={{color:'white'}}></hr>
    <span ><Link to="/profile"><i class="bi bi-person-lines-fill fa-lg"></i></Link>Profile</span>
    <hr style={{color:'white'}}></hr>
    <span ><Link to="/clients"><i class="bi bi-layout-text-sidebar-reverse fa-lg"></i></Link>Events</span>
    <hr style={{color:'white'}}></hr>
    <span ><Link to="/logout"><i class="bi bi-box-arrow-right fa-lg"></i></Link>Logout</span>
    <hr style={{color:'white'}}></hr>
  </div>
  )
}

export default SideBar