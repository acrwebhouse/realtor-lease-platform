import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.min.css';
import {
    Form, Input, Radio, Select, Checkbox, Divider, DatePicker, Space,
    Button, Col, Row, Cascader, message,
    // Upload
} from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import './Register_form.css'
import CityAreaData from '../Datas/CityArea.json'
import axios from "./axiosApi";

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

const CityAreaOptions = CityAreaData.CityArea

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

const defaultRole = [];
const defaultRank = 0;
const defaultHouseIds = []
const defaultRegisterData = {}

const convertString = (word) =>{
    switch(word.toLowerCase().trim()){
        case "yes": case "true": case "1": return true;
        case "no": case "false": case "0": case null: return false;
        default: return Boolean(word);
    }
}

const SighUp_Auth = "/auth/signUp"

const Register = () => {

    const [form] = Form.useForm();

    const [roleCheck, setRoleCheck] = useState(defaultRole);
    const [ShowHide, setShowHide] = useState(defaultRole.length > 0 )
    const [SaleShowHide, setSaleShowHide] = useState(defaultRole.includes('房仲'))
    const [isEnableCityArea, setIsEnableCityArea] = useState(false)
    const [initCityAreaData, setInitCityAreaData] = useState([])
    const [RegisterData, setRegisterData] = useState(defaultRegisterData)
    const [Roles, setRoles] = useState([])
    const [CityAreaScope, setCityAreaScope] = useState([])
    const [bornDate, setBornDate] = useState('')
    const [isRunPost, setIsRunPost] = useState(false)

    const onRoleChange = list => {
        setRoleCheck(list);
        setShowHide(list.length > 0);
        setSaleShowHide(list.includes('4'))

        setRoles(list.map(i => Number(i)))
    };

    useEffect(() => {
        // console.log(RegisterData)
        // console.log(CityAreaScope)
        if (isRunPost) {
            axios.post(SighUp_Auth, RegisterData)
                .then( (response) => console.log(response))
                .then(() => message.success(`註冊成功`, 2))
                .catch( (error) => message.error(`${error}`, 2))

            setIsRunPost(false)
        }
    }, [isRunPost, RegisterData])

    const showDate = (date, dateString) => {
        // console.log(date, dateString)
        // console.log(dateString)
        setBornDate(dateString)
    }

    const showRegisterData = (values) => {
        // console.log('Received values of form: ', values);
        setIsRunPost(true)
        setRegisterData(
            {
            'account' : values['account'],
            'password': values['password'],
            'name' : values['name'],
            'gender' : convertString(values['radio-gender']),
            'roles' : Roles,
            'bornDate' :  bornDate,
                "rolesInfo": {
                    "admin": {},
                    "host": {},
                    "user": {},
                    "sales":
                        {
                            'license' : values['LicenseNumber'],
                            'scope' : CityAreaScope['scope'],
                            'rank' : defaultRank
                        }
                },
            'houseIds': defaultHouseIds,
            'phone': values['PhonePrefix']+values['phone'],
            'mail': values['email'],
            'address': values['AddressPrefix']+values['address']
        }
        )
    };

    const showCityAreaData = (value) => {
        console.log(value);
        // console.log(value.length);
        // setInitCityArea(value.length > 2 ? value.slice(0, 2) : value);
        // console.log(initCityArea)
        setInitCityAreaData(value)
        setIsEnableCityArea(value.length >= 2 ? !isEnableCityArea : isEnableCityArea)
        if (value.length >= 2) {
            setCityAreaScope(
                {
                    "scope": [
                        {
                            "city": [value[0][0], value[1][0]],
                            "area": [value[0][1], value[1][1]]
                        }
                    ]
                }
            )
        }
    }

    const resetCityArea = () => {
        setIsEnableCityArea(false);
        setInitCityAreaData([]);
        setCityAreaScope([]);
    }

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
                <Option value="台北市">台北市</Option>
                <Option value="新北市">新北市</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
                <h2>請選擇預想申請的使用者(可重複選)</h2>
                <Checkbox.Group style={{ fontSize: '150%' ,width: '100%' }} value={roleCheck} onChange={onRoleChange}>
                    <Row>
                        <Col span={4} offset={3}>
                            <Checkbox value='2'>屋主</Checkbox>
                        </Col>
                        <Col span={4} offset={3}>
                            <Checkbox value='3'>一般會員</Checkbox>
                        </Col>
                        <Col span={4} offset={3}>
                            <Checkbox value='4'>房仲</Checkbox>
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
                                    required: false,
                                    message: 'Please input your account!',
                                },
                            ]}
                        >
                            <Input placeholder="" style={{ width: '150%' }}/>
                        </Form.Item>
                        <Form.Item name="radio-gender"
                                   label="Gender"
                                   rules={[
                                       {
                                           required: false,
                                       },
                                   ]}
                        >
                            <Col offset={4} style={{ width: '100%' }}>
                                <Radio.Group>
                                    <Radio value={true}>男 Male</Radio>
                                    <Radio value={false}>女 Female</Radio>
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
                                    required: false,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="" style={{ width: '150%' }}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="" style={{ width: '150%' }}/>
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: false,
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
                            <Input.Password placeholder="" style={{ width: '150%' }}/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input placeholder="" style={{ width: '150%' }}/>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input  addonBefore={PhonePrefixSelector}
                                    style={{
                                        width: '150%',
                                    }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your Address!',
                                },
                            ]}
                        >
                            <Input  addonBefore={AddressPrefixSelector}
                                    style={{
                                        width: '150%',
                                    }}
                            />
                        </Form.Item>
                        <Form.Item label="Born Date">
                            <Space direction="horizontal">
                                <DatePicker onChange={showDate} format={dateFormat}/>
                            </Space>
                        </Form.Item>
                        <Divider/>
                        {SaleShowHide &&
                        <Form.Item
                            name="LicenseNumber"
                            label="License Number"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please Key your License Number!',
                                },
                            ]}
                        >
                            <Input placeholder="" style={{ width: '150%' }}/>
                        </Form.Item>
                        }
                        {SaleShowHide &&
                        <Form.Item label="City and Area"
                                   required tooltip="選擇同一城市裡兩個熟悉鄰近的區域">
                            <Cascader
                                style={{width: '150%'}}
                                options={CityAreaOptions}
                                onChange={showCityAreaData}
                                value={initCityAreaData}
                                disabled={isEnableCityArea}
                                multiple
                                maxTagCount="responsive"
                            />
                            <span>
                                <Button type="primary"
                                        size="small"
                                        htmlType="button"
                                        onClick={resetCityArea}>
                                    重置區域
                                </Button>
                            </span>
                        </Form.Item>
                        }
                        <Form.Item>
                            <Col offset={14} style={{ width: '70%' }}>
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