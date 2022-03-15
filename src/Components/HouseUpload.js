import React, {useEffect, useState} from 'react';
import {Form, Button, Modal, Input, Select, Divider, Row, Col, Checkbox, Upload, message} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseAxios} from './axiosApi'
// import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

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
            span: 8,
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
            span: 16,
        }
    },
};

// const defaultSaleType = 1;
// console.log(defaultSaleType)
const defaultExtraRequire = [];
const House_Auth = 'house/uploadHousePhoto/'
const XToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"

const HouseUpload = () => {

    const [form] = Form.useForm();

    const [isUploadVisible, setIsIUploadVisible] = useState(false);
    const [extraRequire, setExtraRequire] = useState(defaultExtraRequire);
    const [ShowHideManageFee, setShowHideManageFee] = useState(false );
    const [ShowHideGarbageFee, setShowHideGarbageFee] = useState(false );
    const [isRunPicPost, setIsRunPicPost] = useState(false)


    useEffect(() => {
        // console.log(RegisterData)
        // console.log(CityAreaScope)
        if (isRunPicPost) {
            HouseAxios.post(House_Auth, XToken)
                .then( (response) => console.log(response))
                .then(() => message.success(`成功`, 2))
                .catch( (error) => message.error(`${error}`, 2))

            setIsRunPicPost(false)
        }
    }, [isRunPicPost, ])

    const showUploadModal = () => {
        setIsIUploadVisible(true)
    }

    const HideUploadModal = () => {
        setIsIUploadVisible(false)
    }

    const showHouseData = (values) => {
        console.log('Received values of form: ', values);

    };

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

    // function handleChange(value) {
    //     console.log(`selected ${value}`);
    // }

    const onExtraRequireChange = list => {
        // console.log(`selected ${list}` )
        console.log(list)
        setExtraRequire(list);
        setShowHideManageFee(list.includes('manager'))
        setShowHideGarbageFee(list.includes('garbage'))
        //
        // setRoles(list.map(i => Number(i)))
    };

    const [PictureList, setPictureList] = useState([]);
    // console.log(PictureList)
    const CheckPicNum = (PictureList) => {
        setPictureList(PictureList['fileList'])
        // console.log(PictureList)
        // setShowHideUploadButton(PictureList['fileList'])
        // console.log("Hello")
    }

    const uploadButton = (
        <div>
            <PlusOutlined/>
            {/*<Button icon={<UploadOutlined />}>Upload (Max: 10)</Button>*/}
            <div style={{ marginTop: 8 }}>Upload (Max:10)</div>
        </div>
    );


    return (

        <div>
            <Button type="primary" onClick={showUploadModal}>
                Upload
            </Button>
            <Modal title="Upload House Data"
                   className="ModalLogin"
                   visible={isUploadVisible}
                   onCancel={HideUploadModal}
                   width={1000}
                   // footer={[]}
                // centered="false"
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    className="HouseUpload_form"
                    name="HouseUpload"
                    onFinish={showHouseData}
                    scrollToFirstError
                >
                    <Divider> 照片上傳</Divider>
                    <Form.Item
                        name="photoUpload"
                    >
                        <Upload multiple
                                action="http://35.201.152.0:5000/house/uploadHousePhoto/"
                                listType="picture-card"
                                fileList={PictureList['fileList']}
                            // Headers={'application/json'}
                                maxCount={10}
                                beforeUpload={(file) =>{
                                    // setPictureList(PictureList['fileList'])
                                    console.log(file)
                                    return false
                                }}
                                onChange={CheckPicNum}
                        >
                            {PictureList.length >= 10 ? null : uploadButton}

                        </Upload>
                    </Form.Item>


                    <Divider/>
                    <Form.Item
                        name="name"
                        label="名稱"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input placeholder="" style={{ width: '70%' }}/>
                    </Form.Item>

                    <Form.Item
                        name="TypeOfRental"
                        label="類型"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Select style={{
                            width: 150,
                        }}
                        >
                            <Option value="1">整層住家</Option>
                            <Option value="2">獨立套房</Option>
                            <Option value="3">分租套房</Option>
                            <Option value="4">雅房</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="地址"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input  addonBefore={AddressPrefixSelector}
                                style={{
                                    width: '70%',
                                }}
                        />
                    </Form.Item>

                    <Form.Item
                        // name="house-number"
                        label="門牌"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input placeholder=""
                               style={{width: '17%'}}
                               suffix='巷'
                        />
                        {/*<span> 巷 </span>*/}
                        <Input placeholder="非必填"
                               style={{width: '17%'}}
                               suffix='弄'
                        />
                        {/*<span> 弄 </span>*/}
                        <Input placeholder=""
                               style={{width: '17%'}}
                               suffix='號之'
                        />
                        {/*<span> 號 </span>*/}
                        {/*<span> 之 </span>*/}
                        <Input placeholder="非必填"
                               style={{width: '17%'}}
                               prefix=''
                        />
                    </Form.Item>

                    <Form.Item
                        name="floor"
                        label="樓層"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your floor!',
                            },
                        ]}
                        >
                        <Input placeholder=""
                               style={{ width: '70%' }}
                               suffix='樓'
                        />
                    </Form.Item>
                        {/*<span> 樓 </span>*/}

                    <Form.Item
                        name="room-number"
                        label="房間號碼"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input placeholder="" style={{ width: '70%' }}/>
                    </Form.Item>

                    <Form.Item
                        // name="config"
                        label="格局"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Input placeholder=""
                               style={{width: '17%'}}
                               suffix='房'
                        />
                        {/*<span> 房 </span>*/}
                        <Input placeholder=""
                               style={{width: '17%'}}
                               suffix='廳'
                        />
                        {/*<span> 廳 </span>*/}
                        <Input placeholder=""
                               style={{width: '17%'}}
                               suffix='衛'
                        />
                        {/*<span> 衛 </span>*/}
                        <Input placeholder=""
                               style={{width: '17%'}}
                               suffix='陽台'
                        />
                        {/*<span> 陽台 </span>*/}
                    </Form.Item>

                    <Form.Item
                        name="lease-price"
                        label="租金"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input placeholder=""
                               style={{ width: '70%' }}
                               suffix='元/月'
                        />
                        {/*<span> 元/月 </span>*/}
                    </Form.Item>

                    <Form.Item
                        name="ping"
                        label="坪數"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input placeholder=""
                               style={{ width: '70%' }}
                               suffix='坪'
                        />
                        {/*<span> 坪 </span>*/}
                    </Form.Item>

                    <Divider>額外資訊填寫</Divider>

                    <Form.Item
                        // name="traffic"
                        label="鄰近交通"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <span> 名稱： </span>
                        <Input placeholder="" style={{width: '50%'}}/>
                        <br/>
                        <span> 距離： </span>
                        <Input placeholder=""
                               style={{width: '50%'}}
                               suffix='公尺'
                        />
                        {/*<span> 公尺 </span>*/}
                        <br/>
                        <span> 類型： </span>
                        <Select style={{
                            width: 90,
                        }}
                        >
                            <Option value="1">捷運站</Option>
                            <Option value="2">公車站</Option>
                            <Option value="3">火車站</Option>
                            <Option value="4">高鐵站</Option>
                            <Option value="5">機場</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        // name="life"
                        label="鄰近生活圈"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <span> 名稱： </span>
                        <Input placeholder="" style={{width: '50%'}}/>
                        <br/>
                        <span> 距離： </span>
                        <Input placeholder=""
                               style={{width: '50%'}}
                               suffix='公尺'
                        />
                        {/*<span> 公尺 </span>*/}
                        <br/>
                        <span> 類型： </span>
                        <Select style={{
                            width: 150,
                        }}
                        >
                            <Option value="1">夜市</Option>
                            <Option value="2">科學圓區</Option>
                            <Option value="3">計畫區</Option>
                            <Option value="4">重劃區</Option>
                            <Option value="5">傳統商圈</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        // name="education"
                        label="鄰近學校"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <span> 名稱： </span>
                        <Input placeholder="" style={{width: '50%'}}/>
                        <br/>
                        <span> 距離： </span>
                        <Input placeholder=""
                               style={{width: '50%'}}
                               suffix='公尺'
                        />
                        {/*<span> 公尺 </span>*/}
                        <br/>
                        <span> 類型： </span>
                        <Select style={{
                            width: 150,
                        }}
                        >
                            <Option value="1">幼稚園</Option>
                            <Option value="2">小學</Option>
                            <Option value="3">國中</Option>
                            <Option value="4">高中/高職</Option>
                            <Option value="5">大學/科大</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        // name="extraRequire"
                        label="需求與許可"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your requirement!',
                            },
                        ]}
                    >
                        <Checkbox.Group style={{ fontSize: '100%' ,width: '125%' }}
                                        value={extraRequire}
                                        onChange={onExtraRequireChange}
                        >
                            <Row>
                                <Col span={4} >
                                    <Checkbox value='pet'>可養寵物</Checkbox>
                                </Col>
                                <Col span={4} >
                                    <Checkbox value='manager'>管理費</Checkbox>
                                </Col>
                                <Col span={4} >
                                    <Checkbox value='garbage'>垃圾費</Checkbox>
                                </Col>
                                <Col span={4} >
                                    <Checkbox value='smoke'>可抽菸</Checkbox>
                                </Col>
                                <Col span={4} >
                                    <Checkbox value='cook'>可開伙</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                        {/*<Select mode="multiple"*/}
                        {/*        style={{width: '100%'}}*/}
                        {/*        placeholder="Please select"*/}
                        {/*        onChange={handleChange}*/}
                        {/*>*/}
                        {/*    <Option key={'pet'}>可養寵物</Option>*/}
                        {/*    <Option key={'manager'}>管理費</Option>*/}
                        {/*    <Option key={'garbage'}>垃圾費</Option>*/}
                        {/*    <Option key={'smoke'}>可抽菸</Option>*/}
                        {/*    <Option key={'cook'}>可開伙</Option>*/}
                        {/*</Select>*/}
                        {ShowHideManageFee &&
                            <div>
                                <span> 管理費： </span>
                                <Input placeholder="" style={{width: '30%'}}/>
                                <span> 元 </span>
                            </div>
                        }
                        {ShowHideGarbageFee &&
                        <div>
                            <span> 垃圾費： </span>
                            <Input placeholder="" style={{width: '30%'}}/>
                            <span> 元 </span>
                        </div>
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default HouseUpload;
