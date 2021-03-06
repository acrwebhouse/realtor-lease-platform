import React, {useEffect, useState} from 'react';
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";
import {
    useParams
  } from "react-router-dom";
import HouseUpload from "./HouseUpload";
import {HouseAxios} from './axiosApi'
import {message} from "antd";
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
            setIsShow(true);
            if(response.data.data){
                console.log(response.data.data)
                setHouse(response.data.data)
                setIsShow(true);
            }else{
                message.error("取得資料錯誤", 3)
            }
        })
        .catch( (error) => message.error(error, 3))
    }

    useEffect(() => {
        if (init) {
            const xToken = cookie.load('x-token')
            if(xToken){
                const decodedToken = jwt_decode(xToken);
                console.log(decodedToken)
                if(decodedToken.id === owner){
                    // setIsShow(true);
                    // console.log('map!')
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
           {
               isShow?(<HouseUpload defaultValue = {house} setId = {id}></HouseUpload>):null
           } 
       </div>
    );
};

export default HouseDetailOwnerEdit;
