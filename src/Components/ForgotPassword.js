import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, {useState} from "react";
// import axios from "./axiosApi";

// const LOGIN_Auth = "/auth/login/"

const ForgotPassword = () => {

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(true);

    const handleLoginCancel = () => {
        setIsLoginModalVisible(false);
    };

    const onFinish =  (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <>
            <Modal title="Forgot Password"
                   className="ModalLogin"
                   visible={isLoginModalVisible}
                   onCancel={handleLoginCancel}
                   width={400}
                   footer={null}
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
                        name="Email"
                        className="input-account"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Email" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className='login-form-button'
                                shape="round"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default ForgotPassword;


