import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";
  import HouseDetail from "./HouseDetail";
const CompanyHouseDetail = (props) => {
    const { id,owner } = useParams();
    const [init, setInit] = useState(true);
    const [isShow, setIsShow ] = useState(false);
    const [isAdmin, setIsAdmin ] = useState(false);

    useEffect(() => {
        if (init) {
            // const xToken = cookie.load('x-token')
            // if(xToken){
            //     const decodedToken = jwt_decode(xToken);
            //     console.log(decodedToken)
            //     for(let i = 0 ;i<decodedToken.roles.length; i++){
            //         if(decodedToken.roles[i] === 1){
            //             setIsAdmin(true)
            //         }
            //     }
            //     if(decodedToken.id === owner){
            //         setIsShow(true);
            //     }else{
            //         alert('您不是負責人無法編輯')
            //     }
            // }else{
            //     alert('請先登入')
            // }
            setIsShow(true)
            setInit(false)
            
            
        }
    }, )
    return (
        <div>
           {
               isShow?(<HouseDetail isOwner = {true} isAdmin = {isAdmin} setId = {id}></HouseDetail>):null
           } 
       </div>

    );
};

export default CompanyHouseDetail;
