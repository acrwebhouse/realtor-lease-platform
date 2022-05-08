import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";

const userListUrl = 'user/getPersonalInfo'
const editUserUrl = 'user/editUser'

const MemberInfo = () => {
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({});
    const [isEdit, seIsEdit] = useState(false);
    const [roles, setRoles] = useState([]);
    const [salesLicense, setSalesLicense] = useState('');
    const [salesScope, setSalesScope] = useState('');
    const [gender, setGender] = useState([]);
    const [isShowExtraData, setIsShowExtraData] = useState(false);
    const [editUser, setEditUser] = useState({});
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
            setIsShowExtraData(true)
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
    for(let i = 0;i<data.length;i++){
        if(data[i] === 2 ||data[i] === 3 ||data[i] === 4 ){
            result.push(''+data[i])
        }
        
    }
    setRoles(result)
}

function changeRoles(e){
    setRoles(e)
    const value = []
    let showExtra = false
    const decodedToken = jwt_decode(xToken);
    console.log(decodedToken)
    const roles = decodedToken.roles
    for(let i = 0 ;i<roles.length; i++){
        if(roles[i] === 1){
            value.push(1)
        }
    }

    for(let i = 0 ;i<e.length; i++){
        value.push(e[i]*1)
        if(e[i] == '2' ||e[i] == '4'){
            showExtra = true
        }
    }

    setIsShowExtraData(showExtra)

    const editUserValue = editUser
    editUserValue.roles = value
    setEditUser(editUserValue)

}

function changeGender(e){
    const value = e.target.value
    const editUserValue = editUser
    editUserValue.gender = value
    setGender(value)
    setEditUser(editUserValue)

}
function edit(){
    const baseDiv = document.getElementById('baseDiv')
    const extraDiv = document.getElementById('extraDiv')
    baseDiv.style.width = '320px'
    extraDiv.style.width = '320px'
    seIsEdit(true)
    setEditUser(JSON.parse(JSON.stringify(user)))
}

function cancelEdit(){
    const baseDiv = document.getElementById('baseDiv')
    const extraDiv = document.getElementById('extraDiv')
    baseDiv.style.width = null
    extraDiv.style.width = null
    seIsEdit(false)
    setData(user)
    setEditUser({})
}

function sendEdit(){
    const decodedToken = jwt_decode(xToken);
    editUser.id = decodedToken.id
    let reqUrl = `${editUserUrl}`
    UserAxios.put(
        reqUrl,editUser,{
            headers:{
                'x-Token':xToken
            }
        }
    )
    .then( (response) => {
        if(response.data.status === true){
            console.log(response.data)
            setUser(editUser)
            setData(editUser)
            seIsEdit(false)
            const token = response.data.data.token
            const roles = response.data.data.roles
            cookie.save('x-token',token,{path:'/'})
            message.success('編輯成功', 3);
        }else{
            message.error(response.data.data, 3)
        }
    })
    .catch( (error) => message.error(error, 3))


}

function editName(e){
    const editUserValue = editUser
    editUserValue.name = e.target.value
    setEditUser(editUserValue)
}

function editAddress(e){
    const editUserValue = editUser
    editUserValue.address = e.target.value
    setEditUser(editUserValue)
}

function editPhone(e){
    const editUserValue = editUser
    editUserValue.phone = e.target.value
    setEditUser(editUserValue)
}

function editLicense(e){
    const editUserValue = editUser
    if(editUserValue.rolesInfo.sales){
        editUserValue.rolesInfo.sales.license = e.target.value
        setEditUser(editUserValue)
    }
}

    return (

        <div>
            <div Style='float:right'>
            {isEdit?(
                    <div>
                    <Button type="primary" onClick={() => sendEdit()} style={{width: '70px',backgroundColor : '#00cc00' }}>
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
                <div id='baseDiv' style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    帳號:&nbsp;{user.account}<br/><br/>
                    {isEdit?( <div >姓名:&nbsp;<Input onChange={editName} style={{ width: '80%' }} defaultValue={user.name}></Input></div>): <div>姓名:&nbsp;{user.name}</div> }
                    <br/>
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
                    {isEdit?( <div >地址:&nbsp;<Input onChange={editAddress} style={{ width: '80%' }} defaultValue={user.address}></Input></div>): <div>地址:&nbsp;{user.address}</div> }
                    <br/>
                    <div>信箱:&nbsp;{user.mail}</div> 
                    <br/>
                    {isEdit?( <div >電話:&nbsp;<Input onChange={editPhone} style={{ width: '80%' }} defaultValue={user.phone}></Input></div>): <div>電話:&nbsp;{user.phone}</div> }
                    <br/>
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            

            {
            isShowExtraData?(<div>
            <Divider>房仲資料</Divider>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                }}>
                <br/>
                <div id='extraDiv' style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    {isEdit?( <div >License:&nbsp;&nbsp;<Input onChange={editLicense} style={{ width: '80%' }} defaultValue={salesLicense}></Input></div>): <div>License:&nbsp;{salesLicense}</div> }
                    <br/>
                    {isEdit?( <div >負責區域:&nbsp;<Input style={{ width: '80%' }} defaultValue={''}></Input></div>): <div>負責區域:&nbsp;{salesScope}</div> }
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            </div>):null 
            }
        </div>
    );
};

export default MemberInfo;
