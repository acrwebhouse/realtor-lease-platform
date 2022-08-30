import React, {useEffect, useState, useRef} from 'react';
import 'antd/dist/antd.min.css';
import {
    Form, Input, Radio, Select, Checkbox, Divider, DatePicker, Space,
    Button, Col, Row, message, Modal,
    // Upload
} from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import './Register_form.css'
// import CityAreaData from '../Datas/CityArea.json'
// import axios from "./axiosApi";
import {LoginRegisterAxios} from "./axiosApi"


const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

// let CityAreaOptions = CityAreaData.CityArea

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

const defaultRole = [];
const defaultRank = 0;
const defaultHouseIds = []
const defaultRegisterData = {}

const LicensePattern = /[0-9]{2,3}[\u4e00-\u9fa5]{3, 4}[0-9]{6}[\u4e00-\u9fa5]/
const AccountPattern = /^.[A-Za-z0-9]+$/

const convertString = (word) =>{
    switch(word.toLowerCase().trim()){
        case "yes": case "true": case "1": return true;
        case "no": case "false": case "0": case null: return false;
        default: return Boolean(word);
    }
}

const SighUp_Auth = "/auth/signUp"
const SendVerifyUser_Auth = "/auth/sendVerifyUserMailByMail"

const Register = (props) => {
    const { setIsRegisterModalVisible, initReset, setIsReset } = props
    // console.log(initReset)
    const [form] = Form.useForm();

    const [roleCheck, setRoleCheck] = useState(defaultRole);
    const [ShowHide, setShowHide] = useState(defaultRole.length > 0 )
    const [SaleShowHide, setSaleShowHide] = useState(defaultRole.includes('房仲'))
    const [isEnableCityArea, setIsEnableCityArea] = useState(false)
    // const [initCityAreaData, setInitCityAreaData] = useState([])
    const [initCityData, setInitCityData] = useState([])
    const [initAreaData, setInitAreaData] = useState([])
    const [RegisterData, setRegisterData] = useState(defaultRegisterData)
    const [Roles, setRoles] = useState([])
    const [CityAreaScope, setCityAreaScope] = useState([])
    const [bornDate, setBornDate] = useState('')
    const [failMessage, setFailMessage] = useState('')
    const [isRunPost, setIsRunPost] = useState(false)
    const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false)
    const [registerCheck, setRegisterCheck] = useState(false)
    const [areaOptions, setAreaOptions] = useState([]);
    const [selectArea, setSelectArea] = useState(null);
    const [cityLock, setCityLock] = useState(false)
    const [cityValid, setCityValid] = useState(false)
    const [areaValid, setAreaValid] = useState(false)
    // const [isBackLogin, setIsBackLogin] = useState(false)
    const [VerifyUserEnable, setVerifyUserEnable] = useState(false)

    const [count, setCount] = useState(10)
    const [enableCount, setEnableCount] = useState(false)
    const latestCount = useRef(count) // 定义一个ref，初始值是10

    // console.log(isBackLogin)
    const onRoleChange = list => {
        console.log(list)
        setRoleCheck(list);
        setShowHide(list.length > 0);
        setSaleShowHide(list.includes('4'))

        setRoles(list.map(i => Number(i)))
    };
    console.log(Roles)
    console.log(failMessage)
    //register API
    useEffect(() => {
        // console.log(RegisterData)
        // console.log(CityAreaScope)
        if (isRunPost) {
            LoginRegisterAxios.post(SighUp_Auth, RegisterData)
                .then( (response) =>  {
                    console.log(typeof(response['data']['data']))
                    setRegisterCheck(response['data']['status'])
                    response['data']['status'] ? message.success(`註冊成功`, 2) : message.error(`註冊失敗`, 2)
                    setFailMessage(response['data']['data'])
                })
                .catch( (error) => message.error(`${error}`, 2))

            setIsRunPost(false)
            setCityValid(false)
            setAreaValid(false)

        }
    }, [isRunPost, RegisterData])

    //send VerifyUse Mail api
    console.log(RegisterData.mail)
    useEffect(() => {
        if (VerifyUserEnable) {
            LoginRegisterAxios.get(SendVerifyUser_Auth+"?mail="+RegisterData.mail)
                .then( (response) =>  {
                    console.log(response)
                })
                .catch( (error) => message.error(`${error}`, 2))

            setVerifyUserEnable(false)
        }
    }, [VerifyUserEnable, RegisterData])

    //reset form data when click return
    useEffect(() => {
        if (initReset) {
            form.resetFields();
            setRoleCheck([])
            setIsReset(false);
            setShowHide(false)
            setIsEnableCityArea(false);
            setCityLock(false)
            setInitCityData([]);
            setInitAreaData([]);
            setCityValid(false)
            setAreaValid(false)
        }
    }, [initReset, form, setIsReset])


    const showDate = (date, dateString) => {
        // console.log(date, dateString)
        console.log(dateString)
        setBornDate(dateString)
    }
    console.log(areaValid, cityValid)
    const showRegisterData = (values) => {
        console.log('Received values of form: ', values);
        // const tempData = values;
        // console.log(tempData)

        setRegisterData(
            {
                'account' : values['account'],
                'password': values['password'],
                'name' : values['name'],
                'gender' : convertString(values['radio-gender'] === undefined ? '0' : values['radio-gender']),
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
                // 'phone': values['PhonePrefix']+values['phone']
                'phone': '886'+values['phone'],
                'mail': values['email'],
                'address': values['City']+values['Area']+values['address']
            }
        )
        if(!AccountPattern.test(values['account'])) {
            setIsSubmitModalVisible(false)
            errorAccoutFormat();
        }else {
            if(('886'+values['phone']).length > 12 || ('886'+values['phone']).length < 12 ) {
                setIsSubmitModalVisible(false)
                errorPhoneFormat();
            } else {
                if(Roles.includes(4)) {

                    if (LicensePattern.test(values['LicenseNumber'])) {
                        if(initAreaData.length >=2 ) {
                            setIsSubmitModalVisible(true);
                            setIsRunPost(true)
                        }else {
                            setIsSubmitModalVisible(false)
                            message.loading('loading...', 0.5)
                                .then(() => message.error('經營地區需填兩項', 3));
                        }
                    }else {
                        setIsSubmitModalVisible(false)
                        errorLicenseFormat();
                    }

                }else{
                    setIsSubmitModalVisible(true);
                    setIsRunPost(true)
                }
            }
        }

    };

    const errorLicenseFormat = () => {
        message.loading('loading...', 0.5)
            .then(() => message.error('請輸入正確的營業員證號格式', 3));
    }

    const errorPhoneFormat = () => {
        message.loading('loading...', 0.5)
            .then(() => message.error('請輸入正確的手機號格式或長度(不需要打0)', 3));
    }

    const errorAccoutFormat = () => {
        message.loading('loading...', 0.5)
            .then(() => message.error('帳戶只能輸入大小寫英文與數字', 3));
    }

    const onCityInCharge = (City) => {
        console.log(City);
        setCityValid(true)
        setInitCityData(City)
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

    const onAreaInCharge = (value) => {
        console.log(value);
        setIsEnableCityArea(value.length >= 2 ? !isEnableCityArea : isEnableCityArea)
        setCityLock(true)
        setAreaValid(true)
        setInitAreaData(value)
        if(value.length >= 2) {
            setCityAreaScope({
                    "scope": [
                        {
                            "city": initCityData,
                            "area": value[0]
                        },
                        {
                            "city": initCityData,
                            "area": value[1]
                        }
                    ]
                }
            )
        }
    }

    // const showCityAreaData = (value) => {
    //     console.log(value);
    //     // console.log(value.length);
    //     // setInitCityArea(value.length > 2 ? value.slice(0, 2) : value);
    //     // console.log(initCityArea)
    //     // const temp = []
    //     if(value[0].length === 2) {
    //         for(let x = 0; x< CityAreaOptions.length; x++) {
    //             CityAreaOptions[x] = {...CityAreaOptions[x], "disabled" : true}
    //         }
    //     }
    //
    //     if(value[0].length < 2 ) {
    //         setInitCityAreaData([]);
    //         setCityAreaScope([]);
    //     } else {
    //         if(value[1] && value[1].length < 2) {
    //             setInitCityAreaData(value[0]);
    //             setCityAreaScope([]);
    //         } else {
    //             setInitCityAreaData(value)
    //             setIsEnableCityArea(value.length >= 2 ? !isEnableCityArea : isEnableCityArea)
    //             if (value.length >= 2) {
    //                 setCityAreaScope(
    //                     {
    //                         "scope": [
    //                             {
    //                                 "city": [value[0][0], value[1][0]],
    //                                 "area": [value[0][1], value[1][1]]
    //                             }
    //                         ]
    //                     }
    //                 )
    //             }
    //         }
    //     }
    // }
    console.log(CityAreaScope)
    const resetCityArea = () => {
        setIsEnableCityArea(false);
        setCityLock(false)
        // setInitCityAreaData([]);
        setInitCityData([]);
        setInitAreaData([]);
        setCityAreaScope([]);
    }
    console.log(initCityData)
    const PhonePrefixSelector = (
        <Form.Item name="PhonePrefix" noStyle>
            <Select style={{
                width: 90,
            }}
                    defaultValue="886"
                    disabled
            >
                <Option value="886">+886</Option>
            </Select>
        </Form.Item>
    );

    // const AddressPrefixSelector = (
    //     <Form.Item name="AddressPrefix" noStyle>
    //         <Select style={{
    //             width: 90,
    //         }}
    //         >
    //             <Option value="台北市">台北市</Option>
    //             <Option value="新北市">新北市</Option>
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

    // const showSubmitModal = () => {
    //     setIsSubmitModalVisible(true);
    // }

    const onReset = () => {
        if(registerCheck) {
            form.resetFields();
            setIsEnableCityArea(false);
            // setInitCityAreaData([]);
            setInitCityData([]);
            setInitAreaData([]);
            setCityAreaScope([]);
            setIsSubmitModalVisible(false)
            setIsRegisterModalVisible(false)
            setRegisterData([]);
            setRoleCheck([])
            setShowHide(false)
            setCityLock(false)
        } else {
            setIsSubmitModalVisible(false)
        }

    };

    useEffect(() => {
        latestCount.current = count // 更新
    })
    useEffect(() => {
        const timer = setInterval(() => {
                if(enableCount){
                    if (latestCount.current === 0) { // 此处判断latestCount.current，而不是count
                        clearInterval(timer)
                        setEnableCount(false)
                        setCount(10)
                        return
                    }
                    setCount(c => c - 1)
                }
            }
            , 1000)
        return () => {
            clearInterval(timer)
        }
    }, [enableCount])

    return (
        <>
            <h2>請選擇預想申請的使用者(可重複選)</h2>
            <Checkbox.Group style={{ fontSize: '150%' ,width: '100%' }} value={roleCheck} onChange={onRoleChange}>
                <Row>
                    <Col span={4} offset={3}>
                        <Checkbox value='2'>屋主</Checkbox>
                    </Col>
                    <Col span={4} offset={3}>
                        <Checkbox value='3'>租客</Checkbox>
                    </Col>
                    <Col span={4} offset={3}>
                        <Checkbox value='4'>房仲</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group>
            <Divider/>

            {ShowHide &&
                <Form

                    form={form}
                    className="register_form"
                    name="registerForm"
                    onFinish={showRegisterData}
                    scrollToFirstError
                >

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item
                                name="account"
                                label="帳號"
                                rules={[
                                    {
                                        required: true,
                                        message: '帳號欄位不能空白',
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input size="large" placeholder="" style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item name="radio-gender"
                                       label=" 性別"
                                       rules={[
                                           {
                                               required: false,
                                           },
                                       ]}
                                       style={{ width: '100%' }}
                            >
                                <Col style={{ width: '100%' }}>
                                    <Radio.Group size="large">
                                        <Row>
                                            <Col span={4} offset={4}>
                                                <Radio value={true}>男</Radio>
                                            </Col>
                                            <Col span={4} offset={12}>
                                                <Radio value={false}>女</Radio>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </Col>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: '輸入的 E-mail 格式不正確',
                                    },
                                    {
                                        required: true,
                                        message: 'E-mail欄位不能空白',
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input size="large" placeholder="" style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
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
                                style={{ width: '100%' }}
                            >
                                <Input.Password size="large" placeholder="" style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
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
                                style={{ width: '100%' }}
                            >
                                <Input.Password size="large" placeholder="" style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item
                                name="name"
                                label="名稱"
                                rules={[
                                    {
                                        required: true,
                                        message: '名稱欄位不能空白',
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input size="large" placeholder="" style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item
                                name="phone"
                                label="手機號碼"
                                rules={[
                                    {
                                        required: true,
                                        message: '手機號碼欄位不能空白',
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input  addonBefore={PhonePrefixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                        size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item
                                label="聯絡地址"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input your Address!',
                                    },
                                ]}
                            >
                                <Row>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="City"
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   style={{ width: '100%' }}
                                        >
                                            <Select size="large"  allowClear id="citySelect" placeholder="縣市" options={CityOptions} onChange={changeCity} style={{
                                                width: '100%',
                                            }}>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="Area"
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   style={{ width: '100%' }}
                                        >
                                            <Select size="large" id="area" value={selectArea}  allowClear placeholder="區域" options={areaOptions} onChange={changeArea} style={{
                                                width: '100%',
                                            }}>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name="address"
                                                   style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                        >
                                            <Input size="large"
                                                   style={{
                                                       width: '100%',
                                                   }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*<Row>*/}
                    {/*    <Col xs={24} sm={3} md={3} lg={3} xl={3}>*/}

                    {/*    </Col>*/}
                    {/*    <Col  xs={24} sm={21} md={21} lg={20} xl={18}>*/}
                    {/*        <Form.Item*/}
                    {/*            name="address"*/}
                    {/*            label="聯絡地址"*/}
                    {/*            rules={[*/}
                    {/*                {*/}
                    {/*                    required: false,*/}
                    {/*                    message: 'Please input your Address!',*/}
                    {/*                },*/}
                    {/*            ]}*/}
                    {/*            style={{ width: '100%' }}*/}
                    {/*        >*/}
                    {/*            <Input  addonBefore={AddressPrefixSelector}*/}
                    {/*                    style={{*/}
                    {/*                        width: '100%',*/}
                    {/*                    }}*/}
                    {/*            />*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item label="生日">
                                <Space direction="horizontal">
                                    <DatePicker onChange={showDate} format={dateFormat}/>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>

                    {SaleShowHide &&
                        // <Divider>Extra item for Sales</Divider>
                        <Divider>房仲額外欄位</Divider>
                    }
                    {SaleShowHide &&
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                            </Col>
                            <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                                <Form.Item
                                    name="LicenseNumber"
                                    label="營業員證號"
                                    rules={[
                                        {
                                            required: true,
                                            message: '營業員證號欄位不能空白',
                                        },
                                    ]}
                                    style={{ width: '100%' }}
                                >
                                    <Input size="large" placeholder="" style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                        </Row>}
                    {SaleShowHide &&
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                            </Col>
                            <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                                <Form.Item
                                    label="經營地區"
                                    required
                                    tooltip="選擇同一城市裡兩個熟悉的區域，最好是鄰近的。 ex：松山區 中山區"
                                >
                                    <Row>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Select size="large"
                                                        disabled={isEnableCityArea || cityLock}
                                                        status={!cityValid ? null  : initCityData.length? null : "error"}
                                                        value={initCityData}
                                                        id="citySelect"
                                                        placeholder="縣市"
                                                        options={CityOptions}
                                                        onChange={onCityInCharge}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                >
                                                </Select>
                                                {cityValid && initCityData.length < 1 && <p style={{color:'red'}}>此欄位不能空</p>}
                                            </Space>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    width: '100%',
                                                }}
                                            >
                                                <Select mode="multiple"
                                                        disabled={isEnableCityArea}
                                                        size="large"
                                                        id="area"
                                                    // defaultValue={'松山區'}
                                                        status={!areaValid ? null  : initAreaData.length? null : "error"}
                                                        value={initAreaData}
                                                        allowClear
                                                        placeholder="區域"
                                                        options={initCityData.length > 0 ? areaOptions : null}
                                                        onChange={onAreaInCharge}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                >
                                                </Select>
                                                {areaValid && initAreaData.length<1 && <p style={{color:'red'}}>此欄位不能空</p>}
                                            </Space>
                                        </Col>
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <Button type="primary"
                                                    size="large"
                                                    htmlType="button"
                                                    onClick={resetCityArea}>
                                                重置區域
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                        // <Row>
                        //     <Col xs={24} sm={3} md={3} lg={3} xl={3}>
                        //
                        //     </Col>
                        //     <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                        //         <Form.Item label="經營地區"
                        //                    required
                        //                    rules={[
                        //                        {
                        //                            required: true,
                        //                            message: '區域欄位不能空白',
                        //                        },
                        //                    ]}
                        //                    tooltip="選擇同一城市裡兩個熟悉的區域，最好是鄰近的。 ex：松山區 中山區"
                        //                    style={{width: '100%'}}
                        //         >
                        //             {/*<Cascader size="large"*/}
                        //             {/*          style={{width: '100%'}}*/}
                        //             {/*          options={CityAreaOptions}*/}
                        //             {/*          onChange={showCityAreaData}*/}
                        //             {/*          value={initCityAreaData}*/}
                        //             {/*          disabled={isEnableCityArea}*/}
                        //             {/*          multiple*/}
                        //             {/*          maxTagCount="responsive"*/}
                        //             {/*/>*/}
                        //             <span>
                        //                             <Button type="primary"
                        //                                     size="small"
                        //                                     htmlType="button"
                        //                                     onClick={resetCityArea}>
                        //                                 重置區域
                        //                             </Button>
                        //                         </span>
                        //         </Form.Item>
                        //     </Col>
                        // </Row>
                    }
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={3} xl={3}>

                        </Col>
                        <Col  xs={24} sm={21} md={21} lg={20} xl={18}>
                            <Form.Item>
                                <Button type="primary"
                                        htmlType="submit"
                                        className='login-form-button'
                                        shape="round"
                                        onClick={() => {
                                            setCityValid(true)
                                            setAreaValid(true)
                                        }}
                                        style={{ width: '100%' }}
                                >
                                    {/*Submit*/}
                                    送出
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Modal visible={isSubmitModalVisible}
                           className="SubmitModal"
                           width={700}
                           okText="Submit"
                           cancelText="Return"
                           onCancel={onReset}
                           footer={[
                               <Button key="back" className="return-login" onClick={onReset}>
                                   返回
                               </Button>,
                           ]}
                    >
                        {/*<h2>感謝您註冊成為本平台會員，請登入您個人的Email做帳戶授權驗證，謝謝</h2>*/}
                        {registerCheck ?
                            (<>
                                <h2>感謝您註冊成為本平台會員</h2>
                                <p>本平台會自動發送帳號驗證郵件，請登入您個人的Email做帳戶授權驗證，謝謝</p>
                                <p>如果沒收到授權驗證信，請點下方按鈕重新發送</p>
                                <Button type="primary" disabled={enableCount}
                                        onClick={() => {
                                            setEnableCount(true)
                                            setVerifyUserEnable(true)
                                }}>
                                    重新發送 {enableCount ? count : []}
                                </Button>
                            </>) : failMessage.includes('acc') ? <h2>註冊失敗，帳號已註冊過</h2> :<h2>註冊失敗，電子郵件已註冊過</h2> }
                    </Modal>
                </Form>}
            <Divider/>
        </>
    )
}

export default Register;