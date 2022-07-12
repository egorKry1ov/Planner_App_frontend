import { Routes, Route} from 'react-router-dom';
import React, { useState } from "react";
import Header from './routes/Header';
import ListClients from './components/ListClients'
import SignUp from './components/SignUp'
import Login from './components/Login'
import LogOut from './components/Logout';
import Planner from './components/Planner';


function App() {

  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  
  return (
    <div >   
      
      <Header userSignedIn={userSignedIn}/>
      
      <Routes>
      
        <Route  exact path="/" element={<Planner userSignedIn={setUserSignedIn} accessToken={accessToken}/>}/>
        <Route  exact path="/clients" element={<ListClients userSignedIn={setUserSignedIn} accessToken={accessToken}/>}/>
        <Route  exact path="/signup" element={<SignUp setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>   
        <Route   path="/login" element={<Login setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>
        <Route   path="/logout" element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>

      </Routes>
      
    </div>
  );
}

export default App;
