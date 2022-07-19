import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios-utils';

function NewClient({getClients}) {
  const initialState = {
    title:'',
  }
  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState(initialState)
    
    const handleSubmit = (e) => {
      e.preventDefault()
      const url = 'clients/'

      axiosInstance
      .post(url, formInfo)
      .then(res => {

          setFormInfo(initialState)
          getClients()
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
          navigate('/')
        })
    }

    const handleChange = (e) => {
      setFormInfo({...formInfo, [e.target.id]: e.target.value})
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={formInfo.title} id="title" type="text" onChange={handleChange}/>
                <button type="submit">Add a Client</button>
            </form>
        </div>
  )
}

export default NewClient;