import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import moment from 'moment';
import HousesList from "./HousesList";
import {
    useParams
  } from "react-router-dom";
  import {getCurrentEmployee} from './CompanyCommon'
import 'react-toastify/dist/ReactToastify.css';

const CompanyHouseList = (props) => {
    const [init, setInit] = useState(true);
    const [isShow, setIsShow ] = useState(false);
    useEffect(() => {
        if (init) {
            setInit(false)
            getCurrentEmployee((result,data)=>{
                console.log(data)
                if(result === true){
                    if(data.state === 2)
                    setIsShow(true)
                }
            })
        }
    }, )
    return (
        <div>
            {
               isShow?( <HousesList isCompanyList={true} companyId={props.companyId}></HousesList>):null
           } 
        </div>
    );
};

export default CompanyHouseList;
