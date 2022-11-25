import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";

const CompanyEmployeesList = (props) => {
    let { id } = useParams();
    return (
        <div>
            {id}
            CompanyEmployeesList page
            
        </div>
    );
};

export default CompanyEmployeesList;
