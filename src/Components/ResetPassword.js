import React, {useEffect, useState} from 'react';
import {
    Button,
    Input,
    Row,
    Col,
    Form, Result
} from "antd";
import {LoginRegisterAxios, UserAxios} from './axiosApi'
import Captcha from "demos-react-captcha";
import cookie from "react-cookies";
import {config} from '../Setting/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

const userData_Auth = '/user/getPersonalInfo'
const editUser_Auth = 'user/editUser'
const resetPassword_Auth = '/auth/resetPassword'
const User_verify_xToken = window.location.href.split('key=')[1]
// //concole.log(User_verify_xToken)

const ResetPassword = (props) => {

    const [form] = Form.useForm();
    const [UserData, setUserData] = useState([])
    const [enableResetPassword, setEnableResetPassword] = useState(false)
    const [ChangingVerify, setChangingVerify] = useState(true)
    const [verify, setVerify] = useState(true)
    const [resetPassword] = useState({
        newPassword: ''
    })

    // useEffect(() => {
    //     UserAxios.get(
    //         userData_Auth,{
    //             headers:{
    //                 'x-token':User_verify_xToken
    //             }
    //         }
    //     )
    //         .then( (response) => {
    //             //concole.log(response)
    //             if(response.data.data.bornDate === undefined || response.data.data.bornDate === null ){
    //                 response.data.data.bornDate = ''
    //             }
    //             setUserData(response.data.data)
    //         })
    //         .catch( (error) => {
    //             showInternelErrorPageForMobile()
    //             toast.error(error)
    //         })
    // }, [])
    //
    // useEffect(() => {
    //     //concole.log(enableResetPassword)
    //     if (enableResetPassword) {
    //         UserAxios.put(editUser_Auth, UserData,{
    //                 headers:{
    //                     "accept": "application/json",
    //                     'x-token': User_verify_xToken,
    //                     'Content-Type': "application/json"
    //                 }
    //             }
    //         )
    //             .then( (response) => {
    //                 //concole.log(response)
    //                 if(response.data.status === true){
    //                     //concole.log(response.data)
    //                     setVerify(true)
    //                     cookie.save('x-token',response.data.data.token,{path:'/'})
    //                 }else{
    //                     toast.error(response.data.data).then()
    //                     setVerify(false)
    //                 }
    //             })
    //             .catch( (error) => {
    //                 showInternelErrorPageForMobile()
    //                 toast.error(error)
    //                 setVerify(false)
    //             })
    //
    //         setEnableResetPassword(false)
    //     }
    //
    //
    // }, [enableResetPassword, UserData])

    // //concole.log(typeof(UserData))
    // //concole.log(UserData)

    const verifyCaptcha = (value) => {
        //concole.log(value)
    }

    const setResetPassword = (values) => {
        //concole.log(values)
        if(values['CaptchaVerify']) {
            resetPassword.newPassword = values['password']
            // setUserData({
            //     "id": UserData['_id'],
            //     "account": UserData['account'],
            //     "password": values['password'],
            //     "name": UserData['name'],
            //     "gender": UserData['gender'],
            //     "roles": UserData['roles'],
            //     "rolesInfo": UserData['rolesInfo'],
            //     "houseIds": [],
            //     "phone": UserData['phone'],
            //     "mail": UserData['mail'],
            //     "address": UserData['address'],
            //     "bornDate": UserData['bornDate']
            // })
            setEnableResetPassword(true)
            setTimeout(() => {
                setChangingVerify(false)
            }, 1000)
        } else{
            toast.error('驗證碼有錯，請重新輸入新的驗證碼。')
        }
    }

    useEffect(() => {
        //concole.log(enableResetPassword)
        if (enableResetPassword) {
            LoginRegisterAxios.put(resetPassword_Auth, { "newPassword": resetPassword.newPassword},{
                    headers:{
                        "accept": "application/json",
                        'x-token': User_verify_xToken,
                        'Content-Type': "application/json"
                    }
                }
            )
                .then( (response) => {
                    //concole.log(response)
                    if(response.data.status === true){
                        //concole.log(response.data)
                        setVerify(true)
                        cookie.save('x-token',response.data.data.token,{path:'/'})
                    }else{
                        toast.error(response.data.data).then()
                        setVerify(false)
                    }
                })
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    toast.error(error)
                    setVerify(false)
                })

            setEnableResetPassword(false)
        }


    }, [enableResetPassword])

    const backToInitPage = () => {
        setTimeout(() => {
            window.location.replace(config.mainPage)
        }, 1000)
    }

    return (
        <div>
            <ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>
            { ChangingVerify ?
                <div>

                    <Form
                        form={form}
                        className="resetPassword_form"
                        name="resetPasswordForm"
                        onFinish={setResetPassword}
                        scrollToFirstError
                    >
                        <Row justify="center" align="top">
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                            <Col  xs={23} sm={12} md={12} lg={8} xl={6}>
                                <div style={{ width: '100%', display:'flex', justifyContent: 'center', textAlign: 'center' }}>
                                    <h1>重置密碼</h1>
                                </div>
                            </Col>
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                        </Row>

                        <Row justify="center" align="top">
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                            <Col  xs={23} sm={12} md={12} lg={8} xl={6}>
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
                                >
                                    <Input.Password size="large" placeholder="" style={{ width: '100%', borderRadius:'20px' }}/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                        </Row>

                        <Row justify="center" align="top">
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                            <Col  xs={23} sm={12} md={12} lg={8} xl={6}>
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
                                >
                                    <Input.Password size="large" placeholder="" style={{ width: '100%', borderRadius:'20px' }}/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                        </Row>
                        <Row >
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                            <Col  xs={23} sm={12} md={12} lg={8} xl={6}>
                                <Form.Item
                                    name="CaptchaVerify"
                                    label="驗證碼"
                                    rules={[
                                        {
                                            required: true,
                                            // message: '密碼欄位不能空白',
                                        },
                                    ]}
                                    hasFeedback

                                >
                                    <div style={{ width: '100%', display:'flex', justifyContent: 'right', textAlign: 'right' }}>
                                        <Captcha onChange={verifyCaptcha}
                                                 placeholder="Enter captcha"
                                                 onRefresh={()=>{}}

                                        />
                                    </div>

                                </Form.Item>

                            </Col>
                        </Row>
                        <Row justify="center" align="top">
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

                            </Col>
                            <Col  xs={23} sm={12} md={12} lg={8} xl={6}>
                                <Form.Item>
                                    <div style={{ width: '100%', display:'flex', justifyContent: 'center', textAlign: 'center' }}>
                                        <Button type="primary"
                                                htmlType="submit"
                                                className='login-form-button'
                                                shape="round"
                                                style={{ width: '80%'}}
                                        >
                                            {/*Submit*/}
                                            送出
                                        </Button>
                                    </div>

                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={6} md={6} lg={8} xl={9}>

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
