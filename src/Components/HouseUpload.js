import React, {useEffect, useState} from 'react';
import {Form, Button, Modal, Input, InputNumber, Select, Divider, Row, Col, Checkbox, Upload, message} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseAxios, PicAnnexAxios} from './axiosApi'
import { DeleteOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";

const { Option } = Select;

const CityOptions = [{ value: '台北市' }, { value: '新北市' }, { value: '桃園市' }, { value: '台中市' }, { value: '台南市' }, { value: '高雄市' }, { value: '基隆市' }, { value: '新竹市' }, { value: '嘉義市' }, { value: '新竹縣' }, { value: '苗栗縣' }, { value: '彰化縣' }, { value: '南投縣' }, { value: '雲林縣' }, { value: '嘉義縣' }, { value: '屏東縣' }, { value: '宜蘭縣' }, { value: '花蓮縣' }, { value: '臺東縣' }, { value: '澎湖縣' }, { value: '金門縣' }, { value: '連江縣' }];
const TaipeiAreaOptions = [{ value: '中正區'},{ value: '大同區'},{ value: '中山區'},{ value: '松山區'},{ value: '大安區'},{ value: '萬華區'},{ value: '信義區'},{ value: '士林區'},{ value: '北投區'},{ value: '內湖區'},{ value: '南港區'},{ value: '文山區'}]
const NewTaipeiAreaOptions = [{ value: '板橋區'},{ value: '新莊區'},{ value: '中和區'},{ value: '永和區'},{ value: '土城區'},{ value: '樹林區'},{ value: '三峽區'},{ value: '鶯歌區'},{ value: '三重區'},{ value: '蘆洲區'},{ value: '五股區'},{ value: '泰山區'},{ value: '林口區'},{ value: '八里區'},{ value: '淡水區'},{ value: '三芝區'},{ value: '石門區'},{ value: '金山區'},{ value: '萬里區'},{ value: '汐止區'},{ value: '瑞芳區'},{ value: '貢寮區'},{ value: '平溪區'},{ value: '雙溪區'},{ value: '新店區'},{ value: '深坑區'},{ value: '石碇區'},{ value: '坪林區'},{ value: '烏來區'}]
const TaoYuanAreaOptions = [{ value: '桃園區'},{ value: '中壢區'},{ value: '平鎮區'},{ value: '八德區'},{ value: '楊梅區'},{ value: '蘆竹區'},{ value: '大溪區'},{ value: '龍潭區'},{ value: '龜山區'},{ value: '大園區'},{ value: '觀音區'},{ value: '新屋區'},{ value: '復興區'}]
const TaiChungAreaOptions = [{ value: '中區'},{ value: '東區'},{ value: '南區'},{ value: '西區'},{ value: '北區'},{ value: '北屯區'},{ value: '西屯區'},{ value: '南屯區'},{ value: '太平區'},{ value: '大里區'},{ value: '霧峰區'},{ value: '烏日區'},{ value: '豐原區'},{ value: '后里區'},{ value: '石岡區'},{ value: '東勢區'},{ value: '新社區'},{ value: '潭子區'},{ value: '大雅區'},{ value: '神岡區'},{ value: '大肚區'},{ value: '沙鹿區'},{ value: '龍井區'},{ value: '梧棲區'},{ value: '清水區'},{ value: '大甲區'},{ value: '外埔區'},{ value: '大安區'},{ value: '和平區'}]
const TaiNanAreaOptions = [{ value: '中西區'},{ value: '東區'},{ value: '南區'},{ value: '北區'},{ value: '安平區'},{ value: '安南區'},{ value: '永康區'},{ value: '歸仁區'},{ value: '新化區'},{ value: '左鎮區'},{ value: '玉井區'},{ value: '楠西區'},{ value: '南化區'},{ value: '仁德區'},{ value: '關廟區'},{ value: '龍崎區'},{ value: '官田區'},{ value: '麻豆區'},{ value: '佳里區'},{ value: '西港區'},{ value: '七股區'},{ value: '將軍區'},{ value: '學甲區'},{ value: '北門區'},{ value: '新營區'},{ value: '後壁區'},{ value: '白河區'},{ value: '東山區'},{ value: '六甲區'},{ value: '下營區'},{ value: '柳營區'},{ value: '鹽水區'},{ value: '善化區'},{ value: '大內區'},{ value: '山上區'},{ value: '新市區'},{ value: '安定區'}]
const KaoHsiungAreaOptions = [{ value: '楠梓區'},{ value: '左營區'},{ value: '鼓山區'},{ value: '三民區'},{ value: '鹽埕區'},{ value: '前金區'},{ value: '新興區'},{ value: '苓雅區'},{ value: '前鎮區'},{ value: '旗津區'},{ value: '小港區'},{ value: '鳳山區'},{ value: '大寮區'},{ value: '鳥松區'},{ value: '林園區'},{ value: '仁武區'},{ value: '大樹區'},{ value: '大社區'},{ value: '岡山區'},{ value: '路竹區'},{ value: '橋頭區'},{ value: '梓官區'},{ value: '彌陀區'},{ value: '永安區'},{ value: '燕巢區'},{ value: '田寮區'},{ value: '阿蓮區'},{ value: '茄萣區'},{ value: '湖內區'},{ value: '旗山區'},{ value: '美濃區'},{ value: '內門區'},{ value: '杉林區'},{ value: '甲仙區'},{ value: '六龜區'},{ value: '茂林區'},{ value: '桃源區'},{ value: '那瑪夏區'}]
const KeeLungAreaOptions = [{ value: '仁愛區'},{ value: '中正區'},{ value: '信義區'},{ value: '中山區'},{ value: '安樂區'},{ value: '暖暖區'},{ value: '七堵區'}]
const HsinChuCityAreaOptions = [{ value: '東區'},{ value: '北區'},{ value: '香山區'}]
const ChiaYiCityAreaOptions = [{ value: '東區'},{ value: '西區'}]
const HsinChuAreaOptions = [{ value: '竹北市'},{ value: '竹東鎮'},{ value: '新埔鎮'},{ value: '關西鎮'},{ value: '湖口鄉'},{ value: '新豐鄉'},{ value: '峨眉鄉'},{ value: '寶山鄉'},{ value: '北埔鄉'},{ value: '芎林鄉'},{ value: '橫山鄉'},{ value: '尖石鄉'},{ value: '五峰鄉'}]
const MiaoLiAreaOptions = [{ value: '苗栗市'},{ value: '頭份市'},{ value: '竹南鎮'},{ value: '後龍鎮'},{ value: '通霄鎮'},{ value: '苑裡鎮'},{ value: '卓蘭鎮'},{ value: '造橋鄉'},{ value: '西湖鄉'},{ value: '頭屋鄉'},{ value: '公館鄉'},{ value: '銅鑼鄉'},{ value: '三義鄉'},{ value: '大湖鄉'},{ value: '獅潭鄉'},{ value: '三灣鄉'},{ value: '南庄鄉'},{ value: '泰安鄉'}]
const ChangHuaAreaOptions = [{ value: '彰化市'},{ value: '員林市'},{ value: '和美鎮'},{ value: '鹿港鎮'},{ value: '溪湖鎮'},{ value: '二林鎮'},{ value: '田中鎮'},{ value: '北斗鎮'},{ value: '花壇鄉'},{ value: '芬園鄉'},{ value: '大村鄉'},{ value: '永靖鄉'},{ value: '伸港鄉'},{ value: '線西鄉'},{ value: '福興鄉'},{ value: '秀水鄉'},{ value: '埔心鄉'},{ value: '埔鹽鄉'},{ value: '大城鄉'},{ value: '芳苑鄉'},{ value: '竹塘鄉'},{ value: '社頭鄉'},{ value: '二水鄉'},{ value: '田尾鄉'},{ value: '埤頭鄉'},{ value: '溪州鄉'}]
const NanTouAreaOptions = [{ value: '南投市'},{ value: '埔里鎮'},{ value: '草屯鎮'},{ value: '竹山鎮'},{ value: '集集鎮'},{ value: '名間鄉'},{ value: '鹿谷鄉'},{ value: '中寮鄉'},{ value: '魚池鄉'},{ value: '國姓鄉'},{ value: '水里鄉'},{ value: '信義鄉'},{ value: '仁愛鄉'}]
const YunLinAreaOptions = [{ value: '斗六市'},{ value: '斗南鎮'},{ value: '虎尾鎮'},{ value: '西螺鎮'},{ value: '土庫鎮'},{ value: '北港鎮'},{ value: '林內鄉'},{ value: '古坑鄉'},{ value: '大埤鄉'},{ value: '莿桐鄉'},{ value: '褒忠鄉'},{ value: '二崙鄉'},{ value: '崙背鄉'},{ value: '麥寮鄉'},{ value: '臺西鄉'},{ value: '東勢鄉'},{ value: '元長鄉'},{ value: '四湖鄉'},{ value: '口湖鄉'},{ value: '水林鄉'}]
const chiayiAreaOptions = [{ value: '太保市'},{ value: '朴子市'},{ value: '布袋鎮'},{ value: '大林鎮'},{ value: '民雄鄉'},{ value: '溪口鄉'},{ value: '新港鄉'},{ value: '六腳鄉'},{ value: '東石鄉'},{ value: '義竹鄉'},{ value: '鹿草鄉'},{ value: '水上鄉'},{ value: '中埔鄉'},{ value: '竹崎鄉'},{ value: '梅山鄉'},{ value: '番路鄉'},{ value: '大埔鄉'},{ value: '阿里山鄉'}]
const PingTungAreaOptions = [{ value: '屏東市'},{ value: '潮州鎮'},{ value: '東港鎮'},{ value: '恆春鎮'},{ value: '萬丹鄉'},{ value: '長治鄉'},{ value: '麟洛鄉'},{ value: '九如鄉'},{ value: '里港鄉'},{ value: '鹽埔鄉'},{ value: '高樹鄉'},{ value: '萬巒鄉'},{ value: '內埔鄉'},{ value: '竹田鄉'},{ value: '新埤鄉'},{ value: '枋寮鄉'},{ value: '新園鄉'},{ value: '崁頂鄉'},{ value: '林邊鄉'},{ value: '南州鄉'},{ value: '佳冬鄉'},{ value: '琉球鄉'},{ value: '車城鄉'},{ value: '滿州鄉'},{ value: '枋山鄉'},{ value: '霧臺鄉'},{ value: '瑪家鄉'},{ value: '泰武鄉'},{ value: '來義鄉'},{ value: '春日鄉'},{ value: '獅子鄉'},{ value: '牡丹鄉'},{ value: '三地門鄉'}]
const YiLanAreaOptions = [{ value: '宜蘭市'},{ value: '頭城鎮'},{ value: '羅東鎮'},{ value: '蘇澳鎮'},{ value: '礁溪鄉'},{ value: '壯圍鄉'},{ value: '員山鄉'},{ value: '冬山鄉'},{ value: '五結鄉'},{ value: '三星鄉'},{ value: '大同鄉'},{ value: '南澳鄉'}]
const HuaLienAreaOptions = [{ value: '花蓮市'},{ value: '鳳林鎮'},{ value: '玉里鎮'},{ value: '新城鄉'},{ value: '吉安鄉'},{ value: '壽豐鄉'},{ value: '光復鄉'},{ value: '豐濱鄉'},{ value: '瑞穗鄉'},{ value: '富里鄉'},{ value: '秀林鄉'},{ value: '萬榮鄉'},{ value: '卓溪鄉'}]
const TaiTungAreaOptions = [{ value: '臺東市'},{ value: '成功鎮'},{ value: '關山鎮'},{ value: '長濱鄉'},{ value: '池上鄉'},{ value: '東河鄉'},{ value: '鹿野鄉'},{ value: '卑南鄉'},{ value: '大武鄉'},{ value: '綠島鄉'},{ value: '太麻里鄉'},{ value: '海端鄉'},{ value: '延平鄉'},{ value: '金峰鄉'},{ value: '達仁鄉'},{ value: '蘭嶼鄉'}]
const PengHuAreaOptions = [{ value: '馬公市'},{ value: '湖西鄉'},{ value: '白沙鄉'},{ value: '西嶼鄉'},{ value: '望安鄉'},{ value: '七美鄉'}]
const KinMenAreaOptions = [{ value: '金城鎮'},{ value: '金湖鎮'},{ value: '金沙鎮'},{ value: '金寧鄉'},{ value: '烈嶼鄉'},{ value: '烏坵鄉'}]
const LianJiangAreaOptions = [{ value: '南竿鄉'},{ value: '北竿鄉'},{ value: '莒光鄉'},{ value: '東引鄉'}]


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
const photoType = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/jpg', 'image/bmp']
const annexType = ['application/pdf']
const PicTemp = []
const AnnexTemp = []
// const convertString = (word) =>{
//     switch(word.toLowerCase().trim()){
//         case "yes": case "true": case "1": return true;
//         case "no": case "false": case "0": case null: return false;
//         default: return Boolean(word);
//     }
// }

const HouseUpload = (prop) => {
    const xToken = cookie.load('x-token')
    const decodedToken = jwt_decode(xToken);
    console.log('HouseUpload cookie x-token: '+xToken)
    console.log('HouseUpload cookie decodedToken: '+JSON.stringify(decodedToken))
    console.log('HouseUpload cookie id: '+decodedToken.id)


    const [form] = Form.useForm();
    const [form_photo] = Form.useForm();
    const [form_annex] = Form.useForm();
    const [form_traffic] = Form.useForm();
    const [form_life] = Form.useForm();
    const [form_edu] = Form.useForm();
    const [extraRequire, setExtraRequire] = useState(defaultExtraRequire);
    const [ShowHideManageFee, setShowHideManageFee] = useState(false );
    const [ShowHideGarbageFee, setShowHideGarbageFee] = useState(false );
    const [areaOptions, setAreaOptions] = useState([]);
    const [selectArea, setSelectArea] = useState(null);
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
                // .then( (response) => console.log(response.data.status))
                .then((response) => {
                    console.log(response.data)
                    if(!response.data.status && response.data.data.includes('house address is exist')) {
                        message.error({
                            content: '此地址已存在，請重新填寫正確地址',
                            style: {
                                fontSize: '40px',
                                marginTop: '20vh',
                            },
                            duration: 4,
                        }).then()
                        // message.error("此地址已存在，請重新填寫正確地址", 2).then()
                    }else{
                        message.success({
                            content: '房屋資料上傳成功',
                            style: {
                                fontSize: '40px',
                                marginTop: '20vh',
                            },
                            duration: 2,
                        }).then(() => {})
                        // message.success(`房屋資料上傳成功`, 2, ).then()
                    }

                })
                .catch( (error) => message.error(`${error}`, 2))

            setIsRunPost(false)
        }
    }, [isRunPost, HouseData])

    const UploadHouseData = (values) => {
        console.log('Received values of form: ', values);
        setHouseData(
            {
                'name' : values['name'],
                'city' : values['City'],
                'area' : values['Area'],
                'owner' : decodedToken.id,
                'address': values['City']+values['Area']+values['address'],
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
                'parking' : extraRequire.includes('parking'),
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
        form.resetFields()
        setExtraRequire([])
        setShowHideManageFee(false)
        setShowHideGarbageFee(false)
        PicTemp.splice(0, PicTemp.length)
        AnnexTemp.splice(0, AnnexTemp.length)
    };
    console.log(HouseData);

    // const AddressPrefixSelector = (
    //     <Form.Item name="AddressPrefix" noStyle>
    //         <Select style={{
    //             width: 90,
    //         }}
    //         >
    //             <Option value="台北市">台北市</Option>
    //             <Option value="新北市">新北市</Option>
    //             <Option value="桃園市">桃園市</Option>
    //             <Option value="台中市">台中市</Option>
    //             <Option value="台南市">台南市</Option>
    //             <Option value="高雄市">高雄市</Option>
    //         </Select>
    //     </Form.Item>
    // );

    const changeCity = (City) => {
        setSelectArea(null)
        setAreaOptions([])
        switch(City){
                case CityOptions[0].value:
                    setAreaOptions(TaipeiAreaOptions)
                    break;
                case CityOptions[1].value:
                    setAreaOptions(NewTaipeiAreaOptions)
                    break;
                case CityOptions[2].value:
                    setAreaOptions(TaoYuanAreaOptions)
                    break;
                case CityOptions[3].value:
                    setAreaOptions(TaiChungAreaOptions)
                    break;
                case CityOptions[4].value:
                    setAreaOptions(TaiNanAreaOptions)
                    break;
                case CityOptions[5].value:
                    setAreaOptions(KaoHsiungAreaOptions)
                    break;
                case CityOptions[6].value:
                    setAreaOptions(KeeLungAreaOptions)
                    break;
                case CityOptions[7].value:
                    setAreaOptions(HsinChuCityAreaOptions)
                    break;
                case CityOptions[8].value:
                    setAreaOptions(ChiaYiCityAreaOptions)
                    break;
                case CityOptions[9].value:
                    setAreaOptions(HsinChuAreaOptions)
                    break;
                case CityOptions[10].value:
                    setAreaOptions(MiaoLiAreaOptions)
                    break;
                case CityOptions[11].value:
                    setAreaOptions(ChangHuaAreaOptions)
                    break;
                case CityOptions[12].value:
                    setAreaOptions(NanTouAreaOptions)
                    break;
                case CityOptions[13].value:
                    setAreaOptions(YunLinAreaOptions)
                    break;
                case CityOptions[14].value:
                    setAreaOptions(chiayiAreaOptions)
                    break;
                case CityOptions[15].value:
                    setAreaOptions(PingTungAreaOptions)
                    break;
                case CityOptions[16].value:
                    setAreaOptions(YiLanAreaOptions)
                    break;
                case CityOptions[17].value:
                    setAreaOptions(HuaLienAreaOptions)
                    break;
                case CityOptions[18].value:
                    setAreaOptions(TaiTungAreaOptions)
                    break;
                case CityOptions[19].value:
                    setAreaOptions(PengHuAreaOptions)
                    break;
                case CityOptions[20].value:
                    setAreaOptions(KinMenAreaOptions)
                    break;
                case CityOptions[21].value:
                    setAreaOptions(LianJiangAreaOptions)
                    break;
                default:
            }
        }

    const changeArea = (area) => {
        setSelectArea(area)
    }
    
    // const AddressPrefixSelector = (
    //     <Form.Item name="AddressPrefix" noStyle>
    //         <Select allowClear id="citySelect" placeholder="縣市" options={CityOptions} onChange={changeCity} style={{
    //             width: '100%',
    //         }}>
    //         </Select>
    //     </Form.Item>
    // );


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
        PicTemp.splice(index, 1)
    }
    const AnnexRemove = (file) => {
        const index = AnnexList.indexOf(file);
        const newFileList = AnnexList.slice();
        newFileList.splice(index, 1);
        console.log(newFileList)
        setAnnexList(newFileList)
        AnnexTemp.splice(index, 1);
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
                message.success('照片上傳成功').then();
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
                message.success('附件上傳成功').then();
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
    console.log(PictureList)
    return (

        <div>          
                {
                prop.defaultValue?(JSON.stringify(prop)):null    
                }
                <Form
                    
                    form={form_photo}
                    className="PicUpload"
                    onFinish={handlePicUpload}
                >
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                            <Divider> 照片上傳 (jpeg, jpg, bmp, png, svg 檔)</Divider>
                        </Col>
                    </Row>
                    <Form.Item
                        name="photoUpload"
                    >
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Upload multiple={true}
                                        listType="picture-card"
                                        fileList={PictureList['fileList']}
                                        maxCount={10}
                                        onRemove={PicRemove}
                                        beforeUpload={file => {
                                            console.log(file)
                                            const isImage = photoType.includes(file.type);
                                            PicTemp.push(file)
                                            console.log(PicTemp)
                                            if (!isImage) {
                                                message.error(`${file.name} is not a image file`).then(() => {
                                                    // Do something after login is successful.
                                                });
                                            }else {
                                                // setPictureList(
                                                //     [...PictureList, file]
                                                // );
                                                setPictureList(PicTemp);
                                                return false;
                                            }

                                            return isImage || Upload.LIST_IGNORE;
                                        }}
                                    // onChange={CheckPicNum}
                                >
                                    {PictureList.length >= 10 ? null : uploadPicButton}

                                </Upload>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Button type="primary"
                                        htmlType="submit"
                                        className='PicUpload-button'
                                        shape="round"
                                        loading={PicUploading}
                                        disabled={PictureList.length === 0}
                                        // onClick={() => message.success('照片上傳成功')}
                                >
                                    {PicUploading ? 'Uploading' : '提交照片'}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            {
                AnnexEnable &&
            <Form

                    form={form_annex}
                    className="AnnexUpload"
                    onFinish={handleAnnexUpload}
                >
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Divider> 附件上傳 (至少上傳房屋謄本， PDF 檔）</Divider>
                    </Col>
                </Row>
                    <Form.Item
                        name="annexUpload"
                    >
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Upload multiple
                                        listType="picture-card"
                                        fileList={AnnexList['fileList']}
                                        maxCount={10}
                                        onRemove={AnnexRemove}
                                        beforeUpload={file => {
                                            console.log(file)
                                            const isFile = annexType.includes(file.type);
                                            AnnexTemp.push(file)
                                            console.log(AnnexTemp)
                                            if (!isFile) {
                                                message.error(`${file.name} is not a pdf file`).then(() => {
                                                    // Do something after login is successful.
                                                });
                                            }else {
                                                setAnnexList(AnnexTemp);
                                                return false;
                                            }

                                            return isFile || Upload.LIST_IGNORE;
                                            // console.log(file)
                                            // setAnnexList(
                                            //     [...AnnexList, file]
                                            // );
                                            // return false;
                                        }}
                                >
                                    {AnnexList.length >= 10 ? null : uploadAnnexButton}

                                </Upload>
                            </Col>
                        </Row>

                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                <Button type="primary"
                                        htmlType="submit"
                                        className='AnnexUpload-button'
                                        shape="round"
                                        loading={AnnexUploading}
                                        disabled={AnnexList.length === 0}
                                        // onClick={() => message.success('附件上傳成功')}
                                >
                                    {AnnexUploading ? 'Uploading' : '提交附件'}
                                </Button>
                            </Col>
                        </Row>

                    </Form.Item>
                </Form>}
            <Row>
                <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                </Col>
                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                    <Divider/>
                </Col>
            </Row>
            {
                // FormDataEnable &&
                AnnexEnable &&
            <Form

                        form={form}
                        className="HouseUpload_form"
                        name="HouseUpload"
                        onFinish={UploadHouseData}
                        scrollToFirstError
                >
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={6}>
                                <Form.Item
                                    name="name"
                                    label="名稱"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your Name!',
                                        },
                                    ]}
                                    // style={{ width: '100%' }}
                                >
                                    <Input placeholder="" style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                        </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col xs={24} sm={18} md={18} lg={15} xl={12}>
                            <Form.Item label="類型">
                                <Row justify="start">
                                    <Col  xs={12} sm={9} md={9} lg={8} xl={6}>

                                        <Form.Item style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                                                   name="TypeOfBuild"
                                        >
                                            <Select>
                                                <Option value="1">公寓</Option>
                                                <Option value="2">電梯大樓</Option>
                                                <Option value="3">透天</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={9} md={9} lg={8} xl={6}>
                                        <Form.Item style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                                                   name="TypeOfRental"
                                        >
                                            <Select>
                                                <Option value="1">整層住家</Option>
                                                <Option value="2">獨立套房</Option>
                                                <Option value="3">分租套房</Option>
                                                <Option value="4">雅房</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>


                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Form.Item
                            label="地址"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your Address!',
                                },
                            ]}
                        >
                            <Row>
                                <Col xs={5} sm={4} md={4} lg={3} xl={2}>
                                    <Form.Item name="City"
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                               style={{ width: '100%' }}
                                    >
                                        <Select allowClear id="citySelect" placeholder="縣市" options={CityOptions} onChange={changeCity} style={{
                                            width: '100%',
                                        }}>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={5} sm={4} md={4} lg={3} xl={2}>
                                    <Form.Item name="Area"
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                               style={{ width: '100%' }}
                                    >
                                        <Select id="area" value={selectArea}  allowClear placeholder="區域" options={areaOptions} onChange={changeArea} style={{
                                            width: '100%',
                                        }}>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={14} sm={10} md={10} lg={9} xl={8}>
                                    <Form.Item name="address"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <Input  style={{
                                            width: '100%',
                                        }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Form.Item
                            label="門牌"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your Address!',
                                },
                            ]}
                        >
                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="lane"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >

                                        <Input
                                            placeholder=""
                                            style={{width: '100%'}}
                                            suffix='巷'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="alley"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <Input
                                            placeholder="非必填"
                                            style={{width: '100%'}}
                                            suffix='弄'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="NO1"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <Input
                                            placeholder=""
                                            style={{width: '100%'}}
                                            suffix='號之'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="NO2"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <Input
                                            placeholder="非必填"
                                            style={{width: '100%'}}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
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
                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                    <InputNumber placeholder=""
                                                 style={{width: '100%'}}
                                                 min={0}
                                        // formatter={value => `${value} 公尺`}
                                                 addonAfter="樓"
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
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
                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                    <InputNumber placeholder=""
                                                 style={{width: '100%'}}
                                                 min={0}
                                        // formatter={value => `${value} 公尺`}
                                                 addonAfter=""
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
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
                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="room"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '100%'}}
                                                     min={0}
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="房"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="livingRoom"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '100%'}}
                                                     min={0}
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="廳"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="bathroom"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '100%'}}
                                                     min={0}
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="衛"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                                    <Form.Item name="balcony"
                                               style={{ width: '100%' }}
                                        // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '100%'}}
                                                     min={0}
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="陽台"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>

                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
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
                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                    <InputNumber placeholder=""
                                                 style={{width: '100%'}}
                                                 min={0}
                                        // formatter={value => `${value} 公尺`}
                                                 addonAfter="元/月"
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
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
                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                    <InputNumber placeholder=""
                                                 style={{width: '100%'}}
                                                 min={0}
                                        // formatter={value => `${value} 公尺`}
                                                 addonAfter="坪"
                                    />
                                </Col>
                            </Row>

                        </Form.Item>
                    </Col>
                </Row>



                    {/*<Form.Item*/}
                    {/*    name="parking"*/}
                    {/*    label="停車位"*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            required: false,*/}
                    {/*            message: 'Please select yes or no!',*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Select style={{*/}
                    {/*        width: 150,*/}
                    {/*    }}*/}
                    {/*    >*/}
                    {/*        <Option value="1">有</Option>*/}
                    {/*        <Option value="0">無</Option>*/}
                    {/*    </Select>*/}
                    {/*</Form.Item>*/}
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Divider>額外資訊填寫</Divider>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Form.Provider>
                            <Form.Item label="鄰近交通" ><Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                    {TrafficArr.length ? (
                                        <ol>
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
                                        </ol>
                                    ) : (
                                        <p style={{fontSize: '1.2rem'}}>NONE</p>
                                    )}
                                    <Button type="dashed"
                                            htmlType="button"
                                            style={{
                                                margin: '0 8px',
                                                width: "50%"
                                            }}
                                            disabled={TrafficArr.length >= 20}
                                            onClick={showTrafficModal}
                                            block icon={<PlusOutlined />}
                                    >
                                       Add Traffic info
                                    </Button>
                                </Col>
                            </Row>

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
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Form.Provider>
                            <Form.Item label="鄰近生活圈">
                                <Row>
                                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                    {/*</Col>*/}
                                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                        {LifeArr.length ? (
                                            <ol>
                                                {LifeArr.map((life, index) => (
                                                    <li key={index} className="lifeList" style={{fontSize: '1.2rem'}}>
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
                                            </ol>
                                        ) : (
                                            <p style={{fontSize: '1.2rem'}}>NONE</p>
                                        )}
                                        <Button type="dashed"
                                                htmlType="button"
                                                style={{
                                                    margin: '0 8px',
                                                    width: "50%"
                                                }}
                                                disabled={LifeArr.length >= 20}
                                                onClick={showLifeModal}
                                                block icon={<PlusOutlined />}
                                        >
                                            Add Life info
                                        </Button>
                                    </Col>
                                </Row>

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
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Form.Provider>
                            <Form.Item label="鄰近學校">
                                <Row>
                                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                    {/*</Col>*/}
                                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                        {EducationArr.length ? (
                                            <ol>
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
                                            </ol>
                                        ) : (
                                            <p style={{fontSize: '1.2rem'}}>NONE</p>
                                        )}
                                        <Button type="dashed"
                                                htmlType="button"
                                                style={{
                                                    margin: '0 8px',
                                                    width: "50%"
                                                }}
                                                disabled={EducationArr.length >= 20}
                                                onClick={showEduModal}
                                                block icon={<PlusOutlined />}
                                        >
                                            Add Education info
                                        </Button>
                                    </Col>
                                </Row>

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
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
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
                            <Checkbox.Group style={{ fontSize: '100%' ,width: '100%' }}
                                            value={extraRequire}
                                            onChange={onExtraRequireChange}
                            >
                                <Row>
                                    <Col span={2} xs={4} sm={3} md={3} lg={2} xl={2}>
                                        <Checkbox value='pet'>養寵物</Checkbox>
                                    </Col>
                                    <Col span={2} xs={4} sm={3} md={3} lg={2} xl={2}>
                                        <Checkbox value='manager'>管理費</Checkbox>
                                    </Col>
                                    <Col span={2} xs={4} sm={3} md={3} lg={2} xl={2}>
                                        <Checkbox value='garbage'>垃圾費</Checkbox>
                                    </Col>
                                    <Col span={2} xs={4} sm={3} md={3} lg={2} xl={2}>
                                        <Checkbox value='smoke'>可抽菸</Checkbox>
                                    </Col>
                                    <Col span={2} xs={4} sm={3} md={3} lg={2} xl={2}>
                                        <Checkbox value='cook'>可開伙</Checkbox>
                                    </Col>
                                    <Col span={2} xs={4} sm={3} md={3} lg={2} xl={2}>
                                        <Checkbox value='parking'>停車位</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>

                            <Form.Item>
                                <Row justify="start">
                                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                    {/*</Col>*/}
                                    <Col  xs={12} sm={9} md={9} lg={8} xl={6}>
                                        {ShowHideManageFee &&
                                            <Form.Item
                                                name="manageFee"
                                                label="管理費"
                                                style={{ width: '100%' }}
                                                // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your manageFee!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber placeholder=""
                                                             style={{width: '100%'}}
                                                             min={0}
                                                    // formatter={value => `${value} 公尺`}
                                                             addonAfter="元/月"
                                                />
                                            </Form.Item>
                                        }
                                    </Col>
                                    <Col xs={12} sm={9} md={9} lg={8} xl={6}>
                                        {ShowHideGarbageFee &&
                                            <Form.Item
                                                name="garbageFee"
                                                label="垃圾費"
                                                style={{ width: '100%' }}
                                                // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your garbageFee!',
                                                    },
                                                ]}
                                            >
                                                <InputNumber placeholder=""
                                                             style={{width: '100%'}}
                                                             min={0}
                                                    // formatter={value => `${value} 公尺`}
                                                             addonAfter="元/月"
                                                />
                                            </Form.Item>
                                        }
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                    </Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Form.Item>
                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                    <Button type="primary"
                                            htmlType="submit"
                                            className='HouseData-button'
                                            shape="round"
                                    >
                                        資料提交
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>

                </Form>}
        </div>
    );
};

export default HouseUpload;
