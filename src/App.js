import { Routes, Route, Link} from 'react-router-dom';
import React, { useState } from "react";
import ListClients from './components/ListClients'
import SignUp from './components/SignUp'
import Login from './components/Login'
import LogOut from './components/Logout';
import Planner from './components/Planner';
import ProtectedRoute from './routes/ProtectedRoute'
import Profile from './components/Profile';
import './App.css'


function App() {
  

  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  
  return (
    <div>

    <nav className='navbar navbar-expand-lg bg-dark'>
      <div className='container-fluid links'>
        <div className="navbar-brand"><Link to="/profile">
          {userSignedIn ? (
              <span>{userSignedIn}</span>
            ) : null
          }
        </Link>
        </div>

          <ul className='nav nav-pills nav-fill'>
            <li className='nav-link '><Link to="/">Home </Link></li>
            <li className='nav-link '><Link to="/clients">Clients </Link></li>
            <li className='nav-link'><Link to="/logout"> Logout</Link></li>
          </ul>
      </div>
    </nav>
    <div className='home-page'>   
            
      <Routes>
          
        <Route  exact path="/" element={
          <ProtectedRoute userSignedIn={userSignedIn}>
            <Planner userSignedIn={setUserSignedIn} accessToken={accessToken}/>
          </ProtectedRoute>}/>
        <Route  exact path="/clients" element={
        <ProtectedRoute userSignedIn={userSignedIn}><ListClients userSignedIn={setUserSignedIn} accessToken={accessToken}/></ProtectedRoute>}/>
        <Route exact path="profile" element={<Profile userSignedIn={userSignedIn}/>}/>
        <Route  exact path="/signup" element={<SignUp setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>   
        <Route   path="/login" element={<Login setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>
        <Route   path="/logout" element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>

      </Routes>
      
    </div>
    </div>
  );
}

export default App;
