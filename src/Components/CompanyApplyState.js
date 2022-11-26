import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import {CompanyAxios} from './axiosApi'
import {
    useParams
  } from "react-router-dom";

const CompanyApplyState = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const cancelApplyEmployeesUrl = '/employees/cancelApplyEmployees'

    useEffect(() => {
        if (init) {
            setInit(false)
        }
    }, )

    function cancelApply(){
        const xToken = cookie.load('x-token')
        let reqUrl = `${cancelApplyEmployeesUrl}`
        let body = {
            id: '',
        }
        if(props.currentEmployeeData !== undefined){
            body.id = props.currentEmployeeData._id
        }
        CompanyAxios.put(reqUrl, body, {
            headers:{
                'x-Token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                props.showCompanyListUI()
            }else{
                message.error('取消失敗', 3)
            }
        }).catch( (error) => message.error(error, 3))
    }

    return (
        <div>
            {'CompanyApplyState page'}
            {JSON.stringify(props.currentEmployeeData)}
            <Button type="primary" onClick={() => cancelApply()} style={{width: '100px' }}>
                        取消申請
            </Button>
        </div>
    );
};

export default CompanyApplyState;
