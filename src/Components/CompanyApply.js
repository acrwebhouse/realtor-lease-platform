import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";
import CompanyList from "./CompanyList";
import CompanyApplyState from "./CompanyApplyState";


const CompanyApply = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [isShowCompanyList, setIsShowCompanyList] = useState(false);
    const [isShowCompanyApplyState, setIsShowCompanyApplyState] = useState(false);

    function showApplyingUI(){
        const xToken = cookie.load('x-token')
        props.changeUserMenu(xToken)
        setIsShowCompanyApplyState(true)
        setIsShowCompanyList(false)
    }

    useEffect(() => {
        console.log('====111===')
        if (init) {
            console.log('====222===')
            if(props.currentEmployeeData !==null && props.currentEmployeeData !==undefined && JSON.stringify(props.currentEmployeeData) !=='{}'){
                console.log('====333===',props.currentEmployeeData)
                setIsShowCompanyApplyState(true)
            }else{
                console.log('====444===')
                setIsShowCompanyList(true)
            }
            console.log('====555===')
            setInit(false)
        }
    }, )

    return (
        <div>
            {
                isShowCompanyList?(<CompanyList showApplyingUI={showApplyingUI}></CompanyList>):null           
            }
            {
                isShowCompanyApplyState?(<CompanyApplyState currentEmployeeData={props.currentEmployeeData}></CompanyApplyState>):null             
            }
        </div>
    );
};

export default CompanyApply;
