import React, {useEffect, useState} from 'react';
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";
import {
    useParams
  } from "react-router-dom";
import HouseUpload from "./HouseUpload";
import {HouseAxios} from './axiosApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const houseListUrl = 'house/getHouse'


const HouseDetailOwnerEdit = (prop) => {
    const { id,owner } = useParams();
    const [init, setInit] = useState(true);
    const [isShow, setIsShow ] = useState(false);
    const [house, setHouse ] = useState(null);

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
        .catch( (error) => toast.error(error))
    }

    useEffect(() => {
        if (init) {
            const xToken = cookie.load('x-token')
            if(xToken){
                const decodedToken = jwt_decode(xToken);
                let isAdmin = false;
                for(let i = 0 ;i<decodedToken.roles.length;i++){
                    if(decodedToken.roles[i] === 1){
                        isAdmin = true
                    }
                }
                if(decodedToken.id === owner || isAdmin === true){
                    getHouse()
                }else{
                    alert('您不是負責人無法編輯')
                }
            }else{
                alert('請先登入')
            }
            setInit(false)
            
            
        }
    }, )
    return (
       <div>
        <ToastContainer autoClose={2000} position="top-center"/>
           {
               isShow?(<HouseUpload defaultValue = {house} setId = {id}></HouseUpload>):null
           } 
       </div>
    );
};

export default HouseDetailOwnerEdit;
