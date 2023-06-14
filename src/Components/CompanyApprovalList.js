import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {HouseAxios, UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {CompanyAxios} from './axiosApi'
import {
    useParams
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

const getCompanyApplyListUrl = '/employees/getEmployeesListByCompanyId'
const editEmployees = '/employees/editEmployees'
const getTransactionListAuth = 'transaction/getTransactionList'
const editTransactionAuth = '/transaction/editTransactionNoIncludeCompany'
const CompanyApprovalList = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [companyApplyList , setCompanyApplyList] = useState([]);
    const [transactionApplyList, setTransactionApplyList] = useState([])
    const [switchPage, setSwitchPage] = useState(0)

    const [getCompanyApplyListArg] = useState({
        start : '0',
        count : '9999999',
        states : '1',
    });

    useEffect(() => {
        if (init) {
            getCompanyApplyList()
            getCompanyHouseList()
            setInit(false)
        }
    }, )
    console.log(props)
    const getCompanyHouseList = () => {
        const xToken = cookie.load('x-token')
        let reqUrl = `${getTransactionListAuth}?companyId=${props.currentEmployeeData.companyId}`
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
            .then( (response) => {
                // dealData.id = response.data.data[0].owner
                resolveCompanyHousesList(response)
                // console.log(response)
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)})
    }

    function resolveCompanyHousesList(response){
        console.log(response)
        const data = []

        if(response.data && response.data.data){
            const temp = []
            const items = response.data.data

            for(let i = 0 ;i<items.length; i++){
                if(items[i] && items[i].state === 1) {
                    console.log(items[i], (items[i].createTime))
                    temp.push(items[i])
                }
            }
            let transactionApplyData = removeDuplicates(temp, 'houseId')
            for (let i = 0; i< transactionApplyData.length; i++) {
                const item = {
                        key: i,
                        id : transactionApplyData[i]._id,
                        houseId : transactionApplyData[i].houseId,
                        userId : transactionApplyData[i].userId,
                        companyId : transactionApplyData[i].companyId,
                        actualPrice : transactionApplyData[i].actualPrice,
                        serviceCharge : transactionApplyData[i].serviceCharge,
                        transactionDate : `${new Date(Date.parse(transactionApplyData[i].transactionDate)).toLocaleDateString()}`,
                        startRentDate : `${new Date(Date.parse(transactionApplyData[i].startRentDate)).toLocaleDateString()}`,
                        endRentDate : `${new Date(Date.parse(transactionApplyData[i].endRentDate)).toLocaleDateString()}`,
                        applyName: transactionApplyData[i].userData[0].name,
                        content : [
                            `姓 名 : ${transactionApplyData[i].userData[0].name}`,
                            `房屋名 : ${transactionApplyData[i].houseData[0].name}`,
                            `原始價 : ${transactionApplyData[i].actualPrice} 元/月`,
                            `服務費 : ${transactionApplyData[i].serviceCharge} 元`,
                            `起租日 : ${new Date(Date.parse(transactionApplyData[i].startRentDate)).toLocaleDateString()}`,
                            `結租日 : ${new Date(Date.parse(transactionApplyData[i].endRentDate)).toLocaleDateString()}`,
                            `申請日 : ${new Date(Date.parse(transactionApplyData[i].createTime)).toLocaleDateString()}`,
                        ],
                    }
                item.content.push(transactionApplyData[i])
                console.log(item)
                data.push(item)
            }

            setTransactionApplyList(data)
            // console.log(temp, temp.sort())
            // console.log(removeDuplicates(temp, 'houseId'))
        }
    }

    console.log(transactionApplyList)

    const removeDuplicates = (originalArray, prop) => {
        let newArray = [];
        let lookupObject  = {};

        for(let i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for(let i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }
    // console.log(transactionApplyList)

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
                if(response.data.status === true){
                    // setCompanyApplyList(response.data.data)
                    resolveCompanyApplyList(response)
                }else{
                    toast.error('抓取公司審核列表失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile();
                toast.error(error)
            })
    }

    function resolveCompanyApplyList(response){
        const data = []
        if(response.data && response.data.data){
            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){
                const item = {
                    key: i,
                    name: items[i]._id,
                    // content: [`統一編號 : ${items[i].unifiedBusinessNo}`,`地址 : ${items[i].address}`,`負責人 : ${items[i].owner}`,`電話 : ${items[i].phone}`,`信箱 : ${items[i].mail}`,items[i]._id,items[i].name],
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
                    item.content.push(items[i])

                }
                data.push(item)
            }
            console.log('===data====',data)
            setCompanyApplyList(data)
        }
    }

    function transactionApplyResult(isPass,transaction){
        const body = {
            'id': transaction._id,
            'companyId': transaction.companyId,
            'houseId' : transaction.houseId,
            'userId': transaction.userId,
            'actualPrice': transaction.actualPrice,
            'serviceCharge': transaction.serviceCharge,
            'transactionDate': new Date(Date.parse(transaction.transactionDate)).toLocaleDateString(),
            'startRentDate': new Date(Date.parse(transaction.startRentDate)).toLocaleDateString(),
            'endRentDate': new Date(Date.parse(transaction.endRentDate)).toLocaleDateString(),
            "edit": {

            },
            "state": transaction.state
        }
        if(isPass === true){
            body.state = 4
        }else{
            body.state = 5
        }
        console.log(isPass, body)
        const xToken = cookie.load('x-token')
        let reqUrl = `${editTransactionAuth}`
        CompanyAxios.put(reqUrl, body, {
            headers:{
                'x-Token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                // getCompanyApplyList()
            }else{
                toast.error('審核失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile();
            toast.error(error)
        })

    }
    function applyResult(isPass,employee){
        const body = {
            'id': employee._id,
            'companyId': employee.companyId,
            'userId': employee.userId,
            'rank': employee.rank,
            'managerId': employee.managerId,
            'state': employee.state,
            'isResign': employee.isResign
        }
        if(isPass === true){
            body.state = 2
            body.isResign = false
        }else{
            body.state = 3
        }

        const xToken = cookie.load('x-token')
        let reqUrl = `${editEmployees}`
        CompanyAxios.put(reqUrl, body, {
            headers:{
                'x-Token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                // getCompanyApplyList()
            }else{
                toast.error('審核失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile();
            toast.error(error)
        })

    }

    const transactionApplyColumns = [
        {
            title: '申請人員',
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
                        }}>{content[0]}</div>
                        <div style={{
                            'color': '#ff0000',
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
                        <div style={{
                            'color': '#6f2f3f',
                            'fontSize':'20px'
                        }}>{content[6]}</div>

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
                        <Button type="primary" onClick={() => transactionApplyResult(true,content[7])} style={{width: '80px' }}>
                            同意
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" danger onClick={() => transactionApplyResult(false,content[7])} style={{width: '80px' }}>
                            拒絕
                        </Button>
                        <div >
                        </div>
                    </div>
                </div>
            },

        },
    ]
    const columns = [
        // {
        //   title: '名稱',
        //   dataIndex: 'name',
        //   key: 'name',
        // //   width:'100px',
        //   render: (name) => {
        //     return <div style={{
        //         'textAlign': 'center',
        //     }}>
        //       {name}
        //     </div>
        //     },
        // },
        {
            title: '申請人員',
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
                        <Button type="primary" onClick={() => applyResult(true,content[6])} style={{width: '80px' }}>
                            同意
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" danger onClick={() => applyResult(false,content[6])} style={{width: '80px' }}>
                            拒絕
                        </Button>
                        <div >
                        </div>
                    </div>
                </div>
            },

        },
    ];

    const showTransactionApplyList = () => {
        // getCompanyApplyList()
        getCompanyHouseList()
        setSwitchPage(1)
    }
    const showCompanyApplyList = () => {
        getCompanyApplyList()
        // getCompanyHouseList()
        setSwitchPage(2)
    }

    return (
        switchPage === 0
            ?
            <div style={{display: 'center', textAlign: 'center'}}>
                <Row>
                    <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <div style={{transform: 'translate(0, 500%)'}}>
                            <Button type="primary" onClick={showTransactionApplyList} style={{width: '80px'}}>成交審核</Button>
                            <br/>
                            <br/>
                            <Button type="primary" onClick={showCompanyApplyList} style={{width: '80px'}}>公司審核</Button>
                        </div>
                    </Col>
                    <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>
            </div>

            :
         switchPage === 1
             ?
        <div>
            <ToastContainer autoClose={2000} position="top-center"/>
            <Row>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                    <Divider>審核列表</Divider>
                    <Table
                        columns={transactionApplyColumns}
                        pagination={{ position: ['topLeft', 'bottomRight'] }}
                        dataSource={transactionApplyList}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                }, // click row
                            };}}
                    />
                    <Button type="primary" onClick={() => setSwitchPage(0)} style={{width: '80px'}}>返回</Button>
                </Col>
                <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
            </Row>
        </div>
                :
             <div>
                 <ToastContainer autoClose={2000} position="top-center"/>
                 <Row>
                     <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                     <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                         <Divider>審核列表</Divider>
                         <Table
                             columns={columns}
                             pagination={{ position: ['topLeft', 'bottomRight'] }}
                             dataSource={companyApplyList}
                             onRow={(record, rowIndex) => {
                                 return {
                                     onClick: event => {
                                     }, // click row
                                 };}}
                         />
                         <Button type="primary" onClick={() => setSwitchPage(0)} style={{width: '80px'}}>返回</Button>
                     </Col>
                     <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                 </Row>
             </div>
    );
};

export default CompanyApprovalList;
