import React from 'react'
import {useState, useEffect} from 'react'
import SideBar from '../routes/SideBar'
import axiosInstance from '../utils/axios-utils'
import './EventsList.css'

function Profile({userSignedIn}) {

  const userRestEndpoint = 'api/users'
    
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUser()
  }, [])  
  
  const getUser = () => {
      axiosInstance.get(userRestEndpoint)
      .then(res => {
        setUsers(res.data)
      })
  }
  return (
    <div>
      <SideBar />
      <div className='event-list'>
      <h2>Account Details</h2>
        <hr style={{marginBottom: '40px'}}/>
        <div className='profile-container'>
          <div style={{marginTop:"40px", }}>
              <i class="bi bi-person-fill fa-4x"></i>
          </div>

        {users.filter(user => user.email == userSignedIn).map((filteredUser, ind) => (
          <ul key={ind} style={{marginTop:'45px'}}>
            <li>{filteredUser.email}</li>
            <li>{filteredUser.username}</li>
            <li style={{color: 'silver'}}>Last Login: {new Date(filteredUser.last_login).getHours() + ":" + new Date(filteredUser.last_login).getMinutes() + ", " + new Date(filteredUser.last_login).toDateString()}</li>
            <li style={{color: 'silver'}}>Date Joined: {new Date(filteredUser.date_joined).getHours() + ":" + new Date(filteredUser.date_joined).getMinutes() + ", " + new Date(filteredUser.date_joined).toDateString()}</li>
            
          </ul>
        ))}
        </div>
      </div>

    </div>
  )
}

export default Profile