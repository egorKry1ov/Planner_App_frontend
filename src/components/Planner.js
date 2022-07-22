import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import SmallCalendar from "./SmallCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from '../utils/axios-utils';
import SideBar from "../routes/SideBar";
import './Planner.css'

const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

function Planner() {

  const clientRestEndpoint = 'clients/'
    
    const [clients, setClients] = useState([])
    const [isUpdate, setIsUpdated] = useState(false)
    const [userId, setUserId] = useState()
    const [date, setDate] = useState(new Date());
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
      getClients()
    }, [])  
    
    const getClients = () => {
        axiosInstance.get(clientRestEndpoint)
        .then(res => {
          setClients(res.data)
        })
    }

  const eventsRestEndpoint = 'events/'


  const initialState = {
      title: "",
      start: '',
      end: '',
    }
  const [newEvent, setNewEvent] = useState(initialState);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    getEvents()
  }, [])  
  
  const getEvents = () => {
      axiosInstance.get(eventsRestEndpoint)
      .then(res => {
        let newArray = []
        res.data.forEach(myData => {
          let new_data = {
            title: myData.title,
            start: new Date(myData.start),
            end: new Date(myData.end),
            id: myData.id,
            user: myData.user,
          } 
        newArray.push(new_data) 
        })
        setAllEvents(newArray)
      })
  }
  const handleSelectSlot = (event) => {
    event.title = prompt('New Event Name')
    console.log(event.title)
    setNewEvent({...event, title: event.title, start: event.start, end: event.end})
    axiosInstance
    .post(eventsRestEndpoint, event)
    .then(res => {
        setNewEvent(initialState)
        getEvents()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSelectEvent = (event) => {
    setIsUpdated(true)
    setShowResults(true)
    setUserId(event.id)
    setNewEvent({...event, title: event.title, start: event.start, end: event.end})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isUpdate) {

      axiosInstance
      .patch(`events/${userId}`, newEvent)
      .then(res => {
        window.location.reload()
        })
        .catch(err => {
          console.log(err)
          getEvents()
        })
    } else {
      axiosInstance
      .post(eventsRestEndpoint, newEvent)
      .then(res => {
          setNewEvent(initialState)
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })

    }
      }

    return(
      <div className=" float-parent-element">
        <div style={{marginTop: '70px', marginLeft: "100px"}}>
          <h2>Calendar</h2>
        <hr style={{marginBottom: '40px'}}/>
        </div>
        <div  className="">
          <div className="body-form">
          <SideBar />
          <div className='float-child-element '>
            <div className='calendar-container'>
              <div className="hello "><SmallCalendar /></div>
            </div>

          <button className="edit-event" onClick={() => setShowResults(true)}>+</button>
          {showResults ? 
            <div className="red center-class">
              <span className="close-button bi bi-x fa-lg" stlye={{ marginTop: "10px", marginLeft: "10px" }} onClick={() => setShowResults(false)}>
                   
                </span>
              <div className="txt_field ">
              <input type="text" placeholder="Add Title" style={{ }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker 
                dateFormat="yyyy-MM-dd hh:mm" 
                timeFormat="HH:mm" 
                timeIntervals={30} 
                showTimeSelect 
                placeholderText="Start Date" 
                style={{ marginRight: "10px" }} 
                selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker 
                dateFormat="yyyy-MM-dd hh:mm" 
                timeFormat="HH:mm" 
                timeIntervals={30} 
                showTimeSelect 
                placeholderText="End Date" 
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end})} />

              </div>
                <div className="dropdown buttons">
                <button className=" dropdown-toggle events-button" type="button" id="dropupCenterBtn" data-bs-toggle="dropdown" aria-expanded="false">Events</button>
                <ul className="dropdown-menu" aria-labelledby="dropupCenterBtn">
                {
                  clients.map((item,ind) => { 
                    return (<button onClick={ () => setNewEvent({ ...newEvent, title: item.title })} className="dropdown-item" key={ind}>{item.title}</button>)
                  })
                }
                </ul>
                <button className="save-button" stlye={{ marginTop: "10px" }} onClick={handleSubmit}>
                   Save
                </button>
               
              </div>
            </div>
           : null}
          </div>

        <div className="">
          <Calendar
     
          // onNavigate={date => <SmallCalendar onChange={setDate} value={date}/>}
          // onNavigate={(a,b,c) => { console.log(a,b,c)}} 
          localizer={localizer}
          className="float-child-element"
          events={allEvents}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={true}
          defaultView={Views.WEEK}
          startAccessor="start"
          endAccessor="end"
          showMultiDayTimes
          style={{ marginLeft: '20px', height: '85vh', width:'75%', minWidth: '80vh'}}/>
      
        </div>
      </div>
    </div>

      </div>
    )

}
export default Planner