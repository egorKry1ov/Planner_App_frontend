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
          setAllEvents(res.data)
        })
    }
    
      const handleSubmit = (e) => {
        e.preventDefault()
    
        axiosInstance
        .post(eventsRestEndpoint, newEvent)
        .then(res => {
            setAllEvents([...allEvents, newEvent])
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    
    
    console.log(newEvent)
    
    return(
        <div>

            <h1>Calendar</h1>
                    <h2>Add New Event</h2>
                    <div>
                        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                        <DatePicker dateFormat="yyyy-MM-dd" placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start: new Date(Date.parse(start)) })} />
                        <DatePicker dateFormat="yyyy-MM-dd" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end: new Date(Date.parse(end))})} />
                        <button stlye={{ marginTop: "10px" }} onClick={handleSubmit}>
                            Add Event
                        </button>
                    </div>
              <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600, margin: "50px" }}
              />

        </div>
    )

}
export default Planner