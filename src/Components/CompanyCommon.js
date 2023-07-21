import axios from 'axios';
import cookie from 'react-cookies'
import {config} from '../Setting/config'
import {CompanyAxios} from './axiosApi'
import {
    message,
} from "antd";
import {showInternelErrorPageForMobile} from './CommonUtil'

const getCurrentEmployee = function(callback){
    let reqUrl = `/employees/getCurrentPersonalEmployeeInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                if(response.data.status === true){
                    callback(true,response.data.data)
                    
                }else{
                    // message.error('員工資訊取得失敗', 3)
                    console.log('員工資訊取得失敗')
                    callback(false)
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                console.log(error)
            })
}
export {getCurrentEmployee}