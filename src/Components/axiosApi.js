import axios from 'axios';

const base_URL = "http://35.201.152.0:3000/"

export default axios.create({
    baseURL: base_URL,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});


