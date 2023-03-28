import React, {useEffect, useState} from 'react';
import {
    Table,
    Space,
    Radio,
    Button,
    Image,
    Input,
    Select,
    Divider,
    Row,
    Col,
    DatePicker,
    Alert,
    Checkbox,
    Result,
    Descriptions
} from "antd";
import cookie from 'react-cookies'
import {HouseAxios, UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";
import {log} from "@craco/craco/lib/logger";
import {config} from "../Setting/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {openInNewTab} from './CommonUtil'

const { Option } = Select

const get_reserve_Auth = 'reserveHouse/getReserveHouseOnlyHost'
const remove_reserve_Auth = 'reserveHouse/removeReserveHouse'
const update_reserve_Auth = 'reserveHouse/editReserveHouse'
const houseService = config.base_URL_House
const reserveStateArr = [{ value: '未接洽' },{ value: '接洽中' }, { value: '完成看房' }];
console.log(reserveStateArr[0].value)

const ReserveHouseDetail = (props) => {
    // let { id } = useParams();
    const id = props.reserveHouseDetailId
    console.log(id)
    const [tenantData, setTenantData] = useState([])
    const [enableShowInfo, setEnableShowInfo] = useState(false)
    const [enableDel, setEnableDel] = useState(false)
    const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false)
    const [tempStateObj, setTempStateObj] = useState({})
    const [stateSelected, setStateSelected] = useState()
    const [enableSetup, setEnableSetup] = useState(true)
    console.log(props)
    const deleteReserve = () => {
        setEnableDel(true)
    }

    const cancelRemoveReserveHouse = () => {
        setIsShowDeleteAlert(false)
    }

    const enableRemoveReserveHouse = () => {
        setIsShowDeleteAlert(true)
    }

    //get
    useEffect(() => {
        const xToken = cookie.load('x-token')
        HouseAxios.get(get_reserve_Auth+'?id='+id, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-token" : xToken,
            }}).then((response) => {
                // console.log(response)
            setTenantData(response.data.data)
            setEnableShowInfo(true)
        }).catch( (error) => toast.error(error))
    }, [] )

    const getReserveData = () => {
        const xToken = cookie.load('x-token')
        HouseAxios.get(get_reserve_Auth+'?id='+id, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-token" : xToken,
            }}).then((response) => {
            console.log(response)
            setTenantData(response.data.data)
            setEnableShowInfo(true)
        }).catch( (error) => toast.error(error))
    }

    //delete
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
                data: {"ids" : [id]}
            }).then((response) => {
                    console.log(response)
                if(response.data.status === true){
                    toast.success('刪除成功');
                    setTimeout(()=>{
                        // window.location.href = window.location.origin;
                        props.showReserveHouseListUI()
                    },3000);
                }else{
                    toast.error(response.data.data)
                }
            })
                .catch( (error) => toast.error(error))
        }
    }, [enableDel])

    console.log(tenantData)
    console.log(tenantData.state)
    const updateState = () => {
        const xToken = cookie.load('x-token')
        const reserveHouseValue = tempStateObj;
            console.log(reserveHouseValue)
            let temp = {
                "id": reserveHouseValue._id,
                "client": reserveHouseValue.client,
                "houseId": reserveHouseValue.houseId,
                "state": reserveHouseValue.state,
                "type": reserveHouseValue.type,
                "clientName": reserveHouseValue.clientName,
                "clientPhone": reserveHouseValue.clientPhone
            }
            HouseAxios.put(update_reserve_Auth, temp, {
                headers:{
                    'x-Token':xToken
                }
            }).then((response) => {
                console.log(response)
                if(response.data.status) {
                    getReserveData()
                    setEnableSetup(true)
                }
            }).catch( (error) => toast.error(error))

            console.log(temp)
    }

    const changeState = (stateValue) => {
        setStateSelected(stateValue)
        setEnableSetup(false)
        console.log(stateValue)
        const reserveHouse = Object.assign({}, tenantData);
        console.log(reserveHouse)
        switch(stateValue){
            case reserveStateArr[0].value:
                reserveHouse.state = '0';
                break;
            case reserveStateArr[1].value:
                reserveHouse.state = '1';
                break;
            case reserveStateArr[2].value:
                reserveHouse.state = '2';
                break;
            default:
                break;
        }
        setTempStateObj(reserveHouse)
    }

    return (
        <div>
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
            <div Style='float:right'>
                <Button type="primary"
                        onClick={() => {
                            props.showReserveHouseListUI()
                        }}>
                    返回
                </Button>
                &nbsp;
                <Button type="primary"
                        danger
                        onClick={enableRemoveReserveHouse}>
                    刪除
                </Button>
            </div>
            <br/>
            <br/>
            <Row>
                <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <div>
                        {enableShowInfo ?
                            <div>
                                {/*{id}*/}
                                {/*ReserveHouseDetail page*/}

                                <Divider>租客資訊</Divider>
                                <Descriptions bordered>
                                    <Descriptions.Item label="名稱" span={3}>{tenantData['clientName']}</Descriptions.Item>
                                    <Descriptions.Item label="狀態" span={3}>
                                        <div>
                                <span style={{'fontSize':'20px'}}>
                                    {reserveStateArr[tenantData['state']].value}
                                </span>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Select placeholder="狀態選擇"
                                                    showArrow={false}
                                                    size='large'
                                                    onChange={value => changeState(value)}
                                                    value={stateSelected}
                                                    style={{'width':'100px'}}
                                            >
                                                <Option value="未接洽">未接洽</Option>
                                                <Option value="接洽中">接洽中</Option>
                                                <Option value="完成看房">完成看房</Option>
                                            </Select>
                                            &nbsp;
                                            <Button type="primary"
                                                    disabled={enableSetup}
                                                    onClick={() => {
                                                        setStateSelected(null)
                                                        updateState()
                                                    }}>
                                                設定
                                            </Button>
                                        </div>


                                    </Descriptions.Item>
                                    <Descriptions.Item label="聯絡電話" span={3}>{tenantData['clientPhone']}</Descriptions.Item>
                                    <Descriptions.Item label="申請時間" span={3}>
                                        {new Date(tenantData['createTime']).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="圖片" span={3}>
                                        <Image
                                            src = {`${houseService}/resource/${tenantData['houseData'][0]._id}/photo/${tenantData['houseData'][0]['photo'][0]}`}
                                            preview = {false}
                                            width={250}
                                            fallback ="data:image/png;base64,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"
                                        />
                                        <div>
                                            <Button type="primary"
                                                    onClick={() => {
                                                        openInNewTab(window.location.origin + `/HouseDetail/${tenantData['houseData'][0]['_id']}/`)
                                                    }}
                                            >
                                                詳細房屋資料
                                            </Button>
                                            {/*<a href={window.location.origin+`/HouseDetailOwner/${tenantData['houseData'][0]['_id']}/${tenantData['houseData'][0]['belongId']}`}>*/}
                                            {/*    詳細房屋資料連結*/}
                                            {/*</a>*/}
                                        </div>

                                    </Descriptions.Item>
                                    <Descriptions.Item label="房屋資訊">
                                        地址 : {tenantData['houseData'][0]['address']}
                                        <br />
                                        樓層 : {tenantData['houseData'][0]['floor']} 樓
                                        <br />
                                        格局 :   {tenantData['houseData'][0]['config']['room']} 房
                                        {tenantData['houseData'][0]['config']['livingRoom']} 廳
                                        {tenantData['houseData'][0]['config']['bathroom']} 衛
                                        {tenantData['houseData'][0]['config']['balcony']} 陽台
                                        <br />
                                        屋主 : {tenantData['houseData'][0]['hostName']} {tenantData['houseData'][0]['hostGender'] ? '先生' : '小姐' }
                                        <br />
                                        屋主電話 : {tenantData['houseData'][0]['hostPhone']}
                                        <br />
                                        租金 : {tenantData['houseData'][0]['price'] } 元
                                    </Descriptions.Item>
                                </Descriptions>

                            </div> : []}
                    </div>
                    {/*<br/>*/}
                    {/*<Button type="primary"*/}
                    {/*        onClick={() => {*/}
                    {/*            props.showReserveHouseListUI()*/}
                    {/*        }}>*/}
                    {/*    返回*/}
                    {/*</Button>*/}
                </Col>
            </Row>
        </div>

    );
};

export default ReserveHouseDetail;


//丁一二 ID ：  6356877e5138ab002a1f9cf8
//陳昭倫 ID ：  6356865b5138ab002a1f9cf7
// User ID :   635930615138ab002a1f9cfd

