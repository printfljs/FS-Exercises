import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getList = ()=>{
    const response = axios.get(`${baseUrl}all`)
    return response.then(response=>response.data)
}

const getDetail = (name)=>{
    const response = axios.get(`${baseUrl}name/${name}`)
    return response.then(response=>response.data)
}

const getWeather = (name,APPID)=>{
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${APPID}`)
    return response.then(response=>response.data)
}

export default {getList,getDetail,getWeather}