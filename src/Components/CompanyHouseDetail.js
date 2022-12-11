import React, {useEffect, useState} from 'react';
import { message} from "antd";
import cookie from 'react-cookies'
import {UserAxios,HouseAxios} from './axiosApi'
import {
    useParams
  } from "react-router-dom";
  import HouseDetail from "./HouseDetail";
const CompanyHouseDetail = (props) => {
    const { id } = useParams();
    const [init, setInit] = useState(true);
    const [isShow, setIsShow ] = useState(false);
    const userListUrl = 'user/getPersonalInfo'
    const houseListUrl = 'house/getHouse'

    const checkPermissions = () => {
        const xToken = cookie.load('x-token')
        let reqUrl = `${userListUrl}`
        UserAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
        .then( (response) => {
            if(response.data.status === false){
                message.error('使用者資料獲取失敗', 3)
            }else{
                const companyId = response.data.data.companyId
                const employeesData = response.data.data.employeesData
                let employeePermissionsOk = false;
                for(let i = 0 ;i<employeesData.length;i++){
                    if(employeesData[i].companyId === companyId){
                        if(employeesData[i].state === 2){
                            employeePermissionsOk = true
                            i = employeesData.length
                        }
                    }
                }
                if(employeePermissionsOk === true){
                    checkHousePermissions(companyId)
                }else{
                    message.error('員工權限不足', 3)
                }
            }
        })
        .catch( (error) => message.error(error, 3))
    }

    const checkHousePermissions = (companyId) => {
        let reqUrl = `${houseListUrl}?id=${id}&&isDelete=false`
        HouseAxios.get(
            reqUrl,{}
        )
        .then( (response) => {
            if(response.data.status === false){
                message.error('房屋資料獲取失敗', 3)
            }else{
                if(response.data.data.belongType === 2 && response.data.data.belongId === companyId){
                    setIsShow(true)
                }else{
                    message.error('房屋資料不屬於使用者公司', 3)
                }
                
            }
        })
        .catch( (error) => message.error(error, 3))
    }

    useEffect(() => {
        if (init) {
            checkPermissions()
            setInit(false)
        }
    }, )
    return (
        <div>
           {
               isShow?(<HouseDetail isComapny = {true} setId = {id}></HouseDetail>):null
           } 
       </div>

    );
};

export default CompanyHouseDetail;
