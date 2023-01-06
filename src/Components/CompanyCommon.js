import axios from 'axios';
import cookie from 'react-cookies'
import {config} from '../Setting/config'
import {CompanyAxios} from './axiosApi'
import {
    message,
} from "antd";

const getCurrentEmployee = function(callback){
    let reqUrl = `/employees/getCurrentPersonalEmployeeInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            })
            .then( (response) => {
                if(response.data.status === true){
                    callback(true,response.data.data)
                    
                }else{
                    message.error('員工資訊取得失敗', 3)
                    callback(false)
                }
            })
            .catch( (error) => message.error(error, 3))
}
export {getCurrentEmployee}