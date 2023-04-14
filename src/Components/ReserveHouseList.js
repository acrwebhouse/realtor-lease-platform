import React, {useEffect, useState,forwardRef,useImperativeHandle} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker,  Alert, Checkbox, Result, Switch} from "antd";
import cookie from 'react-cookies'
import {HouseAxios, UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {config} from "../Setting/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

const houseService = config.base_URL_House
const ReserveHouseList_Auth = 'reserveHouse/getReserveHousesOnlyHost'
const ReserveHouseListForClient_Auth = 'reserveHouse/getReserveHousesOnlyClient'
const houseDefaultImage = 'data:image/png;base64,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'
const remove_reserve_Auth = 'reserveHouse/removeReserveHouse'
const sortOptions = [{ value: '時間近到遠' }, { value: '時間遠到近' }, { value: '接洽狀態' }];
const reserveStateOptions = [{ value: '未接洽' }, { value: '接洽中' }, { value: '完成看房' }];
const reserveStateArr = ['未接洽', '接洽中', '完成看房']
console.log(sortOptions[2].value)
const ReserveHouseList = (props, ref) => {
    console.log(props)
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({})
    const [reserveHouseData, setReserveHouseData] = useState([])
    const [reserveHouseDataForClient, setReserveHouseDataForClient] = useState([])
    const [enableDel, setEnableDel] = useState(false);
    const [enableCancel, setEnableCancel] = useState(false);
    const [isShowDeleteAlert, SetIsShowDeleteAlert] = useState(false);
    const [delId, setDelId] = useState('');
    const [showStartOrCountOrState, setShowStartOrCountOrState] = useState(0)
    const [getHousesArg] = useState({
        start : '0',
        count : '999999',
        timeSort : '-1',
        state : '',
        type : '',
    });
    const [showPage, setShowPage] = useState(false)

    useEffect(() => {
        if (init) {
            setInit(false)
            const xToken = cookie.load('x-token')
            checkUser(xToken)
        }
    }, )
    const checkUser = (xToken) => {
        const userListUrl = 'user/getPersonalInfo'
        let reqUrl = `${userListUrl}`
        UserAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
            .then( (response) => {
                if(response.data.status) {
                    console.log(response)
                    setUser(response.data.data)
                    setShowPage(true)
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    console.log(user.roles)
    // sales
    useEffect(() => {
        let reqUrl = `${ReserveHouseList_Auth}?start=${getHousesArg.start}&&state=${getHousesArg.state}&&count=${getHousesArg.count}&&timeSort=${getHousesArg.timeSort}`
        const xToken = cookie.load('x-token')
        HouseAxios.get(reqUrl, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-token" : xToken,
            }}).then((response) => {
            console.log(response)
            resolveHousesList(response)
            // setReserveHouseData(response.data.data)
        }).catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })

    }, [] )

    // client
    useEffect(() => {
        let reqUrlClient = `${ReserveHouseListForClient_Auth}?start=${getHousesArg.start}&&count=${getHousesArg.count}&&state=${getHousesArg.state}&&timeSort=${getHousesArg.timeSort}`
        const xToken = cookie.load('x-token')

        HouseAxios.get(reqUrlClient, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-token" : xToken,
            }}).then((response) => {
            console.log(response)
            resolveHousesListForClient(response)
            // setReserveHouseData(response.data.data)
        }).catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }, [] )
    console.log(reserveHouseData)

    useImperativeHandle(ref, () => ({
        refreshList() {
            getHousesList()
            getHousesListForClient()
        }
    }))
    //sales
    const getHousesList = () => {
        const xToken = cookie.load('x-token')
        let reqUrl = `${ReserveHouseList_Auth}?start=${getHousesArg.start}&&count=${getHousesArg.count}&&state=${getHousesArg.state}&&timeSort=${getHousesArg.timeSort}`
        HouseAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
            .then( (response) => {
                resolveHousesList(response)
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }
    //Client
    const getHousesListForClient = () => {
        const xToken = cookie.load('x-token')
        let reqUrlClient = `${ReserveHouseListForClient_Auth}?start=${getHousesArg.start}&&count=${getHousesArg.count}&&state=${getHousesArg.state}&&timeSort=${getHousesArg.timeSort}`
        HouseAxios.get(
            reqUrlClient,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
            .then( (response) => {
                resolveHousesListForClient(response)
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }
    //sales
    const resolveHousesList = (response) => {
        console.log(response)
        let data = []
        if(response.data && response.data.data){

            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){

                const item = {
                    key: i,
                    id: items[i]._id,
                    clientContent: [`租客:${items[i].clientName}`, `租客電話:${items[i].clientPhone}`, `價格：${items[i].houseData[0].price}`, `${items[i]._id}`, reserveStateArr[items[i].state]],
                    client: items[i].client,
                    clientName: items[i].clientName,
                    clientPhone: items[i].clientPhone,
                    host: items[i].host,
                    houseId: items[i].houseId,
                    state: items[i].state,
                    // time: items[i].updateTime,
                    content: [`${items[i].houseData[0].name}`,`地址:${items[i].houseData[0].address}`, `屋主：${items[i].houseData[0].hostName}`, `價格：${items[i].houseData[0].price} `,
                        `坪數：${items[i].houseData[0].ping}`,
                        `格局：${items[i].houseData[0]['config']['room']}房${items[i].houseData[0]['config']['livingRoom']}廳${items[i].houseData[0]['config']['bathroom']}衛${items[i].houseData[0]['config']['balcony']}陽台`]
                }
                if(items[i].houseData[0].photo && items[i].houseData[0].photo.length > 0){
                    item.image = `${houseService}/resource/${items[i].houseData[0]._id}/photo/${items[i].houseData[0].photo[0]}`
                }else{
                    item.image = houseDefaultImage
                }

                let date = ''+new Date(items[i].updateTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})
                date= date.substring(0,date.indexOf(' '))
                item.time = `更新時間 : ${date}`

                data.push(item)
            }
            setReserveHouseData(data)
        }
    }
    //client
    const resolveHousesListForClient = (response) => {
        console.log(response)
        let data = []
        if(response.data && response.data.data){

            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){

                const item = {
                    key: i,
                    id: items[i]._id,
                    clientContent: [`租客:${items[i].clientName}`, `租客電話:${items[i].clientPhone}`, `價格：${items[i].houseData[0].price}`, `${items[i]._id}`, reserveStateArr[items[i].state]],
                    client: items[i].client,
                    clientName: items[i].clientName,
                    clientPhone: items[i].clientPhone,
                    host: items[i].host,
                    houseId: items[i].houseId,
                    state: items[i].state,
                    // time: items[i].updateTime,
                    content: [`${items[i].houseData[0].name}`,`地址:${items[i].houseData[0].address}`, `屋主：${items[i].houseData[0].hostName}`, `價格：${items[i].houseData[0].price} `,
                        `坪數：${items[i].houseData[0].ping}`,
                        `格局：${items[i].houseData[0]['config']['room']}房${items[i].houseData[0]['config']['livingRoom']}廳${items[i].houseData[0]['config']['bathroom']}衛${items[i].houseData[0]['config']['balcony']}陽台`]
                }
                if(items[i].houseData[0].photo && items[i].houseData[0].photo.length > 0){
                    item.image = `${houseService}/resource/${items[i].houseData[0]._id}/photo/${items[i].houseData[0].photo[0]}`
                }else{
                    item.image = houseDefaultImage
                }

                let date = ''+new Date(items[i].updateTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})
                date= date.substring(0,date.indexOf(' '))
                item.time = `更新時間 : ${date}`

                data.push(item)
            }
            setReserveHouseDataForClient(data)
        }
    }

    const queryHouse = (houseId) => {
        console.log(houseId)
        const xToken = cookie.load('x-token')
        const decodedToken = jwt_decode(xToken);
        // openInNewTab(`/reserveHouseDetail/${houseId}`)
        props.showReserveHouseDetailUI(houseId)
    }

    const columns = [
        {
            title: '房屋照片',
            dataIndex: 'image',
            key: 'image',
            //   width:'250px',
            width:'40%',
            render: (image) => (
                <div style={{
                    height:'250px',
                    overflow:'hidden',
                }}>
                    <Image
                        src = {image}
                        preview = {false}
                        fallback ="data:image/png;base64,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"
                    />
                </div>
            )
        },
        // {
        //     title: '房屋資訊',
        //     key: 'content',
        //     dataIndex: 'content',
        //     render: (content) => (
        //         <div style={{
        //             //   'textAlign': 'center',
        //         }}>
        //             <Row>
        //                 <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
        //                 <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        //                     <div style={{
        //                         //   'display': 'inline-block',
        //                         //   'textAlign': 'left',
        //                     }}>
        //                         <div style={{
        //                             'color': '#0000ff',
        //                             'fontSize':'20px'
        //                         }}>{content[0]}</div>
        //
        //                         <div style={{
        //                             'color':'#FF0000',
        //                             'fontSize':'20px'
        //                         }}>{content[1]}</div>
        //
        //                         {content[2]}
        //                         <br/>
        //                         {content[3]}
        //                         <br/>
        //                         {content[4]}
        //                         <br/>
        //                         {content[5]}
        //                         <br/>
        //                     </div>
        //                 </Col>
        //             </Row>
        //         </div>
        //     ),
        // },
        showPage?{
            title: user.roles.length === 1 && user.roles.includes(3) ? '房屋資訊' : '租客資訊',
            key: 'clientContent',
            dataIndex: 'clientContent',
            render: (clientContent) => (
                <div style={{
                    //   'textAlign': 'center',
                }}>
                    <Row>
                        <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                            <div style={{
                                //   'display': 'inline-block',
                                //   'textAlign': 'left',
                            }}>


                                <div style={{
                                    'color': '#0000ff',
                                    'fontSize':'20px'
                                }}>{clientContent[0]}</div>

                                <div style={{
                                    'color':'#865432',
                                    'fontSize':'20px'
                                }}>{clientContent[1]}</div>

                                <div style={{
                                    'color':'#ff00ff',
                                    'fontSize':'20px'
                                }}>{clientContent[2]}</div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <Button type="primary" onClick={() => {queryHouse(clientContent[3])}} style={{width: '70px' }}>
                                    查看
                                </Button>
                                &nbsp;
                                <Button type="primary"
                                        disabled={isShowDeleteAlert}
                                        onClick={() =>{
                                            SetIsShowDeleteAlert(true)
                                            setDelId(clientContent[3])
                                        }}
                                        danger
                                        style={{width: '70px'}}
                                >
                                    刪除
                                </Button>
                            </div>
                            <div style={{
                                'color': '#FF0000',
                                'fontSize':'40px'
                            }}>{clientContent[4]}</div>
                        </Col>
                    </Row>
                </div>
            ),
        }:[],

    ];

    console.log(columns)

    //delete for sales
    useEffect(() => {
        const xToken = cookie.load('x-token')
        if(enableDel) {
            // const clientId = {
            //     "ids" : [id]
            // }
            // console.log(clientId)
            HouseAxios.delete(remove_reserve_Auth, {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "x-token" : xToken,
                },
                data: {"ids" : [delId]}
            }).then((response) => {
                console.log(response)
                if(response.data.status === true){
                    toast.success('刪除成功');
                    // setTimeout(()=>{
                    //     window.location.href = window.location.origin;
                    // },3000);
                    SetIsShowDeleteAlert(false)
                    getHousesList()
                }else{
                    toast.error(response.data.data)
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
        }
    }, [enableDel])

    console.log(delId)

    //cancel for Client
    useEffect(() => {
        const xToken = cookie.load('x-token')
        if(enableCancel) {
            // const clientId = {
            //     "ids" : [id]
            // }
            // console.log(clientId)
            HouseAxios.delete(remove_reserve_Auth, {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "x-token" : xToken,
                },
                data: {"ids" : [delId]}
            }).then((response) => {
                console.log(response)
                if(response.data.status === true){
                    toast.success('已取消預約');
                    // setTimeout(()=>{
                    //     window.location.href = window.location.origin;
                    // },3000);
                    SetIsShowDeleteAlert(false)
                    getHousesListForClient()
                }else{
                    toast.error(response.data.data)
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
        }
    }, [enableDel])

    const deleteReserve = () => {
        setEnableDel(true)
    }

    const cancelRemoveReserveHouse = () => {
        SetIsShowDeleteAlert(false)
    }

    const changeSort = (sort) => {
        getHousesArg.timeSort = ''
        switch(sort){
            case sortOptions[0].value:
                getHousesArg.timeSort = '-1';
                setShowStartOrCountOrState(0);
                break;
            case sortOptions[1].value:
                getHousesArg.timeSort = '1';
                setShowStartOrCountOrState(0);
                break;
            case sortOptions[2].value:
                getHousesArg.timeSort = '-1';
                setShowStartOrCountOrState(1);
                break;
            default:
                getHousesArg.timeSort = '-1';
                setShowStartOrCountOrState(0);
        }
    }
    console.log(getHousesArg)
    console.log(showStartOrCountOrState)

    const changeState = (sort) => {

        switch(sort){
            case reserveStateOptions[0].value:
                getHousesArg.state = 0
                break;
            case reserveStateOptions[1].value:
                getHousesArg.state = 1
                break;
            case reserveStateOptions[2].value:
                getHousesArg.state = 2
                break;
            default:
                getHousesArg.state = ''
        }
    }

    console.log(reserveHouseData)
    return (
        <div style={{width: '100%' }}>
            <ToastContainer autoClose={2000} position="top-center"/>
            {
                isShowDeleteAlert?(
                    <div style={{'position':'sticky' ,'top':'0px','zIndex':100 }}>
                        <Alert
                            afterClose={cancelRemoveReserveHouse}
                            type="error"
                            action={
                                <Space>
                                    <Button size="small" type="ghost" onClick={deleteReserve}>
                                        確定刪除
                                    </Button>
                                    <Button size="small" type="ghost" onClick={cancelRemoveReserveHouse}>
                                        取消刪除
                                    </Button>
                                </Space>

                            }
                            closable
                        />
                    </div>
                ):null
            }

            <div>
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Button type="primary" onClick={getHousesList} style={{
                            width: '100%',
                            height: '40px',
                            backgroundColor:'#008000'
                        }}>
                            搜尋
                        </Button>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select allowClear placeholder="排序:默認時間近到遠" size='large' options={sortOptions} onChange={changeSort} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        {showStartOrCountOrState !== 0 ?
                                    // <Input id="stateNo"  allowClear
                                    //        onChange={
                                    //              (e) => getHousesArg.state = reserveStateArr.indexOf(e.target.value) < 0 ?  0 : reserveStateArr.indexOf(e.target.value)
                                    //         }
                                    //        placeholder="填狀態 EX：接洽中"
                                    //        style={{
                                    //         width: '100%',
                                    //         height: '40px',
                                    // }}>
                                    // </Input>
                                <Select allowClear placeholder="選狀態" size='large' options={reserveStateOptions} onChange={changeState} style={{
                                    width: '100%',
                                }}>
                                </Select>
                            :
                            []
                        }
                    </Col>
                    <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>
                <Row>
                    <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Table columns={columns}
                            // columns={isShowDel? columns : filterdColumns}
                               dataSource={reserveHouseData}
                               pagination={{ position: ['topLeft', 'bottomRight'] }}
                               onRow={(record, rowIndex) => {
                                   return {
                                       onClick: event => {
                                           // if(!isShowDel){
                                           //     console.log('event',event)
                                           console.log('record',record)
                                           // changeState(record.key)
                                           //     console.log('rowIndex',rowIndex)
                                           //     console.log(reserveHouseListDetail[record.key])
                                           //     // openInNewTab(`/reserveHouseDetail/${reserveHouseListDetail[record.key]._id}`)
                                           // } else {
                                           //     setDelId(reserveHouseListDetail[record.key]._id)
                                           // }
                                       }, // click row
                                   };}}
                        />
                    </Col>
                    <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>
            </div>
        </div>
    );
};

export default forwardRef(ReserveHouseList);
