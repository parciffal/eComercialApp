import axios from "axios";

const ApiManager = axios.create({
    baseURL: "http://192.168.0.18:18000/",
    responseType: 'json',
    withCredentials: true,
});

export default ApiManager;