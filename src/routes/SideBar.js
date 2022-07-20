import React from 'react'
import { Link} from 'react-router-dom';

function SideBar() {
  return (
    <div class="sidenav">

    <span ><Link to="/"><i class="bi bi-calendar3 fa-lg"></i></Link>Calendar</span>
    <span ><Link to="/profile"><i class="bi bi-person-lines-fill fa-lg"></i></Link>Profile</span>
    <span ><Link to="/clients"><i class="bi bi-layout-text-sidebar-reverse fa-lg"></i></Link>Events</span>
    <span ><Link to="/logout"><i class="bi bi-box-arrow-right fa-lg"></i></Link>Logout</span>
  </div>
  )
}

export default SideBar