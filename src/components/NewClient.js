import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios-utils';

function NewClient({getClients}) {
  const initialState = {
    name:'',
    user_string:'generic_user',
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
          //after we POST we want to GET the list back
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
          navigate.push('/logout')
        })
    }

    const handleChange = (e) => {
      setFormInfo({...formInfo, [e.target.id]: e.target.value})
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={formInfo.name} id="name" type="text" onChange={handleChange}/>
                {/* <input id="user_string" type="hidden" /> */}
                <button type="submit">Add a Client</button>
            </form>
        </div>
  )
}

export default NewClient;