import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import React, {useEffect} from "react";
// import axios from "./axiosApi";

// const LOGIN_Auth = "/auth/login/"

const ForgotPassword = (props) => {

    const { setIsResetPasswordModalVisible, initReset, setIsReset } = props

    const [form] = Form.useForm();

    useEffect(() => {
        if (initReset) {
            form.resetFields();
            setIsReset(false);
        }
    }, [initReset, form, setIsReset])

    const onFinish =  (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const ResetPasswordCancel = () => {
        setIsResetPasswordModalVisible(false);
        setIsReset(true);
    };

    return (
        <>

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
                    name="Email"
                    className="input-account"
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />}
                           size={'large'}
                           placeholder="請輸入電子郵件" />
                </Form.Item>
                <p>如須變更密碼，請輸入之前所註冊的電子郵件帳號。</p>
                <p>系統將會寄送重置密碼郵件至該郵件帳號</p>
                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            className='login-form-button'
                            shape="round"
                            onClick={ResetPasswordCancel}
                    >
                        重設密碼
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default ForgotPassword;

