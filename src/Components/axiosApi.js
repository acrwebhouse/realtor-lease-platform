import axios from 'axios';
import cookie from 'react-cookies'
import {config} from '../Setting/config'
import {errorCode} from './Error'
import {refreshXToken,xRefreshTokenName,xTokenName} from './Auth'

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

// UserAxios.interceptors.request.use(
//     (config) => {
//       // Add authentication token to the request if available
//     //   const token = 'your_auth_token';
//     //   if (token) {
//     //     config.headers['Authorization'] = `Bearer ${token}`;
//     //   }
//         const xToken = cookie.load(xTokenName)
//         if(config.headers[xTokenName] !== null && config.headers[xTokenName] !== undefined ){

//         }else{
//             return config;
//         }
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

/*
// 添加响应拦截器
UserAxios.interceptors.response.use(
    (response) => {
        const data = response.data
        console.log('=====UserAxios.interceptors===response==0=',response)
        console.log('=====UserAxios.interceptors===errorCode.accessTokenInvalid===',errorCode.accessTokenInvalid)
        console.log('=====UserAxios.interceptors===data.errorCode===',data.errorCode)
        if(data.errorCode === errorCode.accessTokenInvalid){
            const xRefreshToken = cookie.load(xRefreshTokenName) 
            if(xRefreshToken!== null && xRefreshToken!== undefined){
                refreshXToken().then(xToken => {
                    console.log('======1111===response.config=xToken=',xToken)
                    const originalRequest = response.config;
                    originalRequest._retry = true;
                    originalRequest.headers[xTokenName] = ''
                    // console.log('===originalRequest.headers[xTokenName]==1111==',originalRequest.headers[xTokenName])
                    // // originalRequest.headers[xTokenName] = xToken;
                    originalRequest.headers[xTokenName] = xToken;
                    // originalRequest.headers[xTokenName] = '123456';
                    // console.log('===originalRequest.headers[xTokenName]==222==',originalRequest.headers[xTokenName])

                    console.log('======originalRequest=',originalRequest)
                    return UserAxios(originalRequest);
                  })
                  .catch(error => {
                    console.log('======2222=====')
                    console.log('refreshXToken error :',error)
                    // window.location.href = '/';
                    return response;
                  });
            }
            else {
                console.log('======333333=====')
                // window.location.href = '/';
                return response;
            }
            // console.log('=====UserAxios.interceptors.response==111=')
            // const originalRequest = response.config;
            // originalRequest._retry = true;
            // history.push('/'); 
            
            // return UserAxios(originalRequest);
        }else{
            console.log('=====UserAxios.interceptors.response==222=')
            return response;
        }

      // 对响应数据做一些处理
      
    },{}
  );

*/  
  
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
                const xToken = await refreshXToken()
                const originalRequest = error.config;
                    originalRequest._retry = true;
                    originalRequest.headers[xTokenName] = xToken;
                    return UserAxios(originalRequest);
                // refreshXToken().then(xToken => {
                //     console.log('======1111===response.config=xToken=',xToken)
                //     const originalRequest = error.config;
                //     originalRequest._retry = true;
                //     originalRequest.headers[xTokenName] = ''
                //     // console.log('===originalRequest.headers[xTokenName]==1111==',originalRequest.headers[xTokenName])
                //     // // originalRequest.headers[xTokenName] = xToken;
                //     originalRequest.headers[xTokenName] = xToken;
                //     // originalRequest.headers[xTokenName] = '123456';
                //     // console.log('===originalRequest.headers[xTokenName]==222==',originalRequest.headers[xTokenName])

                //     console.log('======originalRequest=',originalRequest)
                //     return UserAxios(originalRequest);
                //   })
                //   .catch(error => {
                //     console.log('======2222=====')
                //     console.log('refreshXToken error :',error)
                //     // window.location.href = '/';
                //     return Promise.reject(error);
                //   });
            }
            else {
                console.log('======333333=====')
                // window.location.href = '/';
                return Promise.reject(error);
            }
      }
      // 对其他类型的错误进行处理
      return Promise.reject(error);
    }
  );
  
  


export {LoginRegisterAxios, HouseAxios, UserAxios, PicAnnexAxios, CollectAxios, CompanyAxios,AuthAxios}

