import axios from 'axios';
import cookie from 'react-cookies'
import {config} from '../Setting/config'

const xToken = cookie.load('x-token')

const base_URL_Auth = config.base_URL_Auth
const base_URL_User = config.base_URL_User
const base_URL_House = config.base_URL_House
const base_URL_Collect = config.base_URL_Collect

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
    }
})

const HouseAxios = axios.create({
    baseURL: base_URL_House,
    // timeout: 1000,
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "x-token" : xToken,
    }
})

const UserAxios = axios.create({
    baseURL: base_URL_User,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const CollectAxios = axios.create({
    baseURL: base_URL_Collect,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

export {LoginRegisterAxios, HouseAxios, UserAxios, PicAnnexAxios, CollectAxios}

