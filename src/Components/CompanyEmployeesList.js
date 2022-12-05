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
    // const [orgEmployeeRank, setOrgEmployeeRank] = useState('');
    const [showOrgEmployeeManager, setShowOrgEmployeeManager] = useState({name : ''});
    const [showOrgShowEmployeeState, setShowOrgEmployeeState] = useState('');
    const [isShowEditEmployeeMain, setIsShowEditEmployeeMain] = useState(true);
    const [isShowEditEmployeeState, setIsShowEditEmployeeState] = useState(false);
    const [isShowEditEmployeeRank, setIsShowEditEmployeeRank] = useState(false);
    const [isShowEditEmployeeManager, setIsShowEditEmployeeManager] = useState(false);
    const [isShowEditEmployeeManagerRank, setIsShowEditEmployeeManagerRank] = useState(false);


    

    const [size] = useState("large");
    const editEmployeeStateOptions = [{ value: '正式員工' },{ value: '停權員工' }];

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

    function getEmployeeRankByUserId(userId){
        let result = ''
        for(let i = 0 ;i<employeesList.length; i++){
            if(employeesList[i].userId === userId){
                result = employeesList[i].rank
                i = employeesList.length
            }
        }
        return result
    }

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
                    resolveCompanyEmployeesList(response)
                }else{
                    message.error('抓取員工列表失敗', 3)
                }
            })
            .catch( (error) => message.error(error, 3))
    }

    function resolveCompanyEmployeesList(response){
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
                message.success('離職成功', 3)
                getCompanyEmployeesList()
            }else{
                message.error('離職失敗', 3)
            }
        }).catch( (error) => message.error(error, 3))
        cancelResign()
        
    }

    function editEmployees(editEmployees){
        console.log('==employeesList=====',employeesList)
        console.log('==editEmployees=====',editEmployees)
        switchEditEmployeesUI(0)
        setEditEmployeeTitle('員工 '+ editEmployees.userData[0].name)
        if(editEmployees.managerData.length > 0){
            setShowOrgEmployeeManager(editEmployees.managerData[0].name + '( 等級 : ' + getEmployeeRankByUserId(editEmployees.managerData[0]._id) +')')
        }else{
            setShowOrgEmployeeManager('無')
        }
        if(editEmployees.state === 2){
            setShowOrgEmployeeState('正式員工')
        }else if(editEmployees.state === 4){
            setShowOrgEmployeeState('停權員工')
        }else{
            setShowOrgEmployeeState('不詳')
        }
        setEditEmployee(editEmployees)
        setWillEditEmployee(editEmployees)
        setEditOpen(true)
    }

    function closeEditEmployees(){
        setEditEmployee({})
        setWillEditEmployee({})
        setIsShowEditEmployeeManagerRank(false)
        setIsShowEditEmployeeState(false)
        setIsShowEditEmployeeRank(false)
        setIsShowEditEmployeeManager(false)
        setEditOpen(false)
    }

    function switchEditEmployeesUI(type){
        switch(type){
            case 0 :
                setIsShowEditEmployeeMain(true)
                setIsShowEditEmployeeState(false)
                setIsShowEditEmployeeRank(false)
                break;
            case 1 :
                setIsShowEditEmployeeMain(false)
                setIsShowEditEmployeeState(false)
                setIsShowEditEmployeeRank(true)
                setIsShowEditEmployeeManager(false)
                break;
            case 2 :
                setIsShowEditEmployeeMain(false)
                setIsShowEditEmployeeState(false)
                setIsShowEditEmployeeRank(false)
                setIsShowEditEmployeeManager(true)
                break;
            case 3 :
                setIsShowEditEmployeeMain(false)
                setIsShowEditEmployeeState(true)
                setIsShowEditEmployeeRank(false)
                setIsShowEditEmployeeManager(false)
                break;
            default:
        }
    }

    function editEmployeesRank(){
        switchEditEmployeesUI(1)
    }

    function editEmployeesManager(){
        switchEditEmployeesUI(2)
    }

    function editEmployeesState(){
        switchEditEmployeesUI(3)
    }

    function cancelEditEmployeeManagerRank(){

    }

    function selectEditEmployeesState(value){
        const employee = willEditEmployee
        if(value === '正式員工'){
            employee.state = 2
        }else if(value === '停權員工'){
            employee.state = 4
        }else{
            employee.state = editEmployee.state
        }
        setWillEditEmployee(employee)
    }

    function sendEditEmployee(){
        const body = {
            'id': willEditEmployee._id,
            'companyId': willEditEmployee.companyId,
            'userId': willEditEmployee.userId,
            'rank': willEditEmployee.rank,
            'managerId': willEditEmployee.managerId,
            'state': willEditEmployee.state,
            'isResign': willEditEmployee.isResign
          }
          const xToken = cookie.load('x-token')
          let reqUrl = `${editEmployeesUrl}`
          CompanyAxios.put(reqUrl, body, {
              headers:{
                  'x-Token':xToken
              }
          }).then((response) => {
              console.log(response)
              if(response.data.status === true){
                  setEditEmployee(willEditEmployee)
                  message.success('編輯成功', 3)
                  closeEditEmployees()
                  getCompanyEmployeesList()
              }else{
                  message.error('編輯失敗', 3)
              }
          }).catch( (error) => message.error(error, 3))
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
        title={editEmployeeTitle}
        onCancel={() => closeEditEmployees()}
        footer={null}
      >
        
        {
        isShowEditEmployeeMain?(
        <div>
            等級 : {editEmployee.rank}
            <Button type="primary" style={{float : 'right'}} onClick={() => editEmployeesRank()}>
                 編輯等級
            </Button>
            <br/>
            <br/>
            主管 : {showOrgEmployeeManager}
            <Button type="primary" style={{float : 'right'}} onClick={() => editEmployeesManager()}>
                編輯主管
            </Button>
            <br/>
            <br/>
            狀態 : {showOrgShowEmployeeState}
            <Button type="primary" style={{float : 'right'}} onClick={() => editEmployeesState()}>
                編輯狀態
            </Button>
            <br/>
            <br/>
        </div>):null
        }

        {
        isShowEditEmployeeRank?(
        <div>
            目前等級 : {editEmployee.rank}
            <Button type="primary" style={{float : 'right'}} onClick={() => editEmployeesRank()}>
                 編輯等級
            </Button>
            <br/>
            <br/>
            主管 : {showOrgEmployeeManager}
            <Button type="primary" style={{float : 'right'}} onClick={() => editEmployeesManager()}>
                編輯主管
            </Button>
            <br/>
            <br/>
        </div>):null
        }

        {
        isShowEditEmployeeManager?(
        <div>
            目前等級 : {editEmployee.rank}
            {
                isShowEditEmployeeManagerRank?<Button type="primary" danger onClick={() => setIsShowEditEmployeeManagerRank(false)} style={{float : 'right'}}>
                    取消編輯
                </Button>:
                <Button type="primary" onClick={() => setIsShowEditEmployeeManagerRank(true)} style={{float : 'right', backgroundColor:'#00cc00'}}>
                    編輯等級
                </Button>
            }
            <br/>
            <br/>
            {
            isShowEditEmployeeManagerRank?(
            <div>
                編輯等級 :&nbsp;
                <Select allowClear placeholder="請選擇等級" size={size}  options={editEmployeeStateOptions} onChange={selectEditEmployeesState} style={{
                                width: '50%',
                        }}>
                </Select>
                <br/>
                <br/>
            </div>):null
            }
            目前主管 : {showOrgEmployeeManager}
            <br/>
            <br/>
            編輯主管 :&nbsp;
            <Select allowClear placeholder="請選擇主管" size={size}  options={editEmployeeStateOptions} onChange={selectEditEmployeesState} style={{
                            width: '50%',
                        }}>
            </Select>
            <br/>
            <br/>
            <Button type="primary" style={{float : 'right'}} onClick={() => sendEditEmployee()}>
                確定
            </Button>
            <br/>
            <br/>
        </div>):null
        }

        {
        isShowEditEmployeeState?(
        <div>
            目前狀態 : {showOrgShowEmployeeState}
            <br/>
            <br/>
            編輯狀態 :&nbsp;
            <Select allowClear placeholder="請選擇狀態" size={size}  options={editEmployeeStateOptions} onChange={selectEditEmployeesState} style={{
                            width: '50%',
                        }}>
            </Select>
            <br/>
            <br/>
            <Button type="primary" style={{float : 'right'}} onClick={() => sendEditEmployee()}>
                確定
            </Button>
            <br/>
            <br/>
        </div>):null
        }

      </Modal>

        </div>
    );
};

export default CompanyEmployeesList;
