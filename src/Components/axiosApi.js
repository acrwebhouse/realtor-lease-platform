import axios from 'axios';

const base_URL_User = "http://35.201.152.0:3000/"
const base_URL_House = "http://35.201.152.0:5000/"
// export default axios.create({
//     baseURL: base_URL_User || base_URL_House,
//     // timeout: 1000,
//     headers: { 'Content-Type': 'application/json' }
// });


const LoginRegisterAxios = axios.create({
    baseURL: base_URL_User,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const HouseAxios = axios.create({
    baseURL: base_URL_House,
    // timeout: 1000,
    headers: {
        "content-type": "multipart/form-data",
        "accept": "application/json",
        "x-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"
    }
})

export {LoginRegisterAxios, HouseAxios}