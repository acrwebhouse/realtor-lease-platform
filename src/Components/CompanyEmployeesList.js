import React, {useEffect, useState} from 'react';
import {Table, Space, Modal, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {CompanyAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";



const CompanyEmployeesList = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [employeesList , setEmployeesList] = useState([]);
    const [isResignEmployeesList , setIsResignEmployeesList] = useState([]);
    const getEmployeesListByCompanyIdUrl = '/employees/getEmployeesListByCompanyId'
    const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false);
    const [willResignEmployee, setWillResignEmployee] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    const [editEmployee, setEditEmployee] = useState({});
    const [willEditEmployee, setWillEditEmployee] = useState({});
    const [editEmployeeTitle, setEditEmployeeTitle] = useState('');
    const editEmployeesUrl = 'employees/editEmployees'

    const [getCompanyEmployeesListArg] = useState({
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
        getCompanyEmployeesListArg.states = 2
        let reqUrl = `${getEmployeesListByCompanyIdUrl}?companyId=${props.currentEmployeeData.companyId}&&start=${getCompanyEmployeesListArg.start}&&count=${getCompanyEmployeesListArg.count}`
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
                console.log(items[i])
                if(items[i].isResign === true){
                    combineShowColumnContent(isResignEmployee,items,i)     
                }else if(items[i].state === 2 || items[i].state === 4){
                    combineShowColumnContent(employee,items,i)
                }
            }
        }
        setEmployeesList(employee)
        setIsResignEmployeesList(isResignEmployee)
    }

    function combineShowColumnContent(showArr,items,i){
        const item = {
            key: i,
            name: items[i]._id,
            content : []
        }
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
            if(items[i].rank === 0){
                item.content.push(`等級 : 管理者`)
            }else{
                item.content.push(`等級 : ${items[i].rank}`)
            }
            if(items[i].state === 2){
                item.content.push(`狀態 : 正式員工`)
            }else{
                item.content.push(`狀態 : 停權`)
            }
            
            if(items[i].managerData.length > 0){
                item.content.push(items[i].managerData[0])
            }else{
                item.content.push({})
            }
            item.content.push(items[i].rank)
            item.content.push(items[i].state)
            item.content.push(items[i])
            if(items[i].rank === 0){
                item.content.push(`none`)
            }else{
                item.content.push(`flex`)
            }
            showArr.push(item)
            
        }
                        
    }

    function resignAction(resignEmployee){
        setWillResignEmployee(resignEmployee)
        setIsShowDeleteAlert(true)
    }

    function cancelResign(){
        setWillResignEmployee({})
        setIsShowDeleteAlert(false)
    }

    function resigning(){
        console.log('====resigning==willResignEmployee===',willResignEmployee)
        let reqUrl = `${editEmployeesUrl}`
        const body = {
            'id': willResignEmployee._id,
            'companyId': willResignEmployee.companyId,
            'userId': willResignEmployee.userId,
            'rank': willResignEmployee.rank,
            'managerId': willResignEmployee.managerId,
            'state': willResignEmployee.state,
            'isResign': true
          }

        console.log(body)

        const xToken = cookie.load('x-token')
        CompanyAxios.put(reqUrl, body, {
            headers:{
                'x-Token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                // message.success('離職成功', 3)
                getCompanyEmployeesList()
            }else{
                message.error('離職失敗', 3)
            }
        }).catch( (error) => message.error(error, 3))
        cancelResign()
        
    }

    function editEmployees(employee){
        console.log('==editEmployees=====',employee)
        setEditEmployeeTitle('員工 '+ employee.userData[0].name)
        setEditEmployee(employee)
        setWillEditEmployee(employee)
        setEditOpen(true)
    }

    function cancelEditEmployees(){
        console.log('=====cancelEditEmployees====')
        setEditEmployee({})
        setWillEditEmployee({})
        setEditOpen(false)
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
                    狀態：已離職

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
                  'display':content[13],
              }}>
                  <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    <Button type="primary"  onClick={() => editEmployees(content[12])}  style={{width: '80px' , backgroundColor : '#00cc00' }}>
                        編輯
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" danger  onClick={() => resignAction(content[12])} style={{width: '80px' }}>
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
        {
            isShowDeleteAlert?(
            <div style={{'position':'sticky' ,'top':'0px','zIndex':100 }}>
            <Alert
                afterClose={cancelResign}
                type="error"
                action={
                <Space>
                    <Button size="small" type="ghost" onClick={resigning}>
                        確定離職
                    </Button>
                    <Button size="small" type="ghost" onClick={cancelResign}>
                        取消離職
                    </Button>
                </Space>
                
                }
            closable
            />
            </div>
            ):null
            }
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

        <Modal
        visible={editOpen}
        // open={true}
        // closable={() => cancelEditEmployees()}
        title={editEmployeeTitle}
        // onOk={() => editEmployees(true)}
        onCancel={() => cancelEditEmployees()}
        // onOk={handleOk}
        footer={null}
        // onCancel={cancelEditEmployees}
        // footer={[
        //   <Button key="back" onClick={() => editEmployees(true)}>
        //     Return
        //   </Button>,
        //   <Button key="submit" type="primary"  onClick={() => editEmployees(true)}>
        //     Submit
        //   </Button>,
        //   <Button
        //     key="link"
        //     href="https://google.com"
        //     type="primary"
        //     onClick={() => editEmployees(true)}
        //   >
        //     Search on Google
        //   </Button>,
        // ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

        </div>
    );
};

export default CompanyEmployeesList;
