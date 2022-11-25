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
    Descriptions
} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";

const CompanyEmployeeInfo = (props) => {
    let { id } = useParams();
    const employeeData = props.info.userData[0]
    console.log(employeeData)
    console.log(props)


    return (
        <div>
            {/*{JSON.stringify(props.info)}*/}
            {/*CompanyEmployeeInfo page*/}
            <div>
                <Row>
                    <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        {/*{id}*/}
                        {/*ReserveHouseDetail page*/}
                        <Divider>員工資訊</Divider>
                        <Descriptions bordered>
                            <Descriptions.Item label="名稱" span={3}>{employeeData.name}</Descriptions.Item>
                            <Descriptions.Item label="性別" span={3}>
                                {employeeData.gender ? '男' : '女'}
                            </Descriptions.Item>
                            <Descriptions.Item label="公司" span={3}>
                                {props.info.companyData[0].name}
                            </Descriptions.Item>
                            <Descriptions.Item label="主管" span={3}>
                                {props.info.managerData.length > 0 ? props.info.managerData[0].name : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="主管郵件" span={3}>
                                {props.info.managerData.length > 0 ? props.info.managerData[0].mail : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="生日" span={3}>{employeeData.bornDate}</Descriptions.Item>
                            <Descriptions.Item label="聯絡電話" span={3}>{employeeData.phone}</Descriptions.Item>
                            <Descriptions.Item label="聯絡地址" span={3}>{employeeData.address}</Descriptions.Item>
                            <Descriptions.Item label="電子郵件" span={3}>{employeeData.mail}</Descriptions.Item>
                            <Descriptions.Item label="負責區域" span={3}>
                                 {employeeData.rolesInfo.sales.scope[0].city} {employeeData.rolesInfo.sales.scope[0].area}
                            </Descriptions.Item>

                        </Descriptions>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CompanyEmployeeInfo;
