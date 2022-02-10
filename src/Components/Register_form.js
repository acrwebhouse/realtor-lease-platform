import React, {useState} from 'react';
import 'antd/dist/antd.min.css';
import {
    Form, Input, Radio, Select, Checkbox, Divider, DatePicker, Space,
    Button, Col, Row, Cascader, 
    // Upload
} from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import './Register_form.css'
import CityAreaData from './CityArea.json'

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

const CityAreaOptions = CityAreaData.CityArea
// console.log(options)
// const normFile = (e) => {
//     console.log('Upload event:', e);
//
//     if (Array.isArray(e)) {
//         return e;
//     }
//
//     return e && e.fileList;
// };

const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
        md: {
            span: 8,
        },
        lg: {
            span: 10,
            // offset: -12,
        }
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 24,
        }
    },
};

// const roleOption = ['一般會員', '屋主', '房仲'];
// const role = [{
//         person: [
//             {
//                 Role: "User",
//                 CNRole: "一般會員"
//             },
//             {
//                 Role: "Host",
//                 CNRole: "屋主"
//             },
//             {
//                 Role: "HouseSale",
//                 CNRole: "房仲"
//             }
//         ]
//     }];
const defaultRole = [];

const Register = () => {

    const [form] = Form.useForm();

    const [roleCheck, setRoleCheck] = useState(defaultRole);
    const [ShowHide, setShowHide] = useState(defaultRole.length > 0 )
    const [SaleShowHide, setSaleShowHide] = useState(defaultRole.includes('房仲'))


    const onRoleChange = list => {
        setRoleCheck(list);
        setShowHide(list.length > 0);
        setSaleShowHide(list.includes('房仲'))
        // console.log(list)
    };

    const showDate = (date, dateString) => {
        console.log(date, dateString)
    }

    const showRegisterData = (values) => {
        console.log('Received values of form: ', values);
    };

    // const showCityAreaData = (value) => {
    //     console.log(value);
    // }

    const PhonePrefixSelector = (
        <Form.Item name="PhonePrefix" noStyle>
            <Select style={{
                        width: 90,
                    }}
            >
                <Option value="886">+886</Option>
            </Select>
        </Form.Item>
    );

    const AddressPrefixSelector = (
        <Form.Item name="AddressPrefix" noStyle>
            <Select style={{
                width: 90,
            }}
            >
                <Option value="Taipei">台北市</Option>
                <Option value="XinBei">新北市</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            {/*<Modal title="Register Form"*/}
            {/*       visible={isModalVisible}*/}
            {/*       className="ModalRegister"*/}
            {/*    // width={1000}*/}
            {/*    // onOk={handleOk}*/}
            {/*       onCancel={handleRegisterCancel}*/}
            {/*       footer={[*/}
            {/*           <Button key="back" className="ss" onClick={handleRegisterCancel}>*/}
            {/*               Return*/}
            {/*           </Button>,*/}
            {/*           <Button key="submit" type="primary" loading={loading} onClick={onFinish}>*/}
            {/*               Submit*/}
            {/*           </Button>,*/}
            {/*       ]}*/}
            {/*>*/}
                <h2>請選擇預想申請的使用者(可重複選)</h2>
                {/*<div >*/}
                {/*    <Checkbox.Group options={roleOption} value={roleCheck} onChange={onRoleChange} />*/}
                {/*</div>*/}
                <Checkbox.Group style={{ fontSize: '150%' ,width: '100%' }} value={roleCheck} onChange={onRoleChange}>
                    <Row>
                        <Col span={4} offset={3}>
                            <Checkbox value='一般會員'>一般會員</Checkbox>
                        </Col>
                        <Col span={4} offset={3}>
                            <Checkbox value='屋主'>屋主</Checkbox>
                        </Col>
                        <Col span={4} offset={3}>
                            <Checkbox value='房仲'>房仲</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
                <Divider/>
                <div className="Register-context">
                    {ShowHide &&
                    <Form
                        {...formItemLayout}
                        form={form}
                        className="register_form"
                        name="register"
                        onFinish={showRegisterData}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="account"
                            label="Account"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your account!',
                                },
                            ]}
                        >
                            <Input placeholder="" style={{ width: '100%' }}/>
                        </Form.Item>
                        <Form.Item name="radio-gender"
                                   label="Gender"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}
                        >
                            <Col offset={4} style={{ width: '100%' }}>
                                <Radio.Group>
                                    <Radio value="1">男 Male</Radio>
                                    <Radio value="0">女 Female</Radio>
                                </Radio.Group>
                            </Col>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input  addonBefore={PhonePrefixSelector}
                                    style={{
                                        width: '130%',
                                    }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Address!',
                                },
                            ]}
                        >
                            <Input  addonBefore={AddressPrefixSelector}
                                    style={{
                                        width: '130%',
                                    }}
                            />
                        </Form.Item>
                        <Form.Item
                            // name="born"
                            label="Born Date"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your Born Date!',
                            //     },
                            // ]}
                        >
                            <Space direction="horizontal">
                                <DatePicker onChange={showDate} format={dateFormat}/>
                                {/*<DatePicker onChange={showDate} />*/}
                            </Space>
                        </Form.Item>
                        <Divider/>
                        {SaleShowHide &&
                            // <Form.Item
                            //     name="LicenseNumber"
                            //     label="License Number"
                            //     valuePropName="fileList"
                            //     getValueFromEvent={normFile}
                            //     extra="上傳營業執照"
                            // >
                            //     <Col  style={{ width: '100%' }}>
                            //         <Upload name="logo" action="/upload.do" listType="text">
                            //             <Button icon={<UploadOutlined />}>Click to upload</Button>
                            //         </Upload>
                            //     </Col>
                            // </Form.Item>
                        <Form.Item
                            name="LicenseNumber"
                            label="License Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Key your License Number!',
                                },
                            ]}
                        >
                            <Input placeholder="" style={{ width: '100%' }}/>
                        </Form.Item>
                        }
                        {SaleShowHide &&
                        <Form.Item name="CityAre"
                                   label="City and Area"
                                   rules={[
                                       {

                                       }
                                   ]}
                        >
                            <Cascader
                                style={{width: '100%'}}
                                options={CityAreaOptions}
                                // onChange={showCityAreaData}
                                multiple
                                maxTagCount="responsive"
                            />
                        </Form.Item>
                        }
                        <Form.Item>
                            <Col offset={8} style={{ width: '100%' }}>
                                <Button type="primary"
                                        htmlType="submit"
                                        className='login-form-button'
                                        shape="round"

                                >
                                    Submit
                                </Button>
                            </Col>
                        </Form.Item>
                    </Form>}
                </div>
            <Divider/>
       </>
    )
}

export default Register;