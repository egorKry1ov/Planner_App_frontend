import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

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
        
        // console.log(formInfo)
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
                    
                    console.log(data)

                    // setUserSignedIn(data.email)
                    setUserSignedIn(formInfo.email)

                    // add tokens to localstorage here
                    setAccessToken(data.access)

                    localStorage.setItem('access_token', data.access)
                    localStorage.setItem('user', formInfo.email)
                    localStorage.setItem('refresh_token', data.refresh)
                    // redirect here
                    
                    navigate('/')
                    
                }
            })
    }

    return (
    <div>
      <h3>Login</h3>
        <form onSubmit={handleLogin}>
            <label>email:</label>
            <input id="email" name="email" type="text" onChange={handleChange}/>
            <label>password:</label>
            <input id="password" name="username" type="text" onChange={handleChange}/>
            <button type="submit">Login</button>
        </form>
        <p>{networkErrMsg}</p>
        <p>{clientErrMsg}</p>
    </div>
    );
}

export default Login;