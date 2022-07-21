import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';


const VerifyUser = (props) => {

    const [verify, setVerify] = useState(true)

    const backToInitPage = () => {
        setTimeout(() => {
            window.location.replace("https://matchrentdev.com")
        }, 1000)
    }

    return (
        <div>
            {verify ? <Result
                    status="success"
                    title="您的帳戶成功通過驗證"
                    subTitle="您已能使用此帳號登入我們的平台進行各項功能服務"
                    extra={[
                        <Button type="primary" onClick={backToInitPage}>
                            返回 ACR platform
                        </Button>,
                    ]}
                />
                :
                <Result
                    status="error"
                    title="您的帳戶無法通過驗證"
                    subTitle="發生未知錯誤，您暫時無法使用此帳號登入我們的平台進行各項功能服務，請重新驗證帳戶。"
                    extra={[
                        <Button type="primary" onClick={backToInitPage}>
                            返回 ACR platform
                        </Button>,
                    ]}
                />}
        </div>
    );
};

export default VerifyUser;
