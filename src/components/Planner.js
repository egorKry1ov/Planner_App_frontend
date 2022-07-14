import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from '../utils/axios-utils';

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
          console.log(res.data)
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
          console.log(newArray)
        })
    }
    
      const handleSubmit = (e) => {
        e.preventDefault()
    
        axiosInstance
        .post(eventsRestEndpoint, newEvent)
        .then(res => {
            setNewEvent(initialState)
            window.location.reload()
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    
    
    console.log(newEvent)
    
    return(
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <input type="text" placeholder="Add Title" style={{ }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker 
                dateFormat="yyyy-MM-dd h:mm aa" 
                timeFormat="HH:mm" 
                timeIntervals={30} 
                showTimeSelect 
                placeholderText="Start Date" 
                style={{ marginRight: "10px" }} 
                selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker 
                dateFormat="yyyy-MM-dd h:mm aa" 
                timeFormat="HH:mm" 
                timeIntervals={30} 
                showTimeSelect 
                placeholderText="End Date" 
                selected={newEvent.end} 
                onChange={(end) => setNewEvent({ ...newEvent, end})} />
                <button className=" btn btn-primary" stlye={{ marginTop: "10px" }} onClick={handleSubmit}>
                   Add Event
                </button>
            </div>

        <div className="col">
          <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100vh', width:'160vh', }}/>
      
        </div>
      </div>
    </div>
    )

}
export default Planner