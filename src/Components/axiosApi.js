import axios from "axios"


const instance = axios.create({
    baseURL: 'http://35.201.152.0:',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
    }
)