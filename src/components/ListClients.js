import React from 'react';
import {useState, useEffect} from 'react'
import NewClient from './NewClient';
import axiosInstance from '../utils/axios-utils'
import SideBar from '../routes/SideBar';
import './EventsList.css'

function ListClients({userSignedIn, accessToken}) {
    
    const clientRestEndpoint = 'clients/'
    
    const [clients, setClients] = useState([])

    useEffect(() => {
      getClients()
    }, [])  
    
    const getClients = () => {
        axiosInstance.get(clientRestEndpoint)
        .then(res => {
          setClients(res.data)
          console.log(res.data)
        })
    }

    const handleDelete = (id) => {
      axiosInstance.delete(`clients/${id}`)
      .then(res => {
        console.log(res)
        getClients()
      })
    }
    console.log(clients)

  const loaded = () => {
    return (
    <div>
        <SideBar />
        <div className='event-list'>

          <h2 >Events</h2>
          <hr style={{marginBottom: '40px'}}/>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {
            clients.map((item,ind) => { 
              return (<p className='event-name' key={ind}>{item.title} 
              <span className='bi bi-trash3 delete-button' onClick={() =>handleDelete(item.id)}></span><hr/></p>
              )
            })
          }</td>
              </tr>
            </tbody>
          </table>
          <NewClient getClients={getClients} accessToken={accessToken} userSignedIn={userSignedIn}/>
         
        </div>

        </div>
    );
  }
  return (
    <div>

      {userSignedIn ? loaded() : null}
    </div>
  )
}

export default ListClients;




