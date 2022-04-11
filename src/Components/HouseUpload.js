import React, {useEffect, useState} from 'react';
import {Form, Button, Modal, Input, InputNumber, Select, Divider, Row, Col, Checkbox, Upload, message} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseAxios, PicAnnexAxios} from './axiosApi'
import { DeleteOutlined } from '@ant-design/icons';
// import cookie from "react-cookies";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 16,
        },
        sm: {
            span: 14,
        },
        md: {
            span: 12,
        },
        lg: {
            span: 10,
        },
        xl: {
            span: 8,
        },
        xxl: {
            span: 5,
        }
    },
    wrapperCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 10,
        },
        md: {
            span: 12,
        },
        lg: {
            span: 14,
        },
        xl: {
            span: 16,
        },
        xxl: {
            span: 19,
        }
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 12,
    },
};

const defaultExtraRequire = [];
const TrafficArr = [];
const Traffic_Type = ['捷運站', '公車站/客運站', '火車站', '高鐵站', '機場'];
const LifeArr = [];
const Life_Type = ['夜市', '科學圓區', '計畫區', '重劃區', '傳統商圈'];
const EducationArr = [];
const Edu_Type = ['幼稚園', '小學', '國中', '高中/高職', '大學/科大']
const House_Pic_Auth = 'house/uploadHousePhoto/'
const House_Annex_Auth = 'house/uploadHouseAnnex/'
const House_Auth = 'house/addHouse/'

const convertString = (word) =>{
    switch(word.toLowerCase().trim()){
        case "yes": case "true": case "1": return true;
        case "no": case "false": case "0": case null: return false;
        default: return Boolean(word);
    }
}

const HouseUpload = () => {

    const [form] = Form.useForm();
    const [form_photo] = Form.useForm();
    const [form_annex] = Form.useForm();
    const [form_traffic] = Form.useForm();
    const [form_life] = Form.useForm();
    const [form_edu] = Form.useForm();
    const [extraRequire, setExtraRequire] = useState(defaultExtraRequire);
    const [ShowHideManageFee, setShowHideManageFee] = useState(false );
    const [ShowHideGarbageFee, setShowHideGarbageFee] = useState(false );
    const [trafficVisible, setTrafficVisible] = useState(false);
    const [lifeVisible, setLifeVisible] = useState(false);
    const [eduVisible, setEduVisible] = useState(false);
    const [delTraffic, setDelTraffic] = useState(false);
    const [delLife, setDelLife] = useState(false);
    const [delEdu, setDelEdu] = useState(false);
    const [PictureList, setPictureList] = useState([]);
    const [AnnexEnable, setAnnexEnable] = useState(false);
    const [FormDataEnable, setFormDataEnable] = useState(false);
    const [AnnexList, setAnnexList] = useState([]);
    const [PicUploading, setPicUploading] = useState(false);
    const [AnnexUploading, setAnnexUploading] = useState(false);
    const [HouseData, setHouseData] = useState({});
    const [photoData, setPhotoData] = useState([]);
    const [annexData, setAnnexData] = useState([]);
    const [isRunPost, setIsRunPost] = useState(false)

    const showTrafficModal = () => {
        setTrafficVisible(true);
    };

    const hideTrafficModal = () => {
        setTrafficVisible(false);
        form_traffic.resetFields();
    };

    const showLifeModal = () => {
        setLifeVisible(true);
    };

    const hideLifeModal = () => {
        setLifeVisible(false);
        form_life.resetFields()
    };

    const showEduModal = () => {
        setEduVisible(true);
    };

    const hideEduModal = () => {
        setEduVisible(false);
        form_edu.resetFields()
    };
    const onTrafficCreate = (values) => {
        console.log('Received values of form: ', values);
        TrafficArr.push(values)
        setTrafficVisible(false);
        console.log(TrafficArr)
    };
    const onLifeCreate = (values) => {
        console.log('Received values of form: ', values);
        LifeArr.push((values))
        setLifeVisible(false);
    };
    const onEduCreate = (values) => {
        console.log('Received values of form: ', values);
        EducationArr.push(values)
        setEduVisible(false);
    };

    useEffect(() => {
        if (delTraffic) {
            setDelTraffic(false)
        }
        if (delLife) {
            setDelLife(false)
        }
        if (delEdu) {
            setDelEdu(false)
        }
    }, [delTraffic, delLife, delEdu])

    // console.log(typeof(cookie.load('x-token')))
    // useEffect(() => {
    //     // console.log(RegisterData)
    //     // console.log(CityAreaScope)
    //     if (isRunPicPost) {
    //         HouseAxios.post(House_Auth, PictureList)
    //             .then( (response) => console.log(response))
    //             .then(() => message.success(`成功`, 2))
    //             .catch( (error) => message.error(`${error}`, 2))
    //
    //         setIsRunPicPost(false)
    //     }
    // }, [isRunPicPost, PictureList])

    useEffect(() => {
        // console.log(RegisterData)
        // console.log(CityAreaScope)
        if (isRunPost) {
            HouseAxios.post(House_Auth, HouseData)
                .then( (response) => console.log(response))
                .then(() => message.success(`成功`, 2))
                .catch( (error) => message.error(`${error}`, 2))

            setIsRunPost(false)
        }
    }, [isRunPost, HouseData])

    const UploadHouseData = (values) => {
        console.log('Received values of form: ', values);
        setHouseData(
            {
                'name' : values['name'],
                'city' : (values['AddressPrefix']+values['address']).slice(0, 3),
                'area' : (values['AddressPrefix']+values['address']).slice(3, 6),
                'owner' : '61f52096734385001f190854',
                'address': values['AddressPrefix']+values['address'],
                'houseNumber' : {
                                'lane' : values['lane'] === undefined || values['lane'].length === 0 ? '' : parseInt(values['lane']),
                                'alley' : values['alley'] === undefined || values['alley'].length === 0 ? '' : parseInt(values['alley']),
                                'number1' : parseInt(values['NO1']),
                                'number2' : values['NO2'] === undefined || values['NO2'].length === 0 ? '' : parseInt(values['NO2']),
                },
                'floor' : parseInt(values['floor']),
                'room' :  (values['room-number'] === undefined || values['room-number'].length === 0) ? '' : parseInt(values['room-number'])  ,
                'price' : parseInt(values['lease-price']),
                'config' : {
                    'room' : parseInt(values['room']),
                    'livingRoom' : parseInt(values['livingRoom']),
                    'balcony' : parseInt(values['balcony']),
                    'bathroom' : parseInt(values['bathroom']),
                    "buildingType" : parseInt(values['TypeOfBuild'])
                },
                'ping' : parseInt(values['ping']),
                'parking' : convertString(values['parking'] === undefined ? '0' : values['parking']),
                'traffic' : TrafficArr,
                'life' : LifeArr,
                'educate' : EducationArr,
                'saleType': 1,
                'saleInfo' : {
                    "pet": extraRequire.includes('pet'),
                    "manager": extraRequire.includes('manager'),
                    "garbage": extraRequire.includes('garbage'),
                    "managerPrice": extraRequire.includes('manager') ? parseInt(values['manageFee']) : 0,
                    "garbagePrice": extraRequire.includes('garbage') ? parseInt(values['garbageFee']) : 0,
                    "smoke": extraRequire.includes('smoke'),
                    "cook": extraRequire.includes('cook'),
                    "typeOfRental": parseInt(values['TypeOfRental'])
                },
                'photo' : photoData,
                'annex' : annexData
            }
        )
        setIsRunPost(true)
        setAnnexEnable(false)
        setFormDataEnable(false)
        setPictureList([])
        form_photo.resetFields()
        setAnnexList([])
        form_annex.resetFields()
    };
    console.log(HouseData);

    const AddressPrefixSelector = (
        <Form.Item name="AddressPrefix" noStyle>
            <Select style={{
                width: 90,
            }}
            >
                <Option value="台北市">台北市</Option>
                <Option value="新北市">新北市</Option>
                <Option value="桃園市">桃園市</Option>
                <Option value="台中市">台中市</Option>
                <Option value="台南市">台南市</Option>
                <Option value="高雄市">高雄市</Option>
            </Select>
        </Form.Item>
    );


    const onExtraRequireChange = list => {
        // console.log(`selected ${list}` )
        console.log(list)
        setExtraRequire(list);
        setShowHideManageFee(list.includes('manager'))
        setShowHideGarbageFee(list.includes('garbage'))
        //
        // setRoles(list.map(i => Number(i)))
    };


    // console.log(PictureList)

    const PicRemove = (file) => {
        const index = PictureList.indexOf(file);
        const newFileList = PictureList.slice();
        newFileList.splice(index, 1);
        console.log(newFileList)
        setPictureList(newFileList)
    }
    const AnnexRemove = (file) => {
        const index = AnnexList.indexOf(file);
        const newFileList = AnnexList.slice();
        newFileList.splice(index, 1);
        console.log(newFileList)
        setAnnexList(newFileList)
    }
    const handlePicUpload = () => {

        const formData = new FormData();
        PictureList.forEach(file => {
            formData.append('photo', file);
        });
        setPicUploading(true)
        console.log(formData.values())
        PicAnnexAxios.post(House_Pic_Auth, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }})
            .then( (response) => {
                console.log(response)
                setPhotoData(response['data']['data'])
                setAnnexEnable(true)
            })
            .then(() => {
                // setPictureList([])
                message.success('upload successfully.').then();
            })
            .catch(() => {
                message.error('upload failed.').then();
            })
            .finally(() => {
                setPicUploading(false)
            });
    };
    // console.log(photoData, annexData)
    const handleAnnexUpload = () => {

        const formData = new FormData();
        AnnexList.forEach(file => {
            formData.append('annex', file);
        });
        setAnnexUploading(true)
        console.log(AnnexList)
        PicAnnexAxios.post(House_Annex_Auth, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }})
            .then( (response) => {
                console.log(response)
                setAnnexData(response['data']['data'])
                setFormDataEnable(true);
            })
            .then(() => {
                // setAnnexList([])
                message.success('upload successfully.').then();
            })
            .catch(() => {
                message.error('upload failed.').then();
            })
            .finally(() => {
                setAnnexUploading(false)
            });
    };
    const uploadPicButton = (
        <div>
            <PlusOutlined/>
            <div style={{ marginTop: 8 }}>Upload (Max:10)</div>
        </div>
    );

    const uploadAnnexButton = (
        <div>
            <PlusOutlined/>
            <div style={{ marginTop: 8 }}>Upload (Max:10)</div>
        </div>
    );

    return (

        <div>
                <Form
                    {...formItemLayout}
                    form={form_photo}
                    className="PicUpload"
                    onFinish={handlePicUpload}
                >
                    <Divider> 照片上傳</Divider>
                    <Form.Item
                        name="photoUpload"
                    >
                        <Upload multiple
                                listType="picture-card"
                                headers={
                                   ' "content-type" : "multipart/form-data"'
                                }
                                fileList={PictureList['fileList']}
                                maxCount={10}
                                onRemove={PicRemove}
                                beforeUpload={file => {
                                    console.log(file)
                                    setPictureList(
                                        [...PictureList, file]
                                    );
                                    return false;
                                }}
                                // onChange={CheckPicNum}
                        >
                            {PictureList.length >= 10 ? null : uploadPicButton}

                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className='PicUpload-button'
                                shape="round"
                                loading={PicUploading}
                                disabled={PictureList.length === 0}
                                onClick={() => message.success('照片上傳成功')}
                        >
                            {PicUploading ? 'Uploading' : '提交照片'}
                        </Button>
                    </Form.Item>
                </Form>
            {AnnexEnable &&
            <Form
                    {...formItemLayout}
                    form={form_annex}
                    className="AnnexUpload"
                    onFinish={handleAnnexUpload}
                >
                    <Divider> 附件上傳</Divider>
                    <Form.Item
                        name="annexUpload"
                    >
                        <Upload multiple
                                listType="picture-card"
                                fileList={AnnexList['fileList']}
                                maxCount={10}
                                onRemove={AnnexRemove}
                                beforeUpload={file => {
                                    console.log(file)
                                    setAnnexList(
                                        [...AnnexList, file]
                                    );
                                    return false;
                                }}
                        >
                            {AnnexList.length >= 10 ? null : uploadAnnexButton}

                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className='AnnexUpload-button'
                                shape="round"
                                loading={AnnexUploading}
                                disabled={AnnexList.length === 0}
                                onClick={() => message.success('附件上傳成功')}
                        >
                            {AnnexUploading ? 'Uploading' : '提交附件'}
                        </Button>
                    </Form.Item>
                </Form>}
            {FormDataEnable &&
            <Form
                        {...formItemLayout}
                        form={form}
                        className="HouseUpload_form"
                        name="HouseUpload"
                        onFinish={UploadHouseData}
                        scrollToFirstError
                >

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
                    <Form.Item label="類型">
                        <Form.Item style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                            name="TypeOfBuild"
                        >
                            <Select>
                                <Option value="1">公寓</Option>
                                <Option value="2">電梯大樓</Option>
                                <Option value="3">透天</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                            name="TypeOfRental"
                        >
                            <Select>
                                <Option value="1">整層住家</Option>
                                <Option value="2">獨立套房</Option>
                                <Option value="3">分租套房</Option>
                                <Option value="4">雅房</Option>
                            </Select>
                        </Form.Item>
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
                        label="門牌"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your Address!',
                            },
                        ]}
                    >
                        <Form.Item name="lane"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                        >
                            <Input
                                   placeholder=""
                                   style={{width: '100%'}}
                                   suffix='巷'
                            />
                        </Form.Item>

                        {/*<span> 巷 </span>*/}
                        <Form.Item name="alley"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px'}}
                        >
                            <Input
                                placeholder="非必填"
                                style={{width: '100%'}}
                                suffix='弄'
                            />
                        </Form.Item>
                        {/*<span> 弄 </span>*/}
                        <Form.Item name="NO1"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px'}}
                        >
                            <Input
                                placeholder=""
                                style={{width: '100%'}}
                                suffix='號之'
                            />
                        </Form.Item>
                        {/*<span> 號 </span>*/}
                        {/*<span> 之 </span>*/}
                        <Form.Item name="NO2"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px'}}
                        >
                            <Input
                                placeholder="非必填"
                                style={{width: '100%'}}
                            />
                        </Form.Item>
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
                        <Form.Item name="room"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                        >
                            <Input
                                placeholder=""
                                style={{width: '100%'}}
                                suffix='房'
                            />
                        </Form.Item>
                        {/*<span> 房 </span>*/}
                        <Form.Item name="livingRoom"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                        >
                            <Input
                                placeholder=""
                                style={{width: '100%'}}
                                suffix='廳'
                            />
                        </Form.Item>
                        {/*<span> 廳 </span>*/}
                        <Form.Item name="bathroom"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                        >
                            <Input
                                placeholder=""
                                style={{width: '100%'}}
                                suffix='衛'
                            />
                        </Form.Item>
                        {/*<span> 衛 </span>*/}
                        <Form.Item name="balcony"
                                   style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                        >
                            <Input
                                placeholder=""
                                style={{width: '100%'}}
                                suffix='陽台'
                            />
                        </Form.Item>
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
                    <Form.Item
                        name="parking"
                        label="停車位"
                        rules={[
                            {
                                required: false,
                                message: 'Please select yes or no!',
                            },
                        ]}
                    >
                        <Select style={{
                            width: 150,
                        }}
                        >
                            <Option value="1">有</Option>
                            <Option value="0">無</Option>
                        </Select>
                    </Form.Item>

                    <Divider>額外資訊填寫</Divider>

                    <Form.Provider>
                        <Form.Item label="鄰近交通" >
                            {TrafficArr.length ? (
                                <ul>
                                    {TrafficArr.map((traffic, index) => (
                                        <li key={index} className="trafficList" style={{fontSize: '1.2rem'}}>
                                            {/*名稱：{traffic.TrafficName}, 距離：{traffic.TrafficDistance} 公尺 , 類型：{Traffic_Type[traffic.TrafficType-1]}*/}
                                            名稱：{traffic.name}, 距離：{traffic.distance} 公尺 , 類型：{Traffic_Type[traffic.type-1]}
                                            <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                            <Button icon={<DeleteOutlined />} onClick={() => {
                                                if(!delTraffic ) {
                                                    TrafficArr.splice(index,1)
                                                    setDelTraffic(true)
                                                }
                                            }}>delete</Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{fontSize: '1.2rem'}}>NONE</p>
                            )}
                            <Button type="dashed"
                                    htmlType="button"
                                    style={{
                                        margin: '0 8px',
                                        width: "50%"
                                    }}
                                    onClick={showTrafficModal}
                                    block icon={<PlusOutlined />}
                            >
                                Add Traffic info
                            </Button>
                            <Modal title="Traffic info"
                                   visible={trafficVisible}
                                   onOk={() => {
                                       form_traffic.validateFields()
                                               .then((values) => {
                                                   form_traffic.resetFields();
                                                   onTrafficCreate(values);
                                               })
                                               .catch((info) => {
                                                   console.log('Validate Failed:', info);
                                               });
                                       }
                                   }
                                   onCancel={hideTrafficModal}>
                                <Form form={form_traffic} layout="vertical" name="TrafficForm">
                                    <Form.Item
                                        // name="TrafficName"
                                        name="name"
                                        label="名稱："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input placeholder="" style={{width: '50%'}}/>
                                    </Form.Item>
                                    <Form.Item
                                        // name="TrafficDistance"
                                        name="distance"
                                        label="距離："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '50%'}}
                                                     min={0}
                                                     // formatter={value => `${value} 公尺`}
                                                     addonAfter="公尺"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        // name="TrafficType"
                                        name="type"
                                        label="類型："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Select style={{
                                            width: '30%',
                                        }}
                                        >
                                            <Option value="1">捷運站</Option>
                                            <Option value="2">公車站/客運站</Option>
                                            <Option value="3">火車站</Option>
                                            <Option value="4">高鐵站</Option>
                                            <Option value="5">機場</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Form.Item>
                    </Form.Provider>

                    <Form.Provider>
                        <Form.Item label="鄰近生活圈">
                            {LifeArr.length ? (
                                <ul>
                                    {LifeArr.map((life, index) => (
                                        <li key={index} className="lifeList" style={{fontSize: '1.0rem'}}>
                                            {/*名稱：{life.LifeName}, 距離：{life.LifeDistance} 公尺 , 類型：{Life_Type[life.LifeType-1]}*/}
                                            名稱：{life.name}, 距離：{life.distance} 公尺 , 類型：{Life_Type[life.type-1]}
                                            <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                            <Button icon={<DeleteOutlined />} onClick={() => {
                                                if(!delLife ) {
                                                    LifeArr.splice(index,1)
                                                    setDelLife(true)
                                                }
                                            }}>delete</Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{fontSize: '1.2rem'}}>NONE</p>
                            )}
                            <Button type="dashed"
                                    htmlType="button"
                                    style={{
                                        margin: '0 8px',
                                        width: "50%"
                                    }}
                                    onClick={showLifeModal}
                                    block icon={<PlusOutlined />}
                            >
                                Add Life info
                            </Button>
                            <Modal title="Life info"
                                   visible={lifeVisible}
                                   onOk={() => {
                                       form_life.validateFields()
                                           .then((values) => {
                                               form_life.resetFields();
                                               onLifeCreate(values);
                                           })
                                           .catch((info) => {
                                               console.log('Validate Failed:', info);
                                           });
                                   }
                                   }
                                   onCancel={hideLifeModal}>
                                <Form form={form_life} layout="vertical" name="LifeForm">
                                    <Form.Item
                                        // name="LifeName"
                                        name="name"
                                        label="名稱："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input placeholder="" style={{width: '50%'}}/>
                                    </Form.Item>
                                    <Form.Item
                                        // name="LifeDistance"
                                        name="distance"
                                        label="距離："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '50%'}}
                                                     min={0}
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="公尺"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        // name="LifeType"
                                        name="type"
                                        label="類型："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Select style={{
                                            width: '30%',
                                        }}
                                        >
                                            <Option value="1">夜市</Option>
                                            <Option value="2">科學圓區</Option>
                                            <Option value="3">計畫區</Option>
                                            <Option value="4">重劃區</Option>
                                            <Option value="5">傳統商圈</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Form.Item>
                    </Form.Provider>

                    <Form.Provider>
                        <Form.Item label="鄰近學校">
                            {EducationArr.length ? (
                                <ul>
                                    {EducationArr.map((education, index) => (
                                        <li key={index} className="EduList" style={{fontSize: '1.2rem'}} >
                                            {/*名稱：{education.EduName}, 距離：{education.EduDistance} 公尺 , 類型：{Edu_Type[education.EduType-1]}*/}
                                            名稱：{education.name}, 距離：{education.distance} 公尺 , 類型：{Edu_Type[education.type-1]}
                                            <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                            <Button icon={<DeleteOutlined />} onClick={() => {
                                                if(!delEdu ) {
                                                    EducationArr.splice(index,1)
                                                    setDelEdu(true)
                                                }
                                            }}>delete</Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{fontSize: '1.2rem'}}>NONE</p>
                            )}
                            <Button type="dashed"
                                    htmlType="button"
                                    style={{
                                        margin: '0 8px',
                                        width: "50%"
                                    }}
                                    onClick={showEduModal}
                                    block icon={<PlusOutlined />}
                            >
                                Add Education info
                            </Button>
                            <Modal title="Education info"
                                   visible={eduVisible}
                                   onOk={() => {
                                       form_edu.validateFields()
                                           .then((values) => {
                                               form_edu.resetFields();
                                               onEduCreate(values);
                                           })
                                           .catch((info) => {
                                               console.log('Validate Failed:', info);
                                           });
                                   }
                                   }
                                   onCancel={hideEduModal}>
                                <Form form={form_edu} layout="vertical" name="EduForm">
                                    <Form.Item
                                        // name="EduName"
                                        name="name"
                                        label="名稱："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input placeholder="" style={{width: '50%'}}/>
                                    </Form.Item>
                                    <Form.Item
                                        // name="EduDistance"
                                        name="distance"
                                        label="距離："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '50%'}}
                                                     min={0}
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="公尺"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        // name="EduType"
                                        name="type"
                                        label="類型："
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Select style={{
                                            width: '30%',
                                        }}
                                        >
                                            <Option value="1">幼稚園</Option>
                                            <Option value="2">小學</Option>
                                            <Option value="3">國中</Option>
                                            <Option value="4">高中/高職</Option>
                                            <Option value="5">大學/科大</Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Form.Item>
                    </Form.Provider>

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
                        <Form.Item>
                            {ShowHideManageFee &&
                            <Form.Item
                                name="manageFee"
                                label="管理費"
                                style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your manageFee!',
                                    },
                                ]}
                            >

                                <Input placeholder=""
                                       style={{ width: '100%', margin: '0 4px' }}
                                       suffix='元'
                                />

                            </Form.Item>
                            }

                            {ShowHideGarbageFee &&
                            <Form.Item
                                name="garbageFee"
                                label="垃圾費"
                                style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your garbageFee!',
                                    },
                                ]}
                            >
                                <Input placeholder=""
                                       style={{ width: '100%', margin: '0 4px' }}
                                       suffix='元'
                                />
                            </Form.Item>
                            }
                        </Form.Item>
                        </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary"
                                htmlType="submit"
                                className='HouseData-button'
                                shape="round"
                        >
                            資料提交
                        </Button>
                    </Form.Item>
                </Form>}
        </div>
    );
};

export default HouseUpload;
