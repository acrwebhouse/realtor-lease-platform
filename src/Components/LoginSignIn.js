import { Form, Input, message, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import React, {useState, useEffect} from "react";
import Register from "./Register_form";
// import axios from "./axiosApi";
import {LoginRegisterAxios} from "./axiosApi"
import cookie from 'react-cookies'

const LOGIN_Auth = "/auth/login/"
const accountPattern = /^[a-zA-Z0-9]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginRegister = (props) => {

    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [LoginData, setLoginData] = useState()
    const [rememberMe, setRememberMe] = useState(false)
    const [isRunPost, setIsRunPost] = useState(false)
    // const [loading, setLoading] = useState(false);

    const showRegisterModal = () => {
        console.log(props)
        // props.loginSignInIsOpen(false)
        setIsRegisterModalVisible(true);
    };

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const handleRegisterCancel = () => {
        setIsRegisterModalVisible(false);
    };

    const handleLoginCancel = () => {
        props.loginSignInIsOpen(false)
        setIsLoginModalVisible(false);
    };

    const errorAccountOrMailFormat = () => {
         message.loading('loading...', 0.5)
             .then(() => message.error('請輸入正確的帳號或電子郵件格式', 3));
    }

    const onFinish =  (values) => {
        // console.log('Success:', values);
       const {remember, ...tempData} = values
        // console.log(tempData['accountOrMail'])
        if (accountPattern.test(tempData['accountOrMail'])
            || emailPattern.test(tempData['accountOrMail'])) {
                setLoginData(tempData)
                setRememberMe(remember)
                setIsRunPost(true);
        } else {
            errorAccountOrMailFormat();
        }

    };

    // useEffect(() => {
    //     if (isRunPost) {
    //         console.log(LoginData)
    //         console.log(rememberMe)
    //         axios.post(LOGIN_Auth, LoginData)
    //             .then( (response) => console.log(response))
    //             .catch( (error) => console.log(error))
    //     }
    //
    //     }, [LoginData, rememberMe, isRunPost])

    useEffect(() => {
        if (isRunPost) {
            LoginRegisterAxios.post(LOGIN_Auth, LoginData)
                .then((response) => {
                    if(response.data.data === null ||response.data.data === undefined){
                        message.error(`帳號或密碼錯誤`, 2)
                    }else{
                        props.changeRolesMenu(response.data.data.roles)
                        cookie.save('x-token',response.data.data.token,{path:'/'})
                        message.success(`登入成功，歡迎回來 ${LoginData['accountOrMail']}`, 2)
                    }
                    
                })
                .catch( (error) => message.error(`${error}`, 2))

            setIsRunPost(false)
        }

    }, [LoginData, rememberMe, isRunPost])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <>
            <Modal title="Login System"
                   className="ModalLogin"
                   visible={props.isShow}
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