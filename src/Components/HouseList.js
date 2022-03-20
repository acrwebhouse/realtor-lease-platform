import React, {useEffect, useState} from 'react';
import {Tag, Button, Modal, Input, Select, Divider, Row, Col, Checkbox, message} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
// import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
        md: {
            span: 8,
        },
        lg: {
            span: 8,
        }
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 16,
        }
    },
};

// const defaultSaleType = 1;
// console.log(defaultSaleType)
const defaultExtraRequire = [];
const housesListUrl = 'house/getHouses'
const xToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"

const HousesList = () => {

    // const [form] = Form.useForm();

    // const [isUploadVisible, setIsIUploadVisible] = useState(false);
    // const [extraRequire, setExtraRequire] = useState(defaultExtraRequire);
    // const [ShowHideManageFee, setShowHideManageFee] = useState(false );
    // const [ShowHideGarbageFee, setShowHideGarbageFee] = useState(false );
    const [isRunPicPost, setIsRunPicPost] = useState(false)



    const getHousesArg ={
        start : '0',
        count : '10',
        timeSort : '1',
        priceSort : '',
        pingSort : '',
        isDelete : 'false',
        minPrice : '0',
        maxPrice : '9999999',
        minPing : '0',
        maxPing : '999999',
        minRoom : '0',
        maxRoom : '999999',
        salesCity : '',
        salesArea : '',
    }


    useEffect(() => {
        // console.log(RegisterData)
        // console.log(CityAreaScope)
        if (isRunPicPost) {
            // HouseAxios.post(House_Auth, XToken)
            //     .then( (response) => console.log(response))
            //     .then(() => message.success(`成功`, 2))
            //     .catch( (error) => message.error(`${error}`, 2))

            // setIsRunPicPost(false)
        }
    }, [isRunPicPost, ])

    const getHousesList = () => {
        
        let reqUrl = `${housesListUrl}?start=${getHousesArg.start}&&count=${getHousesArg.count}&&isDelete=${getHousesArg.isDelete}&&minPrice=${getHousesArg.minPrice}&&maxPrice=${getHousesArg.maxPrice}&&minPing=${getHousesArg.minPing}&&maxPing=${getHousesArg.maxPing}&&minRoom=${getHousesArg.minRoom}&&maxRoom=${getHousesArg.maxRoom}`
        
        if(getHousesArg.timeSort !==''){
            reqUrl = `${reqUrl}&&timeSort=${getHousesArg.timeSort}`
        }

        if(getHousesArg.pingSort !==''){
            reqUrl = `${reqUrl}&&pingSort=${getHousesArg.pingSort}`
        }

        if(getHousesArg.priceSort !==''){
            reqUrl = `${reqUrl}&&priceSort=${getHousesArg.priceSort}`
        }

        console.log('====reqUrl===',reqUrl)

        HouseListAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        ).then( (response) => console.log(response))
        .catch( (error) => message.error(`${error}`, 2))
    }
    

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const cityOptions = [{ value: '基隆市' }, { value: '台北市' }, { value: '新北市' }, { value: '桃園縣' }, { value: '新竹市' }, { value: '新竹縣' }, { value: '苗栗縣' }, { value: '台中市' }, { value: '彰化縣' }, { value: '南投縣' }, { value: '雲林縣' }, { value: '嘉義市' }, { value: '嘉義縣' }, { value: '台南市' }, { value: '高雄市' }, { value: '屏東縣' }, { value: '台東縣' }, { value: '花蓮縣' }, { value: '宜蘭縣' }, { value: '澎湖縣' }, { value: '金門縣' }, { value: '連江縣' }];

    return (

        <div>

            <Select placeholder="縣市" options={cityOptions} style={{
                            width: 150,
                        }}>
                
            </Select>

            <Select  mode="multiple" allowClear placeholder="區域" onChange={handleChange} style={{
                            width: 150,
                        }}>
                <Option value="pet">文山區</Option>
                <Option value="smoke">大安區</Option>           
            </Select>

            <Select placeholder="類型" style={{
                            width: 150,
                        }}>
                <Option value="typeOfRental1">整層住家</Option>
                <Option value="typeOfRental2">獨立套房</Option>
                <Option value="typeOfRental3">分租套房</Option>
                <Option value="typeOfRental4">雅房</Option>
            </Select>

            <Select placeholder="租金" style={{
                            width: 150,
                        }}>
                <Option value="rentLimit5000">0-5000</Option>
                <Option value="rentLimit10000">5000-10000</Option>
                <Option value="rentLimit20000">10000-20000</Option>
                <Option value="rentLimit30000">20000-30000</Option>
                <Option value="rentLimit40000">30000-40000</Option>
                <Option value="rentNoLimit">40000 以上</Option>
                <Option value="rentCustom">自訂租金範圍</Option>
            </Select>
            
            <Select placeholder="格局" style={{
                            width: 150,
                        }}>
                <Option value="room1">1 房</Option>
                <Option value="room2">2 房</Option>
                <Option value="room3">3 房</Option>
                <Option value="room4Up">4 房以上</Option>
            </Select>

            <Select placeholder="型態" style={{
                            width: 150,
                        }}>
                <Option value="buildingType1">公寓</Option>
                <Option value="buildingType2">電梯大樓</Option>
                <Option value="buildingType3">透天</Option>
            </Select>

            <Select placeholder="坪數" style={{
                            width: 150,
                        }}>
                <Option value="pingLimit10">10 坪以下</Option>
                <Option value="pingLimit20">10 ~ 20 坪</Option>
                <Option value="pingLimit30">20 ~ 30 坪</Option>
                <Option value="pingLimit40">30 ~ 40 坪</Option>
                <Option value="pingLimit50">40 ~ 50 坪</Option>
                <Option value="pingCustom">自訂坪數範圍</Option>
            </Select>

            <Select placeholder="樓層" style={{
                            width: 150,
                        }}>
                <Option value="floorLimit1">1 層</Option>
                <Option value="floorLimit6">2 層 ~ 6 層</Option>
                <Option value="floorLimit12">6 層 ~ 12 層</Option>
                <Option value="floorNoLimit">12 層以上</Option>
                <Option value="floorCustom">自訂樓層範圍</Option>
            </Select>
            <br/><br/>
            <Select  mode="multiple" allowClear placeholder="特色" onChange={handleChange} style={{
                            width: 150,
                        }}>
                <Option value="pet">可養寵物</Option>
                <Option value="smoke">可吸菸</Option>
                <Option value="cook">可開伙</Option>
                <Option value="manager">有管理員</Option>
                <Option value="parking">有車費</Option>
                <Option value="garbage">倒垃圾服務</Option>
                
            </Select>

            



            <br/><br/>
            <Button type="primary" onClick={getHousesList}>
                搜尋
            </Button>
            
            
        </div>
    );
};

export default HousesList;
