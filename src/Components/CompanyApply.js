import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
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

    function showCompanyListUI(){
        const xToken = cookie.load('x-token')
        props.changeUserMenu(xToken)
        setIsShowCompanyApplyState(false)
        setIsShowCompanyList(true)
    }

    useEffect(() => {
        if (init) {
            if(props.currentEmployeeData !==null && props.currentEmployeeData !==undefined && JSON.stringify(props.currentEmployeeData) !=='{}'){
                setIsShowCompanyApplyState(true)
            }else{
                setIsShowCompanyList(true)
            }
            setInit(false)
        }
    }, )

    return (
        <div>
            {
                isShowCompanyList?(<CompanyList showApplyingUI={showApplyingUI}></CompanyList>):null                        
            }
            {
                isShowCompanyApplyState?(<CompanyApplyState showCompanyListUI={showCompanyListUI} currentEmployeeData={props.currentEmployeeData}></CompanyApplyState>):null             
            }
        </div>
    );
};

export default CompanyApply;
