import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
import { defaultIconPrefixCls } from 'antd/lib/config-provider';
// import { UploadOutlined } from '@ant-design/icons';
// import { Text, StyleSheet } from "react-native";
import HousesList from "./HousesList";
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";



const xToken = cookie.load('x-token')
const decodedToken = jwt_decode(xToken);
console.log('===decodedToken====',decodedToken)

const MyHousesList = () => {
    return (

        <div>
            <HousesList owner={decodedToken.id}></HousesList>
        </div>
    );
};

export default MyHousesList;
