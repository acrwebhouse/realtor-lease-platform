import { Form, Input,  Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import React, {useState, useEffect} from "react";
import Register from "./Register_form";
// import axios from "./axiosApi";
import cookie from "react-cookies"
import {LoginRegisterAxios} from "./axiosApi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

const LOGIN_Auth = "/auth/login/"
const accountPattern = /^[a-zA-Z0-9]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginRegister = () => {

    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [LoginData, setLoginData] = useState()
    const [rememberMe, setRememberMe] = useState(false)
    const [isRunPost, setIsRunPost] = useState(false)
    const [accountID, setAccountID] = useState('')
    const [accountXToken, setAccountXToken] = useState('')
    const [isTokenInCookie, setIsTokenInCookie] = useState(false)
    // const [loading, setLoading] = useState(false);

    const showRegisterModal = () => {
        setIsRegisterModalVisible(true);
    };

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const handleRegisterCancel = () => {
        setIsRegisterModalVisible(false);
    };

    const handleLoginCancel = () => {
        setIsLoginModalVisible(false);
    };

    const errorAccountOrMailFormat = () => {
        toast.error('請輸入正確的帳號或電子郵件格式')
    }

    const onFinish =  (values) => {
        // //concole.log('Success:', values);
       const {remember, ...tempData} = values
        // //concole.log(tempData['accountOrMail'])
        if (accountPattern.test(tempData['accountOrMail'])
            || emailPattern.test(tempData['accountOrMail'])) {
                setLoginData(tempData)
                setRememberMe(remember)
                setIsRunPost(true);
        } else {
            errorAccountOrMailFormat();
        }

    };

    // const { decodedToken, isExpired } = useJwt(accountXToken);

    // //concole.log(decodedToken, isExpired)


    // cookie.load()

    useEffect(() => {
        if (isRunPost) {
            //concole.log(LoginData)
            // //concole.log(rememberMe)
            LoginRegisterAxios.post(LOGIN_Auth, LoginData)
                .then( (response) => {
                    //concole.log(response)
                    setAccountID(response['data']['data']['_id'])
                    setAccountXToken(response['data']['data']['token'])
                })
                .then(() => toast.success(`登入成功，歡迎回來 ${LoginData['accountOrMail']}`))
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    toast.error(error)
                })

            setIsRunPost(false)
            setIsTokenInCookie(true)

        }


    }, [LoginData, rememberMe, isRunPost])

    useEffect(() => {
        if (isTokenInCookie && accountXToken.length > 0 ) {
            cookie.save('x-token', accountXToken, {path:"/"})
            setIsTokenInCookie(false)
        }
    }, [isTokenInCookie, accountXToken])

    // //concole.log(accountID)

    // //concole.log(cookie.load('x-token'))

    const onFinishFailed = (errorInfo) => {
        //concole.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
            <Button type="primary" onClick={showLoginModal}>
            Login/Register
            </Button>
            <Modal title="Login System"
                   className="ModalLogin"
                   visible={isLoginModalVisible}
                   onCancel={handleLoginCancel}
                   width={500}
                   footer={[
                       <span key="paragraph">New here? </span>,
                       <Button className='btn-register'
                               key='register'
                               type="primary"
                               onClick={showRegisterModal}
                       >
                           Sign Up
                       </Button>
                   ]}
                   // centered="false"
            >
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        // label="Account/Email"
                        name="accountOrMail"
                        className="input-account"
                        rules={[
                            {
                                required: true,
                                message: 'Please key correct account or Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Account/Email" />
                    </Form.Item>
                    <Form.Item
                        // label="Password"
                        name="password"
                        className="input-password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder="password"/>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot"
                           href="http://www.localhost:3000/PasswordReset">
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className='login-form-button'
                                shape="round"
                        >
                            Log in
                        </Button>

                        <Modal title="Register Form"
                               visible={isRegisterModalVisible}
                               className="ModalRegister"
                               width={700}
                               okText="Submit"
                               cancelText="Return"
                               onCancel={handleRegisterCancel}
                               footer={[
                                   <Button key="back" className="ss" onClick={handleRegisterCancel}>
                                       Return
                                   </Button>,
                               ]}
                        >
                            <Register setIsRegisterModalVisible={setIsRegisterModalVisible}/>
                        </Modal>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default LoginRegister;