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
    message,
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

const get_reserve_Auth = 'reserveHouse/getReserveHouseOnlyHost'
const remove_reserve_Auth = 'reserveHouse/removeReserveHouse'

const ReserveHouseDetail = (props) => {
    let { id } = useParams();
    console.log(id)

    const [tenantData, setTenantData] = useState([])
    const [enableShowInfo, setEnableShowInfo] = useState(false)
    const [enableDel, setEnableDel] = useState(false)
    const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false)

    const deleteReserve = () => {
        setEnableDel(true)
    }

    const cancelRemoveReserveHouse = () => {
        setIsShowDeleteAlert(false)
    }

    const enableRemoveReserveHouse = () => {
        setIsShowDeleteAlert(true)
    }

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
        }).catch( (error) => message.error(error, 3))
    }, [] )

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
                    message.success('刪除成功', 3);
                    setTimeout(()=>{
                        window.location.href = window.location.origin;
                    },3000);
                }else{
                    message.error(response.data.data, 3)
                }
            })
                .catch( (error) => message.error(error, 3))
        }
    }, [enableDel])

    console.log(tenantData)


    return (
        <div>
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
                {enableShowInfo ?
                <div>
                    {/*{id}*/}
                    {/*ReserveHouseDetail page*/}
                    <div Style='float:right'>
                        <Button type="primary"
                                danger
                                onClick={enableRemoveReserveHouse}>
                            刪除
                        </Button>
                    </div>)
                    <Divider>租客資訊</Divider>
                    <Descriptions bordered>
                        <Descriptions.Item label="名稱">{tenantData['clientName']}</Descriptions.Item>
                        <Descriptions.Item label="聯絡電話">{tenantData['clientPhone']}</Descriptions.Item>
                        <Descriptions.Item label="申請時間">
                            {new Date(tenantData['createTime']).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}
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
        </div>
    );
};

export default ReserveHouseDetail;


//丁一二 ID ：  6356877e5138ab002a1f9cf8
//陳昭倫 ID ：  6356865b5138ab002a1f9cf7
// User ID :   635930615138ab002a1f9cfd

