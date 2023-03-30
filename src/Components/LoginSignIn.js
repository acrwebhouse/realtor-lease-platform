import { Form, Input,  Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import React, {useState, useEffect} from "react";
import Register from "./Register_form";
// import axios from "./axiosApi";
import {LoginRegisterAxios} from "./axiosApi"
import cookie from 'react-cookies'
import ForgotPassword from "./ForgotPassword";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LOGIN_Auth = "/auth/login/"
const accountPattern = /^[a-zA-Z0-9]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

window.defaultAccount = ''
window.defaultPassword = ''
window.setDefaultAccountPassword = function(account,password){
    window.defaultAccount = account
    window.defaultPassword = password
}

const LoginRegister = (props) => {

    // const onBlur = useRef(null)

    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] = useState(false);
    // const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [LoginData, setLoginData] = useState()
    const [rememberMe, setRememberMe] = useState(false)
    const [isRunPost, setIsRunPost] = useState(false)
    const [isReset, setIsReset] = useState(false)
    // const [loading, setLoading] = useState(false);

    const showRegisterModal = () => {
        console.log(props)
        // props.loginSignInIsOpen(false)
        setIsRegisterModalVisible(true);
    };

    const showResetPasswordModal = () => {
        console.log(props)
        // props.loginSignInIsOpen(false)
        setIsResetPasswordModalVisible(true);
    }
    // const showLoginModal = () => {
    //     setIsLoginModalVisible(true);
    // };

    const handleRegisterCancel = () => {
        setIsRegisterModalVisible(false);
        setIsReset(true);
    };

    const handleResetPasswordCancel = () => {
        setIsResetPasswordModalVisible(false);
        setIsReset(true);
    };

    const handleLoginCancel = () => {
        props.loginSignInIsOpen(false)
        // setIsLoginModalVisible(false);
    };

    const errorAccountOrMailFormat = () => {
        toast.error('請輸入正確的帳號或電子郵件格式')
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
    //     onBlur.current.blur();
    // })

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
                    console.log(response.data)
                    if((response.data.status === false || response.data.status === null) && response.data.data.includes('accout , mail or password invalid')) {
                        toast.error(`帳號或密碼錯誤`)
                    }else if(response.data.status === false && response.data.data.includes("user not verify")) {
                        toast.error(`此帳號尚未驗證完畢，請先完成帳號驗證程序。`)
                    }else{
                        const userId = response.data.data._id;
                        if(typeof(appJsInterface) !== 'undefined'){
                            // eslint-disable-next-line no-undef
                            appJsInterface.saveUserInfo(LoginData.accountOrMail,LoginData.password,userId);
                        }
                        props.changeUserMenu(response.data.data.token,true)
                        let d = new Date();
                        d.setTime(d.getTime() + (86400*30*1000)); //one month
                        cookie.save('x-token',response.data.data.token,{path:'/', expires: d})
                        toast.success(`登入成功，歡迎回來 ${LoginData['accountOrMail']}`)
                    }

                })
                .catch( (error) => toast.error(`${error}`))

            setIsRunPost(false)
        }else{
            if(typeof(appJsInterface) !== 'undefined'){
                // eslint-disable-next-line no-undef
                appJsInterface.setAccountPassword();
            }
        }

    }, [LoginData, rememberMe, isRunPost, props])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <>
            <ToastContainer autoClose={2000} position="top-center"/>
            <Modal title="會員登入系統"
                   className="ModalLogin"
                   visible={props.isShow}
                   onCancel={handleLoginCancel}
                   width={500}
                   footer={[
                       <span key="paragraph">
                           {/*New here? */}
                           不是會員？<span> &nbsp; </span>
                       </span>,
                       <Button className='btn-register'
                               key='register'
                               type="primary"
                               onClick={showRegisterModal}
                       >
                           {/*Sign Up*/}
                           註冊
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
                        accountOrMail: window.defaultAccount,
                        password: window.defaultPassword
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
                                message: '請填帳號或電子郵件',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Account/Email"
                               size="large"
                               // defaultValue={ window.defaultAccount}
                            // ref={onBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        // label="Password"
                        name="password"
                        className="input-password"
                        rules={[
                            {
                                required: true,
                                message: '密碼不能空白',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                                        placeholder="password"
                                        size="large"
                                        // defaultValue={ window.defaultPassword}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>
                                {/*Remember me*/}
                                記憶帳號密碼
                            </Checkbox>
                        </Form.Item>

                        <Button type="link"
                                style={{float: 'right'}}
                                className='reset-password-button'
                            // shape="round"
                                onClick={showResetPasswordModal}
                        >
                            {/*Log in*/}
                            忘記密碼
                        </Button>
                        {/*<a className="login-form-forgot"*/}
                        {/*   href="http://www.localhost:3000/PasswordReset">*/}
                        {/*    /!*Forgot password*!/*/}
                        {/*    忘記密碼*/}
                        {/*</a>*/}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className='login-form-button'
                                shape="round"
                        >
                            {/*Log in*/}
                            登入
                        </Button>

                        <Modal title="會員註冊系統"
                               visible={isRegisterModalVisible}
                               className="ModalRegister"
                               bodyStyle={{height: '700px', overflowY: 'auto'}}
                               width={700}
                               okText="Submit"
                               cancelText="Return"
                               onCancel={handleRegisterCancel}
                               footer={[
                                   <Button key="back" className="ss" onClick={handleRegisterCancel}>
                                       返回
                                   </Button>,
                               ]}
                        >
                            <Register setIsRegisterModalVisible={setIsRegisterModalVisible}
                                      initReset={isReset}
                                      setIsReset={setIsReset}/>
                        </Modal>
                        <Modal title="重置密碼"
                               visible={isResetPasswordModalVisible}
                               className="ModalResetPassword"
                               width={700}
                               okText="Submit"
                               cancelText="Return"
                               onCancel={handleResetPasswordCancel}
                               footer={[
                                   <Button key="back" className="ss" onClick={handleResetPasswordCancel}>
                                       返回
                                   </Button>,
                               ]}
                        >
                            <ForgotPassword setIsResetPasswordModalVisible={setIsResetPasswordModalVisible}
                                            initReset={isReset}
                                            setIsReset={setIsReset}/>
                        </Modal>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default LoginRegister;