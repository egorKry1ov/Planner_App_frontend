import React from 'react';
import {useState, useEffect} from 'react'
import NewClient from './NewClient';
import axiosInstance from '../utils/axios-utils'

function ListClients({userSignedIn, accessToken}) {
    
    const clientRestEndpoint = 'clients'

    const [clients, setClients] = useState([])

    useEffect(() => {
      getClients()
    }, [])  
    
    const getClients = () => {
        axiosInstance.get(clientRestEndpoint)
        .then(res => {
          console.log(res.data)
          setClients(res.data)
        })
    }

  const loaded = () => {

    return (
    <div>
        <h3>Clients Timeline</h3>
        <ul>
        {
          clients.map((item,ind) => {
            return (<li key={ind}>{item.name}</li>)
          })
        }
        </ul>
        <NewClient getClients={getClients} accessToken={accessToken}/>
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
