import axios from 'axios';
import cookie from 'react-cookies'
import {config} from '../Setting/config'
import {errorCode} from './Error'
import {refreshXToken,xRefreshTokenName,xTokenName} from './Auth'
import {eventBus,eventName} from './EventBus';

const xToken = cookie.load('x-token')

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


UserAxios.interceptors.response.use(
    (response) => {
      // 对响应数据做一些处理
      return response;
    },
    async (error) => {
        console.log('===UserAxios.interceptors====111===')
      if (error.response && error.response.status === 401) {

        // // Token 过期或无效，进行重新请求
        // try {
        //     console.log('===UserAxios.interceptors====222===')
        // //   const response = await refreshAndRetryRequest(error.config);
        // const response ='';
        //   return response;
        // } catch (retryError) {
        //     console.log('===UserAxios.interceptors====3333===')
        //   // 刷新 Token 失败，可能是用户需要重新登录
        //   // 这里可以根据实际情况进行处理
        //   return Promise.reject(retryError);
        // }

        const xRefreshToken = cookie.load(xRefreshTokenName) 
            if(xRefreshToken!== null && xRefreshToken!== undefined){
                const result = await refreshXToken()
                const originalRequest = error.config;
                const xToken = result.message
                originalRequest._retry = true;
                originalRequest.headers[xTokenName] = xToken;
                console.log('======111=======')
                if(result.errorCode === errorCode.isOk){
                    console.log('=====222=====eventName.changeAccessToken===',eventName.changeAccessToken)
                    console.log('=====222=====xToken===',xToken)
                    eventBus.emit(eventName.changeAccessToken, xToken); // 触发事件
                }else{
                    console.log('=====333========')
                    eventBus.emit(eventName.resetAccount, ''); // 触发事件
                }
                return UserAxios(originalRequest);
            }
            else {
                eventBus.emit(eventName.resetAccount, ''); // 触发事件
                return Promise.reject(error);
            }
      }
      // 对其他类型的错误进行处理
      return Promise.reject(error);
    }
  );
  
  


export {LoginRegisterAxios, HouseAxios, UserAxios, PicAnnexAxios, CollectAxios, CompanyAxios,AuthAxios}

