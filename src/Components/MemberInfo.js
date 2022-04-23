import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
const userListUrl = 'user/getPersonalInfo'

const MemberInfo = () => {
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({});
    const [isEdit, seIsEdit] = useState(false);
    const [roles, setRoles] = useState([]);
    const [salesLicense, setSalesLicense] = useState('');
    const [salesScope, setSalesScope] = useState('');
    const [gender, setGender] = useState([]);
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
        setUser(response.data.data)
        setData(response.data.data)
    })
    .catch( (error) => message.error(error, 3))
}

function setData(data){
    setRolesAction(data.roles)
    setGender(data.gender)
    if(data.rolesInfo.sales){
        if(data.rolesInfo.sales){
            if(data.rolesInfo.sales.license){
                setSalesLicense(data.rolesInfo.sales.license)
            }
            if(data.rolesInfo.sales.scope){
                let scope = ''
                for(let i = 0 ;i<data.rolesInfo.sales.scope.length;i++){
                    if(i === 0){
                        scope = scope + data.rolesInfo.sales.scope[i].city + ' ' +data.rolesInfo.sales.scope[i].area
                    }else{
                        scope = scope + ',' + data.rolesInfo.sales.scope[i].city + ' ' +data.rolesInfo.sales.scope[i].area
                    }
                    
                }
                setSalesScope(scope)
            }
        }
    }
}

function setRolesAction(data){
    const result = []
    for(let i = 1;i<data.length;i++){
        result.push(''+data[i])
    }
    console.log(result)
    setRoles(result)
}

function changeRoles(e){
    setRoles(e)
}

function changeGender(e){
    setGender(e.target.value)

}
function edit(){
    seIsEdit(true)
}

function cancelEdit(){
    seIsEdit(false)
}

    return (

        <div>
            <div Style='float:right'>
            {isEdit?(
                    <div>
                    <Button type="primary" onClick={() => edit()} style={{width: '70px',backgroundColor : '#00cc00' }}>
                        提交
                    </Button>
                    &nbsp; 
                    <Button type="primary" onClick={() => cancelEdit()} danger style={{width: '70px'}}>
                        取消
                    </Button>
                    </div>
                    ): <Button type="primary" onClick={() => edit()} style={{width: '70px',backgroundColor : '#00cc00' }}>
                        編輯
                    </Button>
}
                </div>
            <br/><br/>
            <Divider>基本資料</Divider>
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
                }}>
                <br/>
                <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    帳號:&nbsp;{user.account}<br/><br/>
                    姓名:&nbsp;{user.name}<br/><br/>
                    性別:
                    &nbsp; &nbsp;
                    <Radio.Group  value={gender} onChange={changeGender}>
                        {
                            isEdit?( <Radio value={true}>男</Radio>): <Radio disabled value={true}>男</Radio>
                        }
                        {
                            isEdit?( <Radio value={false}>女</Radio>): <Radio disabled value={false}>女</Radio>
                        }
                        
                    </Radio.Group>
                    <br/><br/>
                    地址:&nbsp;{user.address}<br/><br/>
                    信箱:&nbsp;{user.mail}<br/><br/>
                    電話:&nbsp;{user.phone}<br/><br/>
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            
            <Divider>房仲資料</Divider>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                }}>
                <br/>
                <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    License:&nbsp;{salesLicense}<br/><br/>
                    負責區域:&nbsp;{salesScope}<br/><br/>
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            
        </div>
    );
};

export default MemberInfo;
