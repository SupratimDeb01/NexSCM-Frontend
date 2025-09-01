import axios from "axios"; //axios is a promise-based HTTP client for making API calls
import { BASE_URL } from "./apiPaths";



//Here we are using Axios instance for simplifing and centralizing HTTP requests in our React app.
//axios is case sensetive any typo would break the config
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "content-type":"application/json",//tells the server the request body format.
        Accept:"application/json",//tells the server what format you expect back.
    },
});
//request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;//Bearer is a token type defined in the OAuth 2.0 standard.
    }
    return config;
},
(error) =>{
    return Promise.reject(error);
}
);

//response interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
    return response;
},
(error) =>{
    if(error.response){
        if(error.response.status === 400){
            window.location.href="/";
        }
        else if(error.response.status === 500){
            console.error("Server error. Try again later.");
    } 
}
        else if(error.code === "ECONNABORTED"){
            console.error("Request Timeout. Try again later.");
    }
        return Promise.reject(error);
}
)

//Why Use Axios Instance?
//DRY (Don’t Repeat Yourself): avoids repeating base URLs and headers in every request.
//Central control: if your API path or headers change, update it once here.
//Makes it easier to handle authentication, timeouts, etc., consistently.

export default axiosInstance;