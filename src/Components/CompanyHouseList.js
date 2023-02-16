import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import HousesList from "./HousesList";
import {
    useParams
  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyHouseList = (props) => {
    const [init, setInit] = useState(true);
    useEffect(() => {
        if (init) {
            setInit(false)
            props.checkEmployeeStateAndChangeMenu((result)=>{
                if(result === true){
                }else{
                    toast.warning('員工權限變動，請重新進入選單')
                }
            })
        }
    }, )
    return (
        <div>
            <ToastContainer autoClose={2000} position="top-center"/>
            <HousesList isCompanyList={true} companyId={props.companyId}></HousesList>
        </div>
    );
};

export default CompanyHouseList;
