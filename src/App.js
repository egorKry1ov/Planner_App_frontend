import { Routes, Route, Link} from 'react-router-dom';
import React, { useState } from "react";
import ListClients from './components/ListClients'
import SignUp from './components/SignUp'
import Login from './components/Login'
import LogOut from './components/Logout';
import Planner from './components/Planner';
import './App.css'


function App() {

  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  
  return (
    <div>

    <nav className='navbar navbar-expand-lg bg-dark'>
      <div className='container-fluid links'>
        <a className="navbar-brand" href="#">
          {userSignedIn ? (
              <span>{userSignedIn}</span>
            ) : null
          }
        </a>

          <ul className='nav nav-pills nav-fill'>
            <li className='nav-link '><Link to="/">Home </Link></li>
            <li className='nav-link '><Link to="/clients">Clients </Link></li>
            <li className='nav-link'><Link to="/signup"> Sign Up </Link></li>
            <li className='nav-link'><Link to="/login">Login </Link></li>
            <li className='nav-link'><Link to="/logout"> Logout</Link></li>
          </ul>
      </div>
    </nav>
    <div className='home-page'>   
            
      <Routes>
      
        <Route  exact path="/" element={<Planner userSignedIn={setUserSignedIn} accessToken={accessToken}/>}/>
        <Route  exact path="/clients" element={<ListClients userSignedIn={setUserSignedIn} accessToken={accessToken}/>}/>
        <Route  exact path="/signup" element={<SignUp setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>   
        <Route   path="/login" element={<Login setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>
        <Route   path="/logout" element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>

      </Routes>
      
    </div>
    </div>
  );
}

export default App;
