import React, {useEffect, useState} from 'react';
import {
    Table,
    Space,
    Radio,
    Button,
    Image,
    Input,
    Select,
    Divider,
    Row,
    Col,
    DatePicker,
    message,
    Alert,
    Checkbox,
    Result,
    Form
} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import Captcha from "demos-react-captcha";


const Link = (props) => {

    return (
        <div>
            <Row>
                <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                </Col>
                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                    <h1>內政部 地政司</h1>
                    <a href="https://www.land.moi.gov.tw/chhtml/content/10?mcid=4010">
                        https://www.land.moi.gov.tw/chhtml/content/10?mcid=4010
                    </a>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                </Col>
                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                    <h1>全國法規資料庫</h1>
                    <a href="https://law.moj.gov.tw/LawClass/LawSingleRela.aspx?PCODE=B0000001&FLNO=455&ty=L">
                        https://law.moj.gov.tw/LawClass/LawSingleRela.aspx?PCODE=B0000001&FLNO=455&ty=L
                    </a>
                </Col>
            </Row>
            &nbsp;
            <Row>
                <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                </Col>
                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                    <h1>租屋電費一度5元合理嗎？台電計費房源這樣找！</h1>
                    <a href="https://tw.sports.yahoo.com/news/%E7%A7%9F%E5%B1%8B%E9%9B%BB%E8%B2%BB-%E5%BA%A65%E5%85%83%E5%90%88%E7%90%86%E5%97%8E-%E5%8F%B0%E9%9B%BB%E8%A8%88%E8%B2%BB%E6%88%BF%E6%BA%90%E9%80%99%E6%A8%A3%E6%89%BE-073854606.html">
                        https://tw.sports.yahoo.com/news/%E7%A7%9F%E5%B1%8B%E9%9B%BB%E8%B2%BB-%E5%BA%A65%E5%85%83%E5%90%88%E7%90%86%E5%97%8E-%E5%8F%B0%E9%9B%BB%E8%A8%88%E8%B2%BB%E6%88%BF%E6%BA%90%E9%80%99%E6%A8%A3%E6%89%BE-073854606.html
                    </a>
                </Col>
            </Row>
        </div>
    );
};

export default Link;
