import { Routes, Route} from 'react-router-dom';
import React, { useState } from "react";
import ListClients from './components/ListClients'
import SignUp from './components/SignUp'
import Login from './components/Login'
import LogOut from './components/Logout';
import Planner from './components/Planner';
import ProtectedRoute from './routes/ProtectedRoute'
import Profile from './components/Profile';
import Navbar from './routes/Navbar';
import './App.css'


function App() {
  
  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  
  return (
    <div>
      <Navbar userSignedIn={userSignedIn}/>
    <div className='home-page'>   
            
      <Routes>
          
        <Route  exact path="/" element={
          // <ProtectedRoute userSignedIn={userSignedIn}>
          <Planner userSignedIn={setUserSignedIn} accessToken={accessToken}/>}/>
           {/* </ProtectedRoute>}/> */}
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
