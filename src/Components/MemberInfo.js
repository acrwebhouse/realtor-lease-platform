import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
const userListUrl = 'user/getPersonalInfo'

const MemberInfo = () => {
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({});
    const xToken = cookie.load('x-token')

    useEffect(() => {
        if (init) {
            setInit(false)
            getPersonalInfo()
            
        }
    }, )
const getPersonalInfo = () => {
    let reqUrl = `${userListUrl}`
    UserAxios.get(
        reqUrl,{
            headers:{
                'x-Token':xToken
            }
        }
    )
    .then( (response) => {
        console.log(response)
        setUser(response)
    })
    .catch( (error) => message.error(error, 3))
}

    return (

        <div>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                }}>會員中心</Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                }}>{JSON.stringify(user)}</Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
        </div>
    );
};

export default MemberInfo;
