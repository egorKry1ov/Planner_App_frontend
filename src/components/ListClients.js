import React from 'react';
import {useState, useEffect} from 'react'
import NewClient from './NewClient';
import axiosInstance from '../utils/axios-utils'

function ListClients({userSignedIn, accessToken}) {
    
    const clientRestEndpoint = 'clients/'
    const clientRestEndpoint2 = 'api/users/'

    const [clients, setClients] = useState([])
    const [user, setUser] = useState([])


    useEffect(() => {
      getClients()
    }, [])  
    
    const getClients = () => {
        axiosInstance.get(clientRestEndpoint)
        .then(res => {
          setClients(res.data)
        })
    }

    useEffect(() => {
      getUsers()
    }, [])  
    
    const getUsers = () => {
        axiosInstance.get(clientRestEndpoint2)
        .then(res => {
          setUser(res.data)
        })
    }

  const loaded = () => {
    // const clients_from_user = users.clients
    console.log(user)
    return (
    <div>
        <h3>Clients</h3>
        <ul>
          {/* <li>{user.clients}</li> */}
        {
          clients.map((item,ind) => { 
            return (<li key={ind}>{item.name}</li>)
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
