import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from '../utils/axios-utils';
import '../App.css'

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

  const handleSelectEvent = (id) => {
  
    console.log(id)
    axiosInstance
        .patch(`events/${id}`, newEvent)
        .then(res => {
            setNewEvent(initialState)
          })
          .catch(err => {
            console.log(err)
          })
      
  }
    
      const handleSubmit = (e) => {
        e.preventDefault()
    
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
        
    return(
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h3>Add Event</h3>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropupCenterBtn" data-bs-toggle="dropdown" aria-expanded="false">Clients</button>
                <ul className="dropdown-menu" aria-labelledby="dropupCenterBtn">
                {
                  clients.map((item,ind) => { 
                    return (<li className="dropdown-item" key={ind}>{item.name} </li>)
                  })
                }
                </ul>
              </div>
              <input type="text" placeholder="Add Title" style={{ }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker 
                dateFormat="yyyy-MM-dd" 
                timeFormat="HH:mm" 
                timeIntervals={30} 
                showTimeSelect 
                placeholderText="Start Date" 
                style={{ marginRight: "10px" }} 
                selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker 
                dateFormat="yyyy-MM-dd" 
                timeFormat="HH:mm" 
                timeIntervals={30} 
                showTimeSelect 
                placeholderText="End Date" 
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end})} />
                <button className=" btn btn-primary" stlye={{ marginTop: "10px" }} onClick={handleSubmit}>
                   Add Event
                </button>
                <button className=" btn btn-primary" stlye={{ marginTop: "10px", marginLeft: "10px" }} onClick={handleSelectEvent}>
                   Update
                </button>
            </div>

        <div className="col">
          <Calendar
          localizer={localizer}
          events={allEvents}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={true}
          defaultView={Views.WEEK}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '90vh', width:'140vh', }}/>
      
        </div>
      </div>
    </div>
    )

}
export default Planner