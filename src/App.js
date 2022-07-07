import './App.css';
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ListClients from './components/ListClients'
import SignUp from './components/SignUp'
import Login from './components/Login'
import LogOut from './components/Logout';

function App() {
  
  //TODO - add browser state check
  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))

  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

  return (
    <div className="App">
      <h1>Template App</h1>
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/signup"> Sign Up | </Link>
        <Link to="/login">Login |</Link>
        <Link to="/logout"> Logout</Link>
      </nav>
      
      {userSignedIn ? (
        <nav>
          <span>signed in as: {userSignedIn}</span>
        </nav>  
        ) : null
      }
      <Routes>
      
        <Route  exact path="/" element={<ListClients userSignedIn={userSignedIn} accessToken={accessToken}/>}/>
        <Route  exact path="/signup" element={<SignUp setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>   
        <Route   path="/login" element={<Login setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>
        <Route   path="/logout" element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>

      </Routes>
      
    </div>
  );
}

export default App;
