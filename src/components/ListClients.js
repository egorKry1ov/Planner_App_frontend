import React from 'react';
import {useState, useEffect} from 'react'
import NewClient from './NewClient';
import axiosInstance from '../utils/axios-utils'

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

    const handleUpdate = (id, val) => {
      axiosInstance.patch(`clients/${id}`, {name: val})
      .then(res => {
        console.log(res)
        getClients()
      })
    }


  const loaded = () => {
    return (
    <div>
        <h3>Clients</h3>
        <ul>
        {
          clients.map((item,ind) => { 
            return (<p key={ind}>{item.name} 
            <button onClick={() =>handleDelete(item.id)}>-</button>
            <button onClick={() =>handleUpdate(item.id, `${item.name}aa`)}>+</button></p>)
          })
        }
        </ul>
        <NewClient getClients={getClients} accessToken={accessToken} userSignedIn={userSignedIn}/>
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
