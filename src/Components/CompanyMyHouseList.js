import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";

const CompanyMyHouseList = (props) => {
    let { id } = useParams();
    return (
        <div>
            {id}
            CompanyMyHouseList page
            
        </div>
    );
};

export default CompanyMyHouseList;
