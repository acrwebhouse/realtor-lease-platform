import React, {useEffect, useState} from 'react';
import HousesList from "./HousesList";
import cookie from 'react-cookies'
import {getPersonalInfo,xTokenName} from './Auth'
import {showInternelErrorPageForMobile} from './CommonUtil'
import {CompanyAxios} from "./axiosApi";
import {toast} from "react-toastify";

let dealOptions = []
let dealUserId = []
const MyHousesList = () => {
    const xToken = cookie.load(xTokenName)
    const [init, setInit] = useState(true);
    const [isShowHousesList, setIsShowHousesList] = useState(false);
    const [user, setUser] = useState(true);


    useEffect(() => {
        if (init) {
            setInit(false)
            console.log('init')
            getPersonalInfo(xToken).then( (userResponse) => {
                if(userResponse.data.data !== undefined){
                     setUser(userResponse.data.data)
                     setIsShowHousesList(true)
                }
                })
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    // toast.error(error)
                })
            getCompanyEmployeeInfo()
        }
    }, )
    function getCompanyEmployeeInfo(){
        let reqUrl = `/employees/getPersonalEmployeesInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    console.log(response.data.data[0])
                    for (let i = 0; i< response.data.data.length; i++) {
                        if((!response.data.data[i].isResign) && response.data.data[i].state ===2 ) {
                            getCompanyEmployeesList(response.data.data[i].companyId, response.data.data[i].userData[0].name)
                            // resolveCompanyEmployee(response.data.data)
                        }

                    }
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    const getCompanyEmployeesList = (companyId, salesName) => {
        let reqUrl = `employees/getEmployeesListByCompanyId`
        reqUrl += `?companyId=`+ companyId
        console.log(reqUrl)
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    console.log(response.data.data)
                    // resolveCompanyEmployee(response.data.data)
                    // setCompanyEmployees(response.data.data)
                    dealOptions.splice(0, dealOptions.length)
                    dealUserId.splice(0, dealUserId.length)
                    for (let i = 0; i< response.data.data.length; i++) {
                        if((!response.data.data[i].isResign) && response.data.data[i].state ===2 ) {
                            console.log(response.data.data[i].userId)
                            if(salesName !== response.data.data[i].userData[0].name) {
                                dealOptions.push({value : `${response.data.data[i].userData[0].name}`, label : `${response.data.data[i].userData[0].name}`})
                                dealUserId.push({userId: `${response.data.data[i].userId}`})
                            }
                        }
                    }
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    console.log(dealOptions, dealUserId)

    return ( 
        <div>
            {
                isShowHousesList?(<HousesList owner={user._id} 
                                              roles={user.roles} 
                                              rank={user.employeesData[0].rank}
                                              dealOptions={dealOptions}
                                              dealUserId={dealUserId}
                ></HousesList>):null
            }
        </div>
    );
};

export default MyHousesList;
