import cookie from 'react-cookies'
import {AuthAxios,UserAxios} from './axiosApi'
import {errorCode} from './Error'


const xTokenName = 'x-token'
const xRefreshTokenName = 'x-refresh-token'

const refreshXToken = () => {
    return new Promise((resolve, reject) => {
        const result ={
            errorCode : errorCode.isOk,
            message : ''
        }
        const xRefreshToken = cookie.load(xRefreshTokenName)
        const refreshAccessTokenUrl = '/auth/refreshAccessToken'
        if(xRefreshToken!== null && xRefreshToken!== undefined){
            const body = {
                refreshToken:xRefreshToken
            }
            AuthAxios.put(refreshAccessTokenUrl, body,{})
            .then((response) => {
                const data = response.data
                const accessToken = data.data.accessToken
                if(data.errorCode === errorCode.isOk && accessToken){
                    saveAccessToken(accessToken)
                    result.message = accessToken
                    resolve(result)
                }else{
                    removeToken()
                    result.errorCode = data.errorCode
                    reject(result)
                }
                
            }).catch( (error) => {
                removeToken()
                result.errorCode = errorCode.unKnowError
                result.message = error
                reject(result)
            })   
        }else{
            removeToken()
            result.errorCode = errorCode.refreshTokenInvalid
            reject(result)
        }
      });
}

const removeToken = () => {
    cookie.remove(xTokenName)
    cookie.remove(xRefreshTokenName)
}

const saveAccessToken = (accessToken) => {
    const accessTokenDate = new Date();
    accessTokenDate.setTime(accessTokenDate.getTime() + (3600000)); //one week
    cookie.save(xTokenName,accessToken,{path:'/', expires: accessTokenDate})
}

const saveToken = (accessToken,refreshToken) => {
    const accessTokenDate = new Date();
    accessTokenDate.setTime(accessTokenDate.getTime() + (3600000)); //one week
    const refreshTokenDate = new Date();
    refreshTokenDate.setTime(refreshTokenDate.getTime() + (86400*7*1000)); //one month
    cookie.save(xTokenName,accessToken,{path:'/', expires: accessTokenDate})
    cookie.save(xRefreshTokenName,refreshToken,{path:'/', expires: refreshTokenDate})
}

const getPersonalInfo = (xToken) => {
    return new Promise((resolve, reject) => {
        const userListUrl = 'user/getPersonalInfo'
        let reqUrl = `${userListUrl}`
        UserAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
        .then( (response) => {
            if(response.data.data !== undefined){
                if(response.data.data.bornDate === undefined || response.data.data.bornDate === null ){
                    response.data.data.bornDate = ''
                }
                resolve(response)
            }else{
                reject(response)
            }
        })
        .catch( (error) => {
            reject(error)
        })
    })
}
export {refreshXToken,removeToken,saveToken,xTokenName,xRefreshTokenName,getPersonalInfo}