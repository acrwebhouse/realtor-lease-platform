import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";
  import {CompanyAxios} from './axiosApi'



const CompanyEmployeesList = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [employeesList , setEmployeesList] = useState([]);
    const [isResignEmployeesList , setIsResignEmployeesList] = useState([]);
    const getCompanyApplyListUrl = '/employees/getEmployeesListByCompanyId'

    const [getCompanyApplyListArg] = useState({
        start : '0',
        count : '9999999',
    });

    useEffect(() => {
        if (init) {
            // if(props.currentEmployeeData !==null && props.currentEmployeeData !==undefined && JSON.stringify(props.currentEmployeeData) !=='{}'){
            //     setIsShowCompanyApplyState(true)
            // }else{
            //     setIsShowCompanyList(true)
            // }
            getCompanyEmployeesList()
            setInit(false)
        }
    }, )

    function getCompanyEmployeesList(){
        const xToken = cookie.load('x-token')
        getCompanyApplyListArg.states = 2
        let reqUrl = `${getCompanyApplyListUrl}?companyId=${props.currentEmployeeData.companyId}&&start=${getCompanyApplyListArg.start}&&count=${getCompanyApplyListArg.count}`
        CompanyAxios.get(
                reqUrl,{
                    headers:{
                        'x-Token':xToken
                    }
                })
            .then( (response) => {
                if(response.data.status === true){
                    resolveCompanyApplyList(response)
                }else{
                    message.error('抓取員工列表失敗', 3)
                }
            })
            .catch( (error) => message.error(error, 3))
    }

    function resolveCompanyApplyList(response){
        const employee = []
        const isResignEmployee = []
        if(response.data && response.data.data){
            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){
                const item = {
                    key: i,
                    name: items[i]._id,
                    content : []
                    }
                    console.log(items[i])
                if(items[i].isResign === true){
                    item.content = [items[i]._id,`姓名 : ${items[i].userData[0].name}`]
                            if(items[i].userData[0].gender === true){
                                item.content.push('性別 : 男')
                        } else if(items[i].userData[0].gender === false){
                            item.content.push('性別 : 女')
                        } else {
                            item.content.push('性別 : 男')
                        }
                        item.content.push(`帳號 : ${items[i].userData[0].account}`)
                        item.content.push(`電話 : ${items[i].userData[0].phone}`)
                        item.content.push(`信箱 : ${items[i].userData[0].mail}`)
                        if(items[i].managerData.length > 0){
                            item.content.push(`主管 : ${items[i].managerData[0].name}`)
                        }else{
                            item.content.push(`主管 : 無`)
                        }
                        item.content.push(`等級 : ${items[i].rank}`)
                        item.content.push(`狀態 : ${items[i].state}`)
                        item.content.push(items[i])
                        isResignEmployee.push(item)
                        
                }else if(items[i].state === 2 || items[i].state === 4){
                    if(items[i].userData.length > 0){
                        item.content = [items[i]._id,`姓名 : ${items[i].userData[0].name}`]
                            if(items[i].userData[0].gender === true){
                                item.content.push('性別 : 男')
                        } else if(items[i].userData[0].gender === false){
                            item.content.push('性別 : 女')
                        } else {
                            item.content.push('性別 : 男')
                        }
                        item.content.push(`帳號 : ${items[i].userData[0].account}`)
                        item.content.push(`電話 : ${items[i].userData[0].phone}`)
                        item.content.push(`信箱 : ${items[i].userData[0].mail}`)
                        if(items[i].managerData.length > 0){
                            item.content.push(`主管 : ${items[i].managerData[0].name}`)
                        }else{
                            item.content.push(`主管 : 無`)
                        }
                        item.content.push(`等級 : ${items[i].rank}`)
                        if(items[i].state === 2){
                            item.content.push(`狀態 : 正式員工`)
                        }else{
                            item.content.push(`狀態 : 停權`)
                        }
                        
                        item.content.push(items[i])
                        employee.push(item)
                        
                    }
                }
            }
        }
        setEmployeesList(employee)
        setIsResignEmployeesList(isResignEmployee)
    }

    const isResignemployeesColumns = [
        {
          title: '人員',
          dataIndex: 'content',
          key: 'content',
          render: (content) => {
            return <div style={{
                // 'textAlign': 'center',
            }}>
                <div style={{
                'display': 'inline-block',
                'textAlign': 'left',
                }}>
                    <div style={{
                      'color': '#0000ff',
                      'fontSize':'20px'
                   }}>{content[1]}</div>
                    {content[2]}
                    <br/>
                    {content[3]}
                    <br/>
                    {content[4]}
                    <br/>
                    {content[5]}
                    <br/>
                    {content[6]}
                    <br/>
                    {content[7]}
                    <br/>
                    {content[8]}

              <div >
              </div>
            </div>
            </div>
            },
            
        },
        {
          title: '',
          dataIndex: 'content',
          key: 'content',
          //  width:'50px',
          render: (content) => {
            return <div style={{
                'textAlign': 'center',
            }}>
                <div style={{
                'display': 'inline-block',
                'textAlign': 'left',
                }}>
                  {/* <Button type="primary" onClick={() => applyResult(true,content[6])} style={{width: '80px' }}>
                      同意
                  </Button>
                  <Button type="primary" danger onClick={() => applyResult(false,content[6])} style={{width: '80px' }}>
                      拒絕
                  </Button> */}
              <div >
              </div>
            </div>
            </div>
            },
            
        },
    ];

    const employeesColumns = [
          {
            title: '人員',
            dataIndex: 'content',
            key: 'content',
            render: (content) => {
              return <div style={{
                //   'textAlign': 'center',
              }}>
                  <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                      <div style={{
                        'color': '#0000ff',
                        'fontSize':'20px'
                     }}>{content[1]}</div>
                      {content[2]}
                      <br/>
                      {content[3]}
                      <br/>
                      {content[4]}
                      <br/>
                      {content[5]}
                      <br/>
                      {content[6]}
                      <br/>
                      {content[7]}
                      <br/>
                      {content[8]}

                <div >
                </div>
              </div>
              </div>
              },
              
          },
          {
            title: '',
            dataIndex: 'content',
            key: 'content',
            //  width:'50px',
            render: (content) => {
              return <div style={{
                  'textAlign': 'center',
              }}>
                  <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    <Button type="primary"   style={{width: '80px' , backgroundColor : '#00cc00' }}>
                        編輯
                    </Button>
                    <Button type="primary" danger  style={{width: '80px' }}>
                        離職
                    </Button>
                <div >
                </div>
              </div>
              </div>
              },
              
          },
      ];

    return (
        <div>
        <Row>
            <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
            <Divider>在職員工</Divider>
            <Table
                columns={employeesColumns}
                pagination={{ position: ['topLeft', 'bottomRight'] }}
                dataSource={employeesList}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                    }, // click row
                };}}
            />
            </Col>
            <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
        </Row>

        <Row>
            <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
            <Divider>離職員工</Divider>
            <Table
                columns={isResignemployeesColumns}
                pagination={{ position: ['topLeft', 'bottomRight'] }}
                dataSource={isResignEmployeesList}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                    }, // click row
                };}}
            />
            </Col>
            <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
        </Row>
            
        </div>
    );
};

export default CompanyEmployeesList;
