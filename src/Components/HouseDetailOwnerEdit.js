import React, {useEffect, useState} from 'react';
import cookie from 'react-cookies'
import {
    useParams
  } from "react-router-dom";
import HouseUpload from "./HouseUpload";
import {HouseAxios} from './axiosApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile,backPage,isMobile} from './CommonUtil'
import {getPersonalInfo} from './Auth'
import {Button} from "antd";

const houseListUrl = 'house/getHouse'

const HouseDetailOwnerEdit = (prop) => {
    const { id,owner } = useParams();
    const [init, setInit] = useState(true);
    const [isShow, setIsShow ] = useState(false);
    const [house, setHouse ] = useState(null);
    const [isShowBackBtn, setIsShowBackBtn] = useState(false)

    const getHouse = () => {
        let reqUrl = `${houseListUrl}?id=${id}&&isDelete=false`
        HouseAxios.get(
            reqUrl,{}
        )
        .then( (response) => {
            if(response.data.data){
                console.log(response.data.data)
                setHouse(response.data.data)
                setIsShow(true);
            }else{
                toast.error("取得資料錯誤")
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
            if(xToken){
                getPersonalInfo(xToken).then( (userResponse) => {
                    if(userResponse.data.data !== undefined){
                        const user = userResponse.data.data
                        let isAdmin = false;
                        for(let i = 0 ;i<user.roles.length;i++){
                            if(user.roles[i] === 1){
                                isAdmin = true
                            }
                        }
                        if(user._id === owner || isAdmin === true){
                            getHouse()
                        }else{
                            alert('您不是負責人無法編輯')
                        }
                    }
                })
                .catch( (error) => {
                })
            }else{
                alert('請先登入')
            }
            if(isMobile()){
                setIsShowBackBtn(true)
            }
            setInit(false)
            
            
        }
    }, )
    return (
       <div>
        <ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>
            {
                isShowBackBtn?(<Button type="primary" onClick={() => backPage()} style={{width: '70px' }}>返回</Button>):null    
            }
           {
               isShow?(<HouseUpload defaultValue = {house} setId = {id}></HouseUpload>):null
           } 
       </div>
    );
};

export default HouseDetailOwnerEdit;
