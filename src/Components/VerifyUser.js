import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker,  Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {LoginRegisterAxios, UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {config} from '../Setting/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// console.log(typeof(window.location.href))
const SighUp_Auth = "/auth/verifyUser"
const User_verify_xToken = window.location.href.split('key=')[1]
console.log(User_verify_xToken)

const VerifyUser = (props) => {

    const [verify, setVerify] = useState([])

    const backToInitPage = () => {
        setTimeout(() => {
            window.location.replace(config.mainPage)
        }, 1000)
    }

    //send VerifyUse Mail api

    useEffect(() => {
        // if (VerifyUserEnable) {
            LoginRegisterAxios.get(SighUp_Auth, {
                headers: {
                    "accept": "application/json",
                    "x-token" : User_verify_xToken,
                }
            })
                .then( (response) =>  {
                    console.log(response)
                    if(response.data.status) {
                        setVerify(true)
                    }else {
                        setVerify(false)
                        toast.error(`${response.data.data}`)
                    }
                })
                .catch( (error) => toast.error(`${error}`))

            // setVerifyUserEnable(false)
        // }
    }, [User_verify_xToken])

    return (
        <div>
            <ToastContainer autoClose={2000} position="top-center"/>
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
