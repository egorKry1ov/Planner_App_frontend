import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import './Form.css'

function Login({setUserSignedIn, setAccessToken}) {
   
    const navigate = useNavigate()
    const loginEndpoint = 'api/token/'

    const [formInfo, setFromInfo] = useState({email:'', password:''})
    const [networkErrMsg, setNetworkErrMsg] = useState(null)
    const [clientErrMsg, setClientErrMsg] = useState(null)

    const statusCodeToErr = (responseObj) => {
        setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
    }

    const clientFormValidation = (formInfo) => {
        const blankFields = Object.entries(formInfo)
                                  .filter(kv => kv[1] === '')
        if (blankFields.length > 0) {
            setClientErrMsg(`${blankFields[0][0]} can not be blank`)
            return false
        }
        setClientErrMsg(null)
        return true
    }

    const handleChange = (e) => {
        setFromInfo({...formInfo, [e.target.id]: e.target.value})
    }
  
    const handleLogin = (e) => {
        e.preventDefault()

        setNetworkErrMsg(null)

        if (!clientFormValidation(formInfo)) {
            return
        }
        
        const apiUrl = process.env.REACT_APP_API_URL
        
        fetch( apiUrl + loginEndpoint, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(formInfo)
                }
        )
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    statusCodeToErr(res)
                    return Promise.resolve(null)
                }
            })
            .then(data => {
                if (!data) {
                    console.log(`problem with network request: ${networkErrMsg}`)
                } else {
                    setUserSignedIn(formInfo.email)
                    setAccessToken(data.access)
                    localStorage.setItem('access_token', data.access)
                    localStorage.setItem('user', formInfo.email)
                    localStorage.setItem('refresh_token', data.refresh)
                    navigate('/calendar')
                    
                }
            })
    }

    return (
    <div style={{backgroundColor:'rgb(207, 232, 250)'}} className='body'>
        <div className='center'>
            <i className="bi bi-person-circle fa-3x"></i>
                <form  onSubmit={handleLogin}>
                    <div className='txt_field'>
                        <input id="email" name="email" type="text" onChange={handleChange} required/>
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className='txt_field'>
                        <input id="password" name="username" type="password" onChange={handleChange} required/>
                        <span></span>
                        <label>Password</label>
                    </div>
                        <input type="submit" Value="Login"></input>
                        <div className='signup_link'>Not a member? <Link to="/signup">Register</Link></div>
                </form>
                <p>{networkErrMsg}</p>
                <p>{clientErrMsg}</p>

        </div>
    </div>
    );
}

export default Login;