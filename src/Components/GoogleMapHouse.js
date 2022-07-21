import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {config} from "../Setting/config";
const MapSource = "https://www.google.com/maps/embed/v1/place?key=" +config.GoogleMapKey + "&q=116台北市文山區興隆路2段96巷"
console.log(MapSource)

const GoogleMapHouse = (props) => {
    return (
            <iframe
                width="600"
                height="450"
                style={{border: "0"}}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={MapSource}
            >
            </iframe>
    );
};

export default GoogleMapHouse;
