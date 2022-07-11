import './App.css';
import {useState} from 'react'
import { Routes, Route} from 'react-router-dom';
import Header from './routes/Header';
import ListClients from './components/ListClients'
import SignUp from './components/SignUp'
import Login from './components/Login'
import LogOut from './components/Logout';
import moment from 'moment'; 
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"



function App() {

  let myEventsList = [{
    'title': 'Conference',
    'start': new Date(2022, 6, 11),
    'end': new Date(2022, 6, 13),
    desc: 'Big conference for important people'
    },
    {
        'title': 'Meeting',
        'start': new Date(2022, 6, 12, 10, 30, 0, 0),
        'end': new Date(2022, 6, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'start':new Date(2022, 3, 12, 12, 0, 0, 0),
        'end': new Date(2022, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    }]

  const localizer = momentLocalizer(moment)
  
  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))

  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))

  return (
    <div >   
      
      <Header userSignedIn={userSignedIn}/>
      <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      />

      <Routes>
      
        <Route  exact path="/" element={<ListClients userSignedIn={setUserSignedIn} accessToken={accessToken}/>}/>
        <Route  exact path="/signup" element={<SignUp setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>   
        <Route   path="/login" element={<Login setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>
        <Route   path="/logout" element={<LogOut setUserSignedIn={setUserSignedIn} setAccessToken={setAccessToken} />}/>

      </Routes>
      
    </div>
  );
}

export default App;
