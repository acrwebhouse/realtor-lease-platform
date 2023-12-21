import {Form, Input, Button} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {LoginRegisterAxios} from "./axiosApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendResetPassword_Auth = '/auth/sendResetPasswordMail'
const accountOrEmail = []

const ForgotPassword = (props) => {

    const { setIsResetPasswordModalVisible, initReset, setIsReset } = props

    const [form] = Form.useForm();
    const [EnableResetPW, setEnableResetPW] = useState(false)
    const [accountOrEmail, setAccountOrEmail] = useState([])

    useEffect(() => {
        if (initReset) {
            form.resetFields();
            setIsReset(false);
        }
    }, [initReset, form, setIsReset])

    const onFinish =  (values) => {
        //concole.log('Success:', values);
        // //concole.log(values['AccountOrEmail'])
        setAccountOrEmail(values['AccountOrEmail'])
        setEnableResetPW(true);
        //concole.log(accountOrEmail)
    };

    const onFinishFailed = (errorInfo) => {
        //concole.log('Failed:', errorInfo);
    };

    const ResetPasswordCancel = () => {
        // setIsResetPasswordModalVisible(false);
        // setIsReset(true);
    };

    const ResetPW = () => {

    }

    useEffect(() => {
        //concole.log(accountOrEmail)
        //concole.log(EnableResetPW)
        if (EnableResetPW && (accountOrEmail !== undefined) ) {
            //concole.log(SendResetPassword_Auth+'?accountOrMail='+accountOrEmail)
            LoginRegisterAxios.get(SendResetPassword_Auth+'?accountOrMail='+accountOrEmail, {
                headers: {
                    "accept": "application/json",
                }
            })
                .then( (response) =>  {
                    //concole.log(response)
                    if(response.data.status) {
                        toast.success('請至郵件信箱進行重置密碼的設定')
                    }else {
                        toast.error(`${response.data.data}`)
                    }
                })
                .catch( (error) => {
                    toast.error('查無此帳戶或電子郵件，請輸入正確的帳戶或電子郵件')
                })

            setEnableResetPW(false)
            setAccountOrEmail([])
        }
    }, [EnableResetPW, accountOrEmail])

    return (
        <>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
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
                    name="AccountOrEmail"
                    className="input-account"
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />}
                           size={'large'}
                           placeholder="請輸入帳戶或電子郵件" />
                </Form.Item>
                <p>如須變更密碼，請輸入之前所註冊的電子郵件帳號。</p>
                <p>系統將會寄送重置密碼郵件至該郵件帳號</p>
                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            className='login-form-button'
                            shape="round"
                            onClick={ResetPW}
                    >
                        重設密碼
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default ForgotPassword;

