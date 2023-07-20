import axios from 'axios';
import cookie from 'react-cookies'
import {config} from '../Setting/config'
import {errorCode} from './Error'
import {refreshXToken,xRefreshTokenName,xTokenName} from './Auth'
import {eventBus,eventName} from './EventBus';

const xToken = cookie.load(xTokenName)

const base_URL_Auth = config.base_URL_Auth
const base_URL_User = config.base_URL_User
const base_URL_House = config.base_URL_House
const base_URL_Collect = config.base_URL_Collect
const base_URL_Company = config.base_URL_Company

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

const CompanyAxios = axios.create({
    baseURL: base_URL_Company,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const AuthAxios = axios.create({
    baseURL: base_URL_Auth,
    // timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

async function refreshTokenAndNotify(error){
    const result = await refreshXToken()
    const originalRequest = error.config;
    const xToken = result.message
    originalRequest._retry = true;
    originalRequest.headers[xTokenName] = xToken;
    if(result.errorCode === errorCode.isOk){
        eventBus.emit(eventName.changeAccessToken, xToken); // 触发事件
    }else{
        eventBus.emit(eventName.resetAccount, ''); // 触发事件
    }
    return originalRequest;
}



const axiosAll = [LoginRegisterAxios,PicAnnexAxios,HouseAxios,UserAxios,CollectAxios,CompanyAxios,AuthAxios]

for(let i = 0 ;i<axiosAll.length;i++){
    axiosAll[i].interceptors.response.use(
    (response) => {
      // 对响应数据做一些处理
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const xRefreshToken = cookie.load(xRefreshTokenName) 
        if(xRefreshToken!== null && xRefreshToken!== undefined){
            const originalRequest = await refreshTokenAndNotify(error)
            return axiosAll[i](originalRequest);
        }
        else {
            eventBus.emit(eventName.resetAccount, ''); // 触发事件
            return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
}

// UserAxios.interceptors.response.use(
//     (response) => {
//       // 对响应数据做一些处理
//       return response;
//     },
//     async (error) => {
//       if (error.response && error.response.status === 401) {
//         const xRefreshToken = cookie.load(xRefreshTokenName) 
//         if(xRefreshToken!== null && xRefreshToken!== undefined){
//             const originalRequest = await refreshTokenAndNotify(error)
//             return UserAxios(originalRequest);
//         }
//         else {
//             eventBus.emit(eventName.resetAccount, ''); // 触发事件
//             return Promise.reject(error);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
  
  


export {LoginRegisterAxios, HouseAxios, UserAxios, PicAnnexAxios, CollectAxios, CompanyAxios,AuthAxios}

