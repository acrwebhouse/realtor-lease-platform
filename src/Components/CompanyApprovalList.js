import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {HouseAxios, UserAxios} from './axiosApi'
import moment from 'moment';
import {CompanyAxios} from './axiosApi'
import {
    useParams
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'
import {log} from "@craco/craco/lib/logger";
import {config} from "../Setting/config";

const getCompanyApplyListUrl = '/employees/getEmployeesListByCompanyId'
const editEmployees = '/employees/editEmployees'
const getTransactionListAuth = 'transaction/getTransactionList'
const editTransactionAuth = '/transaction/editTransactionNoIncludeCompany'
const removeTransactionAuth = '/transaction/removeTransaction'
const houseService = config.base_URL_House
const CompanyApprovalList = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(false);
    const [companyApplyList , setCompanyApplyList] = useState([]);
    const [transactionCreateApplyList, setTransactionCreateApplyList] = useState([])
    const [transactionEditApplyList, setTransactionEditApplyList] = useState([])
    const [transactionDelApplyList, setTransactionDelApplyList] = useState([])
    const [switchPage, setSwitchPage] = useState(0)
    const [applyData, setApplyData] = useState()
    const [applyEditData, setApplyEditData] = useState()
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
                    'x-token':xToken
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
        const dataCreate = []
        const dataEdit = []
        const dataDel = []

        if(response.data && response.data.data){
            const tempCreate = []
            const tempEdit = []
            const tempDel = []
            const items = response.data.data
            console.log(items)
            for(let i = 0 ;i<items.length; i++){
                if(items[i] && items[i].state === 1) {
                    console.log(items[i], (items[i].createTime))
                    tempCreate.push(items[i])
                }
            }
            for(let i = 0 ;i<items.length; i++){
                if(items[i] && items[i].state === 2) {
                    console.log(items[i], (items[i].createTime))
                    tempEdit.push(items[i])
                }
            }
            for(let i = 0 ;i<items.length; i++){
                if(items[i] && items[i].state === 3) {
                    console.log(items[i], (items[i].createTime))
                    tempDel.push(items[i])
                }
            }
            console.log(tempCreate, tempEdit, tempDel)
            let transactionCreateApply = removeDuplicates(tempCreate, 'houseId')
            let transactionEditApply = removeDuplicates(tempEdit, 'houseId')
            let transactionDelApply = removeDuplicates(tempDel, 'houseId')
            console.log(transactionEditApply)
            for (let i = 0; i< transactionCreateApply.length; i++) {
                const item = {
                        key: i,
                        id : transactionCreateApply[i]._id,
                        houseId : transactionCreateApply[i].houseId,
                        userId : transactionCreateApply[i].userId,
                        companyId : transactionCreateApply[i].companyId,
                        actualPrice : transactionCreateApply[i].actualPrice,
                        serviceCharge : transactionCreateApply[i].serviceCharge,
                        transactionDate : `${new Date(Date.parse(transactionCreateApply[i].transactionDate)).toLocaleDateString()}`,
                        startRentDate : `${new Date(Date.parse(transactionCreateApply[i].startRentDate)).toLocaleDateString()}`,
                        endRentDate : `${new Date(Date.parse(transactionCreateApply[i].endRentDate)).toLocaleDateString()}`,
                        applyName: transactionCreateApply[i].userData[0].name,
                        image: `${houseService}/resource/${transactionCreateApply[i].houseId}/photo/${transactionCreateApply[i].houseData[0].photo[0]}`,
                        content : [
                            `物\u3000件 : ${transactionCreateApply[i].houseData[0].name}`,
                            `申請人 : ${transactionCreateApply[i].userData[0].name}`,
                            `成交價 : ${transactionCreateApply[i].actualPrice} 元/月 `,
                            `服務費 : ${transactionCreateApply[i].serviceCharge} 元`,
                            `成交日 : ${new Date(Date.parse(transactionCreateApply[i].transactionDate)).toLocaleDateString()}`,
                            `起租日 : ${new Date(Date.parse(transactionCreateApply[i].startRentDate)).toLocaleDateString()}`,
                            `結租日 : ${new Date(Date.parse(transactionCreateApply[i].endRentDate)).toLocaleDateString()}`,
                            `申請日 : ${new Date(Date.parse(transactionCreateApply[i].updateTime)).toLocaleDateString()}`,
                        ],
                    }
                item.content.push(transactionCreateApply[i])
                console.log(item)
                dataCreate.push(item)
            }

            for (let i = 0; i< transactionEditApply.length; i++) {
                const item1 = {
                    key: i,
                    id : transactionEditApply[i]._id,
                    houseId : transactionEditApply[i].houseId,
                    userId : transactionEditApply[i].userId,
                    companyId : transactionEditApply[i].companyId,
                    actualPrice : transactionEditApply[i].actualPrice,
                    serviceCharge : transactionEditApply[i].serviceCharge,
                    transactionDate : `${new Date(Date.parse(transactionEditApply[i].transactionDate)).toLocaleDateString()}`,
                    startRentDate : `${new Date(Date.parse(transactionEditApply[i].startRentDate)).toLocaleDateString()}`,
                    endRentDate : `${new Date(Date.parse(transactionEditApply[i].endRentDate)).toLocaleDateString()}`,
                    applyName: transactionEditApply[i].userData[0].name,
                    image: `${houseService}/resource/${transactionEditApply[i].houseId}/photo/${transactionEditApply[i].houseData[0].photo[0]}`,
                    content : [
                        `物\u3000件 : ${transactionEditApply[i].houseData[0].name}`,
                        `申請人 : ${transactionEditApply[i].userData[0].name}`,
                        <div style={{height:'0px'}}>
                            成交價&nbsp;:&nbsp;
                            <div style={{width:'80px',textAlign:'left' ,display:'inline-block'}}>{+transactionEditApply[i].actualPrice} 元</div>
                            <div style={{width:'20px', textAlign:'left' ,display:'inline-block'}}>⇨</div>
                            <div style={{width:'80px', textAlign:'left',display:'inline-block', color:'red'}}>{transactionEditApply[i].edit.actualPrice} 元</div>
                        </div>,
                        <div style={{height:'0px'}}>
                            服務費&nbsp;:&nbsp;
                            <div style={{width:'80px',textAlign:'left' ,display:'inline-block'}}>{transactionEditApply[i].serviceCharge} 元</div>
                            <div style={{width:'20px', textAlign:'left' ,display:'inline-block'}}>⇨</div>
                            <div style={{width:'80px', textAlign:'left',display:'inline-block', color:'red'}}>{transactionEditApply[i].edit.serviceCharge} 元</div>
                        </div>,
                        <div style={{height:'0px'}}>
                            成交日&nbsp;:&nbsp;
                            <div style={{width:'80px',textAlign:'left' ,display:'inline-block'}}>{new Date(Date.parse(transactionEditApply[i].transactionDate)).toLocaleDateString()}</div>
                            <div style={{width:'20px', textAlign:'left' ,display:'inline-block'}}>⇨</div>
                            <div style={{width:'80px', textAlign:'left',display:'inline-block', color:'red'}}>{new Date(Date.parse(transactionEditApply[i].edit.transactionDate)).toLocaleDateString()}</div>
                        </div>,
                        <div style={{height:'0px'}}>
                            起租日&nbsp;:&nbsp;
                            <div style={{width:'80px',textAlign:'left' ,display:'inline-block'}}>{new Date(Date.parse(transactionEditApply[i].startRentDate)).toLocaleDateString()}</div>
                            <div style={{width:'20px', textAlign:'left' ,display:'inline-block'}}>⇨</div>
                            <div style={{width:'80px', textAlign:'left',display:'inline-block', color:'red'}}>{new Date(Date.parse(transactionEditApply[i].edit.startRentDate)).toLocaleDateString()}</div>
                        </div>,
                        <div style={{height:'0px'}}>
                            結租日&nbsp;:&nbsp;
                            <div style={{width:'80px',textAlign:'left' ,display:'inline-block'}}>{new Date(Date.parse(transactionEditApply[i].endRentDate)).toLocaleDateString()}</div>
                            <div style={{width:'20px', textAlign:'left' ,display:'inline-block'}}>⇨</div>
                            <div style={{width:'80px', textAlign:'left',display:'inline-block', color:'red'}}>{new Date(Date.parse(transactionEditApply[i].edit.endRentDate)).toLocaleDateString()}</div>
                        </div>,
                            `申請日 :${new Date(Date.parse(transactionEditApply[i].updateTime)).toLocaleDateString()}`,

                        // `服務費 : ${transactionEditApply[i].serviceCharge}元\u3000\u3000\u3000\u3000\u3000⇨\u3000\u3000\u3000${transactionEditApply[i].edit.serviceCharge}元`,
                        // `成交日 : ${new Date(Date.parse(transactionEditApply[i].transactionDate)).toLocaleDateString()}  ⇨   ${new Date(Date.parse(transactionEditApply[i].edit.transactionDate)).toLocaleDateString()}`,
                        // `起租日 : ${new Date(Date.parse(transactionEditApply[i].startRentDate)).toLocaleDateString()}\u3000\u3000\u3000\u3000\u3000⇨\u3000\u3000\u3000${new Date(Date.parse(transactionEditApply[i].edit.startRentDate)).toLocaleDateString()}`,
                        // `結租日 : ${new Date(Date.parse(transactionEditApply[i].endRentDate)).toLocaleDateString()}\u3000\u3000\u3000\u3000⇨\u3000\u3000\u3000${new Date(Date.parse(transactionEditApply[i].edit.endRentDate)).toLocaleDateString()}`,
                        // `申請日 : ${new Date(Date.parse(transactionEditApply[i].createTime)).toLocaleDateString()}`,
                    ],
                }
                item1.content.push(transactionEditApply[i])
                console.log(item1)
                dataEdit.push(item1)
            }
            
            for (let i = 0; i< transactionDelApply.length; i++) {
                const item2 = {
                    key: i,
                    id : transactionDelApply[i]._id,
                    houseId : transactionDelApply[i].houseId,
                    userId : transactionDelApply[i].userId,
                    companyId : transactionDelApply[i].companyId,
                    actualPrice : transactionDelApply[i].actualPrice,
                    serviceCharge : transactionDelApply[i].serviceCharge,
                    transactionDate : `${new Date(Date.parse(transactionDelApply[i].transactionDate)).toLocaleDateString()}`,
                    startRentDate : `${new Date(Date.parse(transactionDelApply[i].startRentDate)).toLocaleDateString()}`,
                    endRentDate : `${new Date(Date.parse(transactionDelApply[i].endRentDate)).toLocaleDateString()}`,
                    applyName: transactionDelApply[i].userData[0].name,
                    image: `${houseService}/resource/${transactionDelApply[i].houseId}/photo/${transactionDelApply[i].houseData[0].photo[0]}`,
                    content : [
                        `物\u3000件 : ${transactionDelApply[i].houseData[0].name}`,
                        `申請人 : ${transactionDelApply[i].userData[0].name}`,
                        `成交價 : ${transactionDelApply[i].actualPrice} 元/月`,
                        `服務費 : ${transactionDelApply[i].serviceCharge} 元`,
                        `成交日 : ${new Date(Date.parse(transactionDelApply[i].transactionDate)).toLocaleDateString()}`,
                        `起租日 : ${new Date(Date.parse(transactionDelApply[i].startRentDate)).toLocaleDateString()}`,
                        `結租日 : ${new Date(Date.parse(transactionDelApply[i].endRentDate)).toLocaleDateString()}`,
                        `申請日 : ${new Date(Date.parse(transactionDelApply[i].updateTime)).toLocaleDateString()}`,
                    ],
                }
                item2.content.push(transactionDelApply[i])
                console.log(item2)
                dataDel.push(item2)
            }
            setTransactionCreateApplyList(dataCreate)
            setTransactionEditApplyList(dataEdit)
            setTransactionDelApplyList(dataDel)
            // console.log(temp, temp.sort())
            // console.log(removeDuplicates(temp, 'houseId'))
        }
    }

    console.log(transactionCreateApplyList)

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
    // console.log(transactionCreateApplyList)

    function getCompanyApplyList(){
        const xToken = cookie.load('x-token')
        let reqUrl = `${getCompanyApplyListUrl}?companyId=${props.currentEmployeeData.companyId}&&start=${getCompanyApplyListArg.start}&&count=${getCompanyApplyListArg.count}&&states=${getCompanyApplyListArg.states}`
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
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

    function transactionCreateApplyResult(isPass,transaction){
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
                'x-token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                getCompanyHouseList()
            }else{
                toast.error('審核失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile();
            toast.error(error)
        })

    }

    function transactionEditApplyResult(isPass,transaction){
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
                'actualPrice' : transaction.edit.actualPrice,
                'serviceCharge' : transaction.edit.serviceCharge,
                'transactionDate': new Date(Date.parse(transaction.edit.transactionDate)).toLocaleDateString(),
                'startRentDate': new Date(Date.parse(transaction.edit.startRentDate)).toLocaleDateString(),
                'endRentDate': new Date(Date.parse(transaction.edit.endRentDate)).toLocaleDateString(),
            },
            "state": transaction.state
        }
        if(isPass === true){
            body.actualPrice = body.edit.actualPrice
            body.serviceCharge = body.edit.serviceCharge
            body.transactionDate = body.edit.transactionDate
            body.startRentDate = body.edit.startRentDate
            body.endRentDate = body.edit.endRentDate
            body.edit = {}
            body.state = 4
        }else{
            body.edit = {}
            body.state = 6
        }
        console.log(isPass, body)
        const xToken = cookie.load('x-token')
        let reqUrl = `${editTransactionAuth}`
        CompanyAxios.put(reqUrl, body, {
            headers:{
                'x-token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                getCompanyHouseList()
            }else{
                toast.error('審核失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile();
            toast.error(error)
        })

    }

    function transactionDelApplyResult(isPass,transaction){
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
            const xToken = cookie.load('x-token')
                let reqUrl = `${removeTransactionAuth}`
            CompanyAxios.delete(reqUrl, {
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json",
                            "x-token" : xToken,
                        },
                        data: {"ids" : [body.id]}
                    }).then((response) => {
                        console.log(response)
                        if(response.data.status === true){
                            toast.success('刪除成功');
                            // setTimeout(()=>{
                            //     window.location.href = window.location.origin;
                            // },3000);
                            getCompanyHouseList()
                        }else{
                            toast.error(response.data.data)
                        }
                    })
                    .catch( (error) => {
                        showInternelErrorPageForMobile()
                        toast.error(error)
                    })

        }else{
            body.state = 7
            console.log(isPass, body)
            const xToken = cookie.load('x-token')
            let reqUrl = `${editTransactionAuth}`
            CompanyAxios.put(reqUrl, body, {
                headers:{
                    'x-token':xToken
                }
            }).then((response) => {
                console.log(response)
                if(response.data.status === true){
                    getCompanyHouseList()
                }else{
                    toast.error('審核失敗')
                }
            }).catch( (error) => {
                showInternelErrorPageForMobile();
                toast.error(error)
            })
        }

    }
    function companyApplyResult(isPass,employee){
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
                'x-token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                getCompanyApplyList()
            }else{
                toast.error('審核失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile();
            toast.error(error)
        })

    }

    const transactionCreateApplyColumns = [
        {
            title: '房屋照片',
            dataIndex: 'image',
            key: 'image',
            //   width:'250px',
            width: '40%',
            responsive: ['md'],
            render: (image) => (
                <div style={{
                    height: '250px',
                    'line-height': '250px',
                    overflow: 'hidden',
                }}>
                    <Image
                        src={image}
                        preview={false}
                        fallback="data:image/png;base64,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"
                    />
                </div>
            )
        }
        ,
        {
            // title: '申請人員',
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
                        {content[6]}
                        <br/>
                        <div style={{
                            'color': '#6f2f3f',
                            'fontSize':'20px'
                        }}>{content[7]}</div>
                        <br/>
                        <div >
                            <Button type="primary" onClick={() => transactionCreateApplyResult(true,content[8])} style={{width: '80px' }}>
                                同意
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            {/*<br/>*/}
                            {/*<br/>*/}
                            <Button type="primary" danger onClick={() => transactionCreateApplyResult(false,content[8])} style={{width: '80px' }}>
                                拒絕
                            </Button>
                        </div>
                    </div>
                </div>
            },

        },
        // {
        //     title: '',
        //     dataIndex: 'content',
        //     key: 'content',
        //      width:'150px',
        //     render: (content) => {
        //         return <div style={{
        //             'textAlign': 'center',
        //         }}>
        //             <div style={{
        //                 'display': 'inline-block',
        //                 'textAlign': 'right',
        //             }}>
        //                 <Button type="primary" onClick={() => transactionCreateApplyResult(true,content[8])} style={{width: '80px' }}>
        //                     同意
        //                 </Button>
        //                 {/*&nbsp;&nbsp;&nbsp;*/}
        //                 <br/>
        //                 <br/>
        //                 <Button type="primary" danger onClick={() => transactionCreateApplyResult(false,content[8])} style={{width: '80px' }}>
        //                     拒絕
        //                 </Button>
        //                 <div >
        //                 </div>
        //             </div>
        //         </div>
        //     },
        //
        // },
    ]

    const transactionEditApplyColumns = [
        {
            title: '房屋照片',
            dataIndex: 'image',
            key: 'image',
            //   width:'250px',
            width: '40%',
            responsive: ['md'],
            render: (image) => (
                <div style={{
                    height: '250px',
                    'line-height': '250px',
                    overflow: 'hidden',
                }}>
                    <Image
                        src={image}
                        preview={false}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    />
                </div>
            )
        }
,
        {
            // title: '申請人員',
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
                        {content[6]}
                        <br/>
                        <div style={{
                            'color': '#6f2f3f',
                            'fontSize':'20px'
                        }}>{content[7]}</div>
                        <br/>
                        <div >
                            <Button type="primary" onClick={() => transactionEditApplyResult(true,content[8])} style={{width: '80px' }}>
                                同意
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            {/*<br/>*/}
                            {/*<br/>*/}
                            <Button type="primary" danger onClick={() => transactionEditApplyResult(false,content[8])} style={{width: '80px' }}>
                                拒絕
                            </Button>
                        </div>
                    </div>
                </div>
            },

        },
        // {
        //     title: '',
        //     dataIndex: 'content',
        //     key: 'content',
        //      width:'150px',
        //     render: (content) => {
        //         return <div style={{
        //             'textAlign': 'center',
        //         }}>
        //             <div style={{
        //                 'display': 'inline-block',
        //                 'textAlign': 'left',
        //             }}>
        //                 <Button type="primary" onClick={() => transactionEditApplyResult(true,content[8])} style={{width: '80px' }}>
        //                     同意
        //                 </Button>
        //                 {/*&nbsp;&nbsp;&nbsp;*/}
        //                 <br/>
        //                 <br/>
        //                 <Button type="primary" danger onClick={() => transactionEditApplyResult(false,content[8])} style={{width: '80px' }}>
        //                     拒絕
        //                 </Button>
        //                 <div >
        //                 </div>
        //             </div>
        //         </div>
        //     },
        //
        // },
    ]

    const transactionDelApplyColumns = [
         {
            title: '房屋照片',
            dataIndex: 'image',
            key: 'image',
            //   width:'250px',
            width: '40%',
             responsive: ['md'],
            render: (image) => (
                <div style={{
                    height: '250px',
                    'line-height': '250px',
                    overflow: 'hidden',
                }}>
                    <Image
                        src={image}
                        preview={false}
                        fallback="data:image/png;base64,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"
                    />
                </div>
            )
        }
        ,
        {
            // title: '申請人員',
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
                        {content[6]}
                        <br/>
                        <div style={{
                            'color': '#6f2f3f',
                            'fontSize':'20px'
                        }}>{content[7]}</div>
                        <br/>
                        <div >
                            <Button type="primary" onClick={() => transactionDelApplyResult(true,content[8])} style={{width: '80px' }}>
                                同意
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            {/*<br/>*/}
                            {/*<br/>*/}
                            <Button type="primary" danger onClick={() => transactionDelApplyResult(false,content[8])} style={{width: '80px' }}>
                                拒絕
                            </Button>
                        </div>
                    </div>
                </div>
            },

        },
        // {
        //     title: '',
        //     dataIndex: 'content',
        //     key: 'content',
        //      width:'150px',
        //     render: (content) => {
        //         return <div style={{
        //             'textAlign': 'center',
        //         }}>
        //             <div style={{
        //                 'display': 'inline-block',
        //                 'textAlign': 'right',
        //             }}>
        //                 <Button type="primary" onClick={() => transactionDelApplyResult(true,content[8])} style={{width: '80px' }}>
        //                     同意
        //                 </Button>
        //                 {/*&nbsp;&nbsp;&nbsp;*/}
        //                 <br/>
        //                 <br/>
        //                 <Button type="primary" danger onClick={() => transactionDelApplyResult(false,content[8])} style={{width: '80px' }}>
        //                     拒絕
        //                 </Button>
        //                 <div >
        //                 </div>
        //             </div>
        //         </div>
        //     },
        //
        // },
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
            // title: '申請人員',
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
             width:'220px',
            render: (content) => {
                return <div style={{
                    'textAlign': 'center',
                }}>
                    <div style={{
                        'display': 'inline-block',
                        'textAlign': 'left',
                    }}>
                        <Button type="primary" onClick={() => companyApplyResult(true,content[6])} style={{width: '80px' }}>
                            同意
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" danger onClick={() => companyApplyResult(false,content[6])} style={{width: '80px' }}>
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
        setInit(true)
    }
    const showCompanyApplyList = () => {
        getCompanyApplyList()
        // getCompanyHouseList()
        setSwitchPage(2)
        setInit(true)
    }

    return (
        switchPage === 0
            ?
            <div style={{display: 'center', textAlign: 'center'}}>
                <Row>
                    <Col  xs={24} sm={3} md={3} lg={4} xl={9}></Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <div style={{transform: 'translate(0, 300px)', display:'flex'}}>
                            <Button  onClick={showTransactionApplyList}
                                    style={{
                                        width: '380px',
                                        height: '90px',
                                        color:'#FFFFFF',
                                        borderColor: '#FFFFFF',
                                        borderRadius: '34px',
                                        boxShadow: '3px 4px 0px 0px #899599',
                                        background: 'linear-gradient(to bottom, #003C9D 5%, #003C9D 100%)',
                                        backgroundColor: '#003C9D',
                                        cursor: 'pointer',
                                        fontFamily: "'cwTeXKai', serif",
                                        fontSize: '40px',
                                        margin: '40px',

                                    }}
                            >成交審核</Button>
                        </div>
                            {/*<br/>*/}
                            <br/>
                        <div style={{transform: 'translate(0, 250px)', display:'flex'}}>
                        <Button type="primary" onClick={showCompanyApplyList}
                                    style={{
                                        width: '380px',
                                        height: '90px',
                                        color:'#FFFFFF',
                                        borderColor: '#FFFFFF',
                                        borderRadius: '34px',
                                        boxShadow: '3px 4px 0px 0px #899599',
                                        background: 'linear-gradient(to bottom, #003C9D 5%, #003C9D 100%)',
                                        backgroundColor: '#003C9D',
                                        cursor: 'pointer',
                                        fontFamily: "'cwTeXKai', serif",
                                        fontSize: '40px',
                                        margin: '40px',
                            }}
                            >員工審核</Button>
                        </div>
                    </Col>
                    <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>
            </div>

            :
         switchPage === 1
             ?
             <div>
                 <div>
                     {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
                     <div Style='float:right'>
                         <Button type="primary" onClick={() => setSwitchPage(0)} style={{width: '80px'}}>返回</Button>
                     </div>
                     <br/>
                     <br/>
                     <Row>
                         <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             {/*<Button type="primary" onClick={() => setSwitchPage(0)} style={{width: '80px'}}>返回</Button>*/}
                             <Divider>創建審核</Divider>
                             <Table
                                 columns={transactionCreateApplyColumns}
                                 pagination={{ position: ['topLeft', 'bottomRight'] }}
                                 dataSource={transactionCreateApplyList}
                                 onRow={(record, rowIndex) => {
                                     return {
                                         onClick: event => {
                                         }, // click row
                                     };}}
                             />
                             {/*<Button type="primary" onClick={() => setSwitchPage(0)} style={{width: '80px'}}>返回</Button>*/}
                         </Col>
                         <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                     </Row>
                 </div>
                 <br/>
                 <div>
                     <Row>
                         <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Divider>編輯審核</Divider>
                             <Table
                                 columns={transactionEditApplyColumns}
                                 pagination={{ position: ['topLeft', 'bottomRight'] }}
                                 dataSource={transactionEditApplyList}
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
                 <br/>
                 <div>
                     <Row>
                         <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Divider>刪除審核</Divider>
                             <Table
                                 columns={transactionDelApplyColumns}
                                 pagination={{ position: ['topLeft', 'bottomRight'] }}
                                 dataSource={transactionDelApplyList}
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
             </div>

                :
             <div>
                 {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
                 <Row>
                     <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                     <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                         <Divider>員工審核</Divider>
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