import React, {useEffect, useState} from 'react';
import {Form, Button, Modal, Input, Select, Divider, Row, Col, Checkbox, Upload, message} from "antd";
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


    return (

        <div>
            <Button type="primary" onClick={getHousesList}>
                搜尋
            </Button>
            
        </div>
    );
};

export default HousesList;
