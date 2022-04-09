import axios from 'axios';

const base_URL_Auth = "http://35.201.152.0:3000/"
const base_URL_User = "http://35.201.152.0:4000/"
const base_URL_House = "http://35.201.152.0:5000/"
// export default axios.create({
//     baseURL: base_URL_User || base_URL_House,
//     // timeout: 1000,
//     headers: { 'Content-Type': 'application/json' }
// });


const LoginRegisterAxios = axios.create({
    baseURL: base_URL_Auth,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const HouseAxios = axios.create({
    baseURL: base_URL_House,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const UserAxios = axios.create({
    baseURL: base_URL_User,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

export {LoginRegisterAxios, HouseAxios, UserAxios}