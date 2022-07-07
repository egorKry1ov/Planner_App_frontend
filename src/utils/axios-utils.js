import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config;
})

axiosInstance.interceptors.response.use(response => {
    return response
},
error => {
    const refresh = localStorage.getItem('refresh_token')
    if(error.response.status == 401){
        return axios.post(`${process.env.REACT_APP_API_URL}api/token/refresh/`, {refresh})
            .then(res => {
                localStorage.setItem('access_token', res.data.access)
                return axiosInstance(error.config)
            })
    }
    return Promise.reject(error)
}) 

export default axiosInstance;