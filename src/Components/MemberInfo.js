import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';

const userListUrl = 'user/getPersonalInfo'
const editUserUrl = 'user/editUser'

const MemberInfo = (props) => {
    const dateFormat = 'YYYY/MM/DD';
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({});
    const [isEdit, seIsEdit] = useState(false);
    const [roles, setRoles] = useState([]);
    const [salesLicense, setSalesLicense] = useState('');
    const [salesScope, setSalesScope] = useState('');
    const [gender, setGender] = useState([]);
    const [isShowExtraData, setIsShowExtraData] = useState(false);
    const [editUser, setEditUser] = useState({});
    const [editDate, setEditDate] = useState(moment('2022-01-01', dateFormat));
    const xToken = cookie.load('x-token')
    const LicensePattern = /[0-9]{2,3}[\u4e00-\u9fa5]{3}[0-9]{6}[\u4e00-\u9fa5]/

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
        if(response.data.data.bornDate === undefined || response.data.data.bornDate === null ){
            response.data.data.bornDate = ''
        }
        setUser(response.data.data)
        setData(response.data.data)
    })
    .catch( (error) => message.error(error, 3))
}

function setData(data){
    setIsShowExtraData(false)
    setRolesAction(data.roles)
    setGender(data.gender)
    const extraDivAll = document.getElementById('extraDivAll')
    extraDivAll.style.display = 'none'
    for(let i = 0 ;i<data.roles.length;i++){
        if(data.roles[i] === 4){
            setIsShowExtraData(true)
            i = data.roles.length
            extraDivAll.style.display = ''
        }
    }

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
    if(data.bornDate !==null && data.bornDate !==undefined && data.bornDate !==''){
        setEditDate(moment(data.bornDate, dateFormat));
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
        if(e[i] == '4'){
            showExtra = true
        }
    }

    setIsShowExtraData(showExtra)

    if(showExtra){
        const extraDivAll = document.getElementById('extraDivAll')
        extraDivAll.style.display = ''
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = '320px'
    }else{
        const extraDivAll = document.getElementById('extraDivAll')
        extraDivAll.style.display = 'none'
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = ''
    }

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
    baseDiv.style.width = '320px'
    if(isShowExtraData){
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = '320px'
    }
    seIsEdit(true)
    setEditUser(JSON.parse(JSON.stringify(user)))
}

function cancelEdit(){
    const baseDiv = document.getElementById('baseDiv')
    baseDiv.style.width = null
    if(isShowExtraData){
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = null
    }
    seIsEdit(false)
    setData(user)
    setEditUser({})
}

function sendEdit(){
    const decodedToken = jwt_decode(xToken);
    editUser.id = decodedToken.id
    let isOkLicense = true
    let isOkPassword = false
    if(editUser.rolesInfo.sales && editUser.rolesInfo.sales.license){
        if (LicensePattern.test(editUser.rolesInfo.sales.license)) {
            isOkLicense = true
        }else{
            isOkLicense = false
        }
    }

    if(editUser.password !==''&&editUser.password !==null&&editUser.password !==undefined){
        isOkPassword = true
    }
    

    if(isOkLicense === true && isOkPassword === true){
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
            props.changeRolesMenu(roles)
            cookie.save('x-token',token,{path:'/'})
            message.success('編輯成功', 3);
            const baseDiv = document.getElementById('baseDiv')
            baseDiv.style.width = null
            if(isShowExtraData){
                const extraDiv = document.getElementById('extraDiv')
                extraDiv.style.width = null
            }
        }else{
            message.error(response.data.data, 3)
        }
    })
    .catch( (error) => message.error(error, 3))
    }
    if(isOkLicense === false){
        message.error('請輸入正確的營業員證號格式', 3);
    }

    if(isOkPassword === false){
        message.error('密碼不能為空', 3);
    }
}

function editName(e){
    const editUserValue = editUser
    editUserValue.name = e.target.value
    setEditUser(editUserValue)
}

function editPassword(e){
    const editUserValue = editUser
    editUserValue.password = e.target.value
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

function changeDate(e, dateString){
    setEditDate(moment(dateString, dateFormat));
    const editUserValue = editUser
    editUserValue.bornDate = dateString
    setEditUser(editUserValue)
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
                    {isEdit?( 
                        <div >
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                <div style={{                
                                    'display': 'inline-block',
                                    'textAlign': 'left',
                                }}>
                                    姓名:
                                </div>                                
                            </Col>
                            <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                <Input onChange={editName} style={{ width: '100%' }} defaultValue={user.name}></Input>
                            </Col>
                        </Row>
                        </div>): 
                        <div>姓名:&nbsp;{user.name}</div> }
                    <br/>
                    {isEdit?( 
                        <div >
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                <div style={{                
                                    'display': 'inline-block',
                                    'textAlign': 'left',
                                }}>
                                    密碼:
                                </div>                                
                            </Col>
                            <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                <Input onChange={editPassword} style={{ width: '100%' }} defaultValue={user.password}></Input>
                            </Col>
                        </Row>
                        </div>): 
                        <div>密碼:&nbsp;******</div> }
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
                    {isEdit?( 
                    <div >
                    <Row>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <div style={{                
                                'display': 'inline-block',
                                'textAlign': 'left',
                            }}>
                                生日:
                            </div>                                
                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                        <DatePicker onChange={changeDate} defaultValue={editDate} format={dateFormat}/>
                        </Col>
                    </Row>
                    </div>): 
                    <div>生日:&nbsp;{user.bornDate}</div> }

                    <br/>
                    {isEdit?( 
                    <div >
                    <Row>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <div style={{                
                                'display': 'inline-block',
                                'textAlign': 'left',
                            }}>
                                地址:
                            </div>                                
                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <Input onChange={editAddress} style={{ width: '100%' }} defaultValue={user.address}></Input>
                        </Col>
                    </Row>
                    </div>): 
                    <div>地址:&nbsp;{user.address}</div> }
                    <br/>
                    <div>信箱:&nbsp;{user.mail}</div> 
                    <br/>
                    {isEdit?(
                         <div >
                         <Row>
                             <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                 <div style={{                
                                     'display': 'inline-block',
                                     'textAlign': 'left',
                                 }}>
                                     電話:
                                 </div>                                
                             </Col>
                             <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                <Input onChange={editPhone} style={{ width: '100%' }} defaultValue={user.phone}></Input>
                             </Col>
                         </Row>
                         </div>): 
                         <div>電話:&nbsp;{user.phone}</div> }
                    <br/>
                    {/* <DatePicker onChange={showDate} format={dateFormat}/> */}

                    {
                        // isEdit?( <div>註冊時間:&nbsp;<DatePicker onChange={changeDate} defaultValue={editDate} format={dateFormat}/></div>): <div>註冊時間:&nbsp;{new Date(user.createTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}</div>
                    }
                    註冊時間:&nbsp;{new Date(user.createTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}
                    <br/><br/>
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            <div id='extraDivAll' style={{
                display :'none',
                textAlign: 'center',
                width: '100%'
            }}>
            <Divider>房仲資料</Divider>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                }}>
                <br/>
                <div id='extraDiv' style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    {isEdit?( 
                        <div >
                        <Row>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <div style={{                
                                    'display': 'inline-block',
                                    'textAlign': 'left',
                                }}>
                                    營業員証號:
                                </div>                                
                            </Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                <Input onChange={editLicense} style={{ width: '100%' }} defaultValue={salesLicense}></Input>
                            </Col>
                        </Row>
                        </div>): 
                        <div style={{ width: '100%' }}>營業員証號:&nbsp;{salesLicense}</div> }
                    <br/>
                    {isEdit?( 
                    <div >
                    <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <div style={{                
                                    'display': 'inline-block',
                                    'textAlign': 'left',
                                }}>
                                    經營地區:
                                </div>                                
                            </Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                <Input style={{ width: '100%' }} defaultValue={''}></Input>
                            </Col>
                    </Row>          
                    </div>  
                    ): <div style={{ width: '100%' }}>經營地區:&nbsp;{salesScope}</div> }
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            </div>
            
        </div>
    );
};

export default MemberInfo;
