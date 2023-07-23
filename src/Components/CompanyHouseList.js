import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import moment from 'moment';
import HousesList from "./HousesList";
import {
    useParams
  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyHouseList = (props) => {
    const [init, setInit] = useState(true);
    useEffect(() => {
        if (init) {
            setInit(false)
        }
    }, )
    return (
        <div>
            <ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>
            <HousesList isCompanyList={true} companyId={props.companyId}></HousesList>
        </div>
    );
};

export default CompanyHouseList;
