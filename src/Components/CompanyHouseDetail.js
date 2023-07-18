import React, {useEffect, useState} from 'react';
import cookie from 'react-cookies'
import {UserAxios,HouseAxios} from './axiosApi'
import {
    useParams
  } from "react-router-dom";
import HouseDetail from "./HouseDetail";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

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
                toast.error('使用者資料獲取失敗')
            }else{
                const companyId = response.data.data.companyId
                const employeesData = response.data.data.employeesData
                let employeePermissionsOk = false;
                let employeeState = 0
                for(let i = 0 ;i<employeesData.length;i++){
                    if(employeesData[i].companyId === companyId){
                        employeeState = employeesData[i].state
                        employeePermissionsOk = true
                        i = employeesData.length
                    }
                }
                if(employeePermissionsOk === true){
                    if(employeeState === 2){
                        checkHousePermissions(companyId)
                    }else if(employeeState === 4){
                        toast.error('您目前為停權狀態，無法觀看公司相關物件。')
                    }else{
                        toast.error('您不是此公司員工，無法觀看此公司相關物件。')
                    }
                }else{
                    toast.error('您不是此公司員工，無法觀看此公司相關物件。')
                }
            }
        })
        .catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }

    const checkHousePermissions = (companyId) => {
        let reqUrl = `${houseListUrl}?id=${id}&&isDelete=false`
        HouseAxios.get(
            reqUrl,{}
        )
        .then( (response) => {
            if(response.data.status === false){
                toast.error('房屋資料獲取失敗')
            }else{
                if(response.data.data.belongType === 2 && response.data.data.belongId === companyId){
                    setIsShow(true)
                }else{
                    toast.error('房屋資料不屬於使用者公司')
                }
                
            }
        })
        .catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }

    useEffect(() => {
        if (init) {
            const xToken = cookie.load('x-token')
            if(xToken === null || xToken === undefined || xToken === ''){
                toast.error('您未登入，無法看到此物件')
            }else{
                checkPermissions()
            }
            setInit(false)
        }
    }, )
    return (
        <div>
            <ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>
           {
               isShow?(<HouseDetail isComapny = {true} setId = {id}></HouseDetail>):null
           } 
       </div>

    );
};

export default CompanyHouseDetail;
