import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';


const ResetPassword = (props) => {
    return (
        <div>
            ResetPassword
        </div>
    );
};

export default ResetPassword;
