import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
const userListUrl = 'user/getPersonalInfo'

const MemberInfo = () => {
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({});
    const [isEdit, seIsEdit] = useState(false);
    const [roles, seRoles] = useState([]);
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
        setData(response.data.data)
    })
    .catch( (error) => message.error(error, 3))
}

function setData(data){
    setRoles(data.roles)
}

function setRoles(data){
    const result = []
    for(let i = 1;i<data.length;i++){
        result.push(''+data[i])
    }
    console.log(result)
    seRoles(result)
}

function changeRoles(e){
    console.log(e)
}

    return (

        <div>
            <Divider>基本資料</Divider>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                }}>會員中心</Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            <Row>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}></Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}style={{
                            textAlign: 'center',
                }}>

                    <Checkbox.Group value={roles} onChange={changeRoles}>
                    {
                        isEdit?( <Checkbox value='2'>屋主</Checkbox>): <Checkbox disabled value='2'>屋主</Checkbox>
                    }
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    {
                        isEdit?( <Checkbox  value='3'>一般會員</Checkbox>): <Checkbox disabled value='3'>一般會員</Checkbox>
                    }
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    {
                        isEdit?( <Checkbox value='4'>房仲</Checkbox>): <Checkbox disabled value='4'>房仲</Checkbox>
                    }
                    </Checkbox.Group>
                    
                </Col>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}></Col>  
            </Row>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                }}>{JSON.stringify(user)}</Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            <Divider>房仲資料</Divider>
        </div>
    );
};

export default MemberInfo;
