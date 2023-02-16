import React, {useEffect, useState} from 'react';
import {
    Button,
    Input,
    Row,
    Col,
    Form, Result
} from "antd";
// import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
// import jwt_decode from "jwt-decode";
// import moment from 'moment';
import Captcha from "demos-react-captcha";
import cookie from "react-cookies";
import {config} from '../Setting/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const userData_Auth = '/user/getPersonalInfo'
const editUser_Auth = 'user/editUser'
const User_verify_xToken = window.location.href.split('key=')[1]
// console.log(User_verify_xToken)

const ResetPassword = (props) => {

    const [form] = Form.useForm();
    const [UserData, setUserData] = useState([])
    const [enableResetPassword, setEnableResetPassword] = useState(false)
    const [ChangingVerify, setChangingVerify] = useState(true)
    const [verify, setVerify] = useState(true)

    useEffect(() => {
        UserAxios.get(
            userData_Auth,{
                headers:{
                    'x-Token':User_verify_xToken
                }
            }
        )
            .then( (response) => {
                console.log(response)
                if(response.data.data.bornDate === undefined || response.data.data.bornDate === null ){
                    response.data.data.bornDate = ''
                }
                setUserData(response.data.data)
            })
            .catch( (error) => toast.error(error))
    }, [])

    useEffect(() => {
        console.log(enableResetPassword)
        if (enableResetPassword) {
            UserAxios.put(editUser_Auth, UserData,{
                    headers:{
                        "accept": "application/json",
                        'x-Token': User_verify_xToken,
                        'Content-Type': "application/json"
                    }
                }
            )
                .then( (response) => {
                    console.log(response)
                    if(response.data.status === true){
                        console.log(response.data)
                        setVerify(true)
                        cookie.save('x-token',response.data.data.token,{path:'/'})
                    }else{
                        toast.error(response.data.data).then()
                        setVerify(false)
                    }
                })
                .catch( (error) => {
                    toast.error(error)
                    setVerify(false)
                })

            setEnableResetPassword(false)
        }


    }, [enableResetPassword, UserData])

    console.log(typeof(UserData))
    console.log(UserData)

    const verifyCaptcha = (value) => {
        console.log(value)
    }

    const setResetPassword = (values) => {
        console.log(values)
        if(values['CaptchaVerify']) {
            setUserData({
                "id": UserData['_id'],
                "account": UserData['account'],
                "password": values['password'],
                "name": UserData['name'],
                "gender": UserData['gender'],
                "roles": UserData['roles'],
                "rolesInfo": UserData['rolesInfo'],
                "houseIds": [],
                "phone": UserData['phone'],
                "mail": UserData['mail'],
                "address": UserData['address'],
                "bornDate": UserData['bornDate']
            })
            setEnableResetPassword(true)
            setTimeout(() => {
                setChangingVerify(false)
            }, 1000)

        }
    }

    const backToInitPage = () => {
        setTimeout(() => {
            window.location.replace(config.mainPage)
        }, 1000)
    }

    return (
        <div>
            <ToastContainer autoClose={2000} position="top-center"/>
            { ChangingVerify ?
                <div>

                    <Form
                        form={form}
                        className="resetPassword_form"
                        name="resetPasswordForm"
                        onFinish={setResetPassword}
                        scrollToFirstError
                    >
                        <Row>
                            <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <h1>重置密碼</h1>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Form.Item
                                    name="password"
                                    label="密碼"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密碼欄位不能空白',
                                        },
                                    ]}
                                    hasFeedback
                                    style={{ width: '50%' }}
                                >
                                    <Input.Password size="large" placeholder="" style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Form.Item
                                    name="confirm"
                                    label="密碼確認"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: '密碼確認欄位不能空白',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('輸入的值與密碼不相符'));
                                            },
                                        }),
                                    ]}
                                    style={{ width: '50%' }}
                                >
                                    <Input.Password size="large" placeholder="" style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Form.Item
                                    name="CaptchaVerify"
                                    // label="英數驗證"
                                    rules={[
                                        {
                                            required: true,
                                            // message: '密碼欄位不能空白',
                                        },
                                    ]}
                                    hasFeedback
                                    style={{ width: '50%' }}
                                >
                                    <Captcha onChange={verifyCaptcha}
                                             placeholder="Enter captcha"
                                             onRefresh={()=>{}}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={5} md={5} lg={6} xl={8}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Form.Item>
                                    <Button type="primary"
                                            htmlType="submit"
                                            className='login-form-button'
                                            shape="round"
                                            style={{ width: '50%' }}
                                    >
                                        {/*Submit*/}
                                        送出
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                :
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
            }
        </div>
    );
};

export default ResetPassword;
