import React, {useEffect, useState} from 'react';
import {
    Table,
    Space,
    Radio,
    Button,
    Image,
    Input,
    Select,
    Divider,
    Row,
    Col,
    DatePicker,
    message,
    Alert,
    Checkbox,
    Form
} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import Captcha from "demos-react-captcha";


const ResetPassword = (props) => {

    const [form] = Form.useForm();

    const verifyCaptcha = (value) => {
        console.log(value)
    }

    const setResetPassword = (values) => {
        console.log(values)
    }

    return (
        <div>
            <h1>重置密碼</h1>
            <Form
                    form={form}
                    className="resetPassword_form"
                    name="resetPasswordForm"
                    onFinish={setResetPassword}
                    scrollToFirstError
            >
                <Row>
                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                    {/*</Col>*/}
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
                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                    {/*</Col>*/}
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
                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                    {/*</Col>*/}
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
                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                    {/*</Col>*/}
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
    );
};

export default ResetPassword;
