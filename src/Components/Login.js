import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import React, {useState} from "react";
import Register from "./Register_form";





const LoginRegister = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    // const [loading, setLoading] = useState(false);

    const showRegisterModal = () => {
        setIsModalVisible(true);
    };


    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    // const handleRegisterOk = (values) => {
    //     setLoading(true)
    //     setTimeout( () => {
    //         setLoading(false)
    //         setIsModalVisible(false)
    //         console.log('Success:', values);
    //         }, 3000);
    //     };

    // const onCreate = (values) => {
    //     console.log('Received values of form: ', values);
    //     // setVisible(false);
    // };

    const handleRegisterCancel = () => {
        setIsModalVisible(false);
    };

    const handleLoginCancel = () => {
        setIsLoginModalVisible(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    // const onReset = () => {
    //     form.resetFields();
    // };

    return (
        <>
            <Button type="primary" onClick={showLoginModal}>
            Login/Register
            </Button>
            <Modal title="Login System"
                   className="ModalLogin"
                   visible={isLoginModalVisible}
                   onCancel={handleLoginCancel}
                   width={500}
                   footer={[
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
                        name="account"
                        className="input-account"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your account or Email!',
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
                        <a className="login-form-forgot" href="/">
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
                        {/*<Button htmlType="button"*/}
                        {/*        className="reset-form-button"*/}
                        {/*        onClick={onReset}>*/}
                        {/*    Reset*/}
                        {/*</Button>*/}
                        {/*{'  '} Or {'  '}*/}

                        <Modal title="Register Form"
                               visible={isModalVisible}
                               className="ModalRegister"
                               width={700}
                               okText="Submit"
                               cancelText="Return"
                               // onOk={() => {
                               //     form
                               //         .validateFields()
                               //         .then((values) => {
                               //             form.resetFields();
                               //             onCreate(values);
                               //         })
                               //         .catch((info) => {
                               //             console.log('Validate Failed:', info);
                               //         });
                               // }}
                               onCancel={handleRegisterCancel}
                               footer={[
                                   <Button key="back" className="ss" onClick={handleRegisterCancel}>
                                       Return
                                   </Button>,
                                   // <Button key="submit"
                                   //         // htmlType="submit"
                                   //         type="primary"
                                   //         loading={loading}
                                   //         onClick={handleRegisterOk}>
                                   //     Submit
                                   // </Button>,
                               ]}
                        >
                            {/*<Register visible={showRegisterModal}/>*/}
                            <Register/>
                        </Modal>
                    </Form.Item>
                </Form>
            </Modal>
            {/*{isModalVisible && }*/}
        </>
    )
};

export default LoginRegister;