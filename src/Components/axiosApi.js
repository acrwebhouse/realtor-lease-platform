import axios from 'axios';
import cookie from 'react-cookies'
// import jwt_decode from "jwt-decode";
// import cookie from "react-cookies";


const xToken = cookie.load('x-token')

const base_URL_Auth = "http://35.201.152.0:3000/"
const base_URL_User = "http://35.201.152.0:4000/"
const base_URL_House = "http://35.201.152.0:5000/"
// export default axios.create({
//     baseURL: base_URL_User || base_URL_House,
//     // timeout: 1000,
//     headers: { 'Content-Type': 'application/json' }
// });

// const XToken = cookie.load('x-token')
// console.log(XToken)


const LoginRegisterAxios = axios.create({
    baseURL: base_URL_Auth,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const PicAnnexAxios = axios.create({
    baseURL: base_URL_House,
    // timeout: 1000,
    headers: {
        "content-type": "multipart/form-data",
        "accept": "application/json",
        "x-token" : xToken,
        // "x-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"
    }
})

const HouseAxios = axios.create({
    baseURL: base_URL_House,
    // timeout: 1000,
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "x-token" : xToken,
        // "x-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"
    }
})

const UserAxios = axios.create({
    baseURL: base_URL_User,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

export {LoginRegisterAxios, HouseAxios, UserAxios, PicAnnexAxios}

