import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {CompanyAxios} from './axiosApi'
import {
    useParams
  } from "react-router-dom";



const CompanyApplyList = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [applyList , setApplyList] = useState([]);
    const getCompanyApplyListUrl = '/employees/getEmployeesListByCompanyId'

    useEffect(() => {
        if (init) {
            // if(props.currentEmployeeData !==null && props.currentEmployeeData !==undefined && JSON.stringify(props.currentEmployeeData) !=='{}'){
            //     setIsShowCompanyApplyState(true)
            // }else{
            //     setIsShowCompanyList(true)
            // }
            getCompanyApplyList()
            setInit(false)
        }
    }, )

    const [getCompanyApplyListArg] = useState({
        start : '0',
        count : '9999999',
        states : '1',
    });

    function getCompanyApplyList(){
        const xToken = cookie.load('x-token')
        let reqUrl = `${getCompanyApplyListUrl}?companyId=${props.currentEmployeeData.companyId}&&start=${getCompanyApplyListArg.start}&&count=${getCompanyApplyListArg.count}&&states=${getCompanyApplyListArg.states}`
        CompanyAxios.get(
                reqUrl,{
                    headers:{
                        'x-Token':xToken
                    }
                })
            .then( (response) => {
                console.log('===getCompanyApplyList=====')
                console.log(response)
                if(response.data.status === true){
                    setApplyList(response.data.data)
                }else{
                    message.error('抓取公司審核列表失敗', 3)
                }
            })
            .catch( (error) => message.error(error, 3))
    }

    return (
        <div>
            <Divider>審核列表</Divider>
            {JSON.stringify(applyList)}
            CompanyApplyList page
            
        </div>
    );
};

export default CompanyApplyList;
