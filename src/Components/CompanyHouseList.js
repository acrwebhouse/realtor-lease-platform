import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import HousesList from "./HousesList";
import {
    useParams
  } from "react-router-dom";

const CompanyHouseList = (props) => {
    return (
        <div>
            <HousesList isCompanyList={true} companyId={props.companyId}></HousesList>
        </div>
    );
};

export default CompanyHouseList;
