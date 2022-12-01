import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";
import ReserveHouseList from "./ReserveHouseList";
import ReserveHouseDetail from "./ReserveHouseDetail";


const ReserveSwitching = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [isShowReserveHouseList, setIsShowReserveHouseList] = useState(false);
    const [isShowReserveHouseDetail, setIsShowReserveHouseDetail] = useState(false);

    function showHouseListUI(){
        setIsShowReserveHouseList(true)
        setIsShowReserveHouseDetail(false)
    }

    function showHouseDetailUI(){
        setIsShowReserveHouseList(false)
        setIsShowReserveHouseDetail(true)
    }

    useEffect(() => {
            if (init) {
                setIsShowReserveHouseList(true)
            }
            setInit(false)
    }, )

    return (
        <div>
            {
                isShowReserveHouseList?(<ReserveHouseList showHouseListUI={showHouseListUI}></ReserveHouseList>):null
            }
            {
                isShowReserveHouseDetail?(<ReserveHouseDetail showHouseDetailUI={showHouseDetailUI} HouseID={HouseID}></ReserveHouseDetail>):null
            }
        </div>
    );
};

export default ReserveSwitching;
