import React, {useEffect, useState} from 'react';
import {
    Modal,
    Table,
    Button,
    Image,
    Input,
    Select,
    Row,
    Col,
    Alert,
    Space,
    Form,
    DatePicker,
    Descriptions,
    Divider
} from "antd";
import {CompanyAxios, HouseAxios, TransactionAxios,UserAxios} from './axiosApi'
import cookie from 'react-cookies'
import {config} from '../Setting/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {openInNewTab,showInternelErrorPageForMobile} from './CommonUtil'
import {LogoIcon} from "./Equipment";


const { Option } = Select;
const houseService = config.base_URL_House
const housesListUrl = 'house/getHouses'
const removeHouseUrl = 'house/removeHouse'
// const Transaction_Auth = 'house/dealHouse'
const Transaction_Auth = '/transaction/applyTransaction'
const cancelTransaction_Auth = '/transaction/editTransactionNoIncludeCompany'
const getTransaction_Auth = 'transaction/getTransactionList'
const transferHouse_Auth = 'house/editHouse'
const houseDefaultImage = 'data:image/png;base64,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'

const HousesList = (props) => {
    const xToken = cookie.load('x-token')
    const [form_deal] = Form.useForm();
    const [form_transfer] = Form.useForm();
    const cityOptions = [{ value: '縣市不限' }, { value: '台北市' }, { value: '新北市' }, { value: '桃園市' }, { value: '台中市' }, { value: '台南市' }, { value: '高雄市' }, { value: '基隆市' }, { value: '新竹市' }, { value: '嘉義市' }, { value: '新竹縣' }, { value: '苗栗縣' }, { value: '彰化縣' }, { value: '南投縣' }, { value: '雲林縣' }, { value: '嘉義縣' }, { value: '屏東縣' }, { value: '宜蘭縣' }, { value: '花蓮縣' }, { value: '臺東縣' }, { value: '澎湖縣' }, { value: '金門縣' }, { value: '連江縣' }];
    const taipeiAreaOptions = [{ value: '區域不限' },{ value: '中正區'},{ value: '大同區'},{ value: '中山區'},{ value: '松山區'},{ value: '大安區'},{ value: '萬華區'},{ value: '信義區'},{ value: '士林區'},{ value: '北投區'},{ value: '內湖區'},{ value: '南港區'},{ value: '文山區'}]
    const newTaipeiAreaOptions = [{ value: '區域不限' },{ value: '板橋區'},{ value: '新莊區'},{ value: '中和區'},{ value: '永和區'},{ value: '土城區'},{ value: '樹林區'},{ value: '三峽區'},{ value: '鶯歌區'},{ value: '三重區'},{ value: '蘆洲區'},{ value: '五股區'},{ value: '泰山區'},{ value: '林口區'},{ value: '八里區'},{ value: '淡水區'},{ value: '三芝區'},{ value: '石門區'},{ value: '金山區'},{ value: '萬里區'},{ value: '汐止區'},{ value: '瑞芳區'},{ value: '貢寮區'},{ value: '平溪區'},{ value: '雙溪區'},{ value: '新店區'},{ value: '深坑區'},{ value: '石碇區'},{ value: '坪林區'},{ value: '烏來區'}]
    const taoyuanAreaOptions = [{ value: '區域不限' },{ value: '桃園區'},{ value: '中壢區'},{ value: '平鎮區'},{ value: '八德區'},{ value: '楊梅區'},{ value: '蘆竹區'},{ value: '大溪區'},{ value: '龍潭區'},{ value: '龜山區'},{ value: '大園區'},{ value: '觀音區'},{ value: '新屋區'},{ value: '復興區'}]
    const taichungAreaOptions = [{ value: '區域不限' },{ value: '中區'},{ value: '東區'},{ value: '南區'},{ value: '西區'},{ value: '北區'},{ value: '北屯區'},{ value: '西屯區'},{ value: '南屯區'},{ value: '太平區'},{ value: '大里區'},{ value: '霧峰區'},{ value: '烏日區'},{ value: '豐原區'},{ value: '后里區'},{ value: '石岡區'},{ value: '東勢區'},{ value: '新社區'},{ value: '潭子區'},{ value: '大雅區'},{ value: '神岡區'},{ value: '大肚區'},{ value: '沙鹿區'},{ value: '龍井區'},{ value: '梧棲區'},{ value: '清水區'},{ value: '大甲區'},{ value: '外埔區'},{ value: '大安區'},{ value: '和平區'}]
    const tainanAreaOptions = [{ value: '區域不限' },{ value: '中西區'},{ value: '東區'},{ value: '南區'},{ value: '北區'},{ value: '安平區'},{ value: '安南區'},{ value: '永康區'},{ value: '歸仁區'},{ value: '新化區'},{ value: '左鎮區'},{ value: '玉井區'},{ value: '楠西區'},{ value: '南化區'},{ value: '仁德區'},{ value: '關廟區'},{ value: '龍崎區'},{ value: '官田區'},{ value: '麻豆區'},{ value: '佳里區'},{ value: '西港區'},{ value: '七股區'},{ value: '將軍區'},{ value: '學甲區'},{ value: '北門區'},{ value: '新營區'},{ value: '後壁區'},{ value: '白河區'},{ value: '東山區'},{ value: '六甲區'},{ value: '下營區'},{ value: '柳營區'},{ value: '鹽水區'},{ value: '善化區'},{ value: '大內區'},{ value: '山上區'},{ value: '新市區'},{ value: '安定區'}]
    const kaohsiungAreaOptions = [{ value: '區域不限' },{ value: '楠梓區'},{ value: '左營區'},{ value: '鼓山區'},{ value: '三民區'},{ value: '鹽埕區'},{ value: '前金區'},{ value: '新興區'},{ value: '苓雅區'},{ value: '前鎮區'},{ value: '旗津區'},{ value: '小港區'},{ value: '鳳山區'},{ value: '大寮區'},{ value: '鳥松區'},{ value: '林園區'},{ value: '仁武區'},{ value: '大樹區'},{ value: '大社區'},{ value: '岡山區'},{ value: '路竹區'},{ value: '橋頭區'},{ value: '梓官區'},{ value: '彌陀區'},{ value: '永安區'},{ value: '燕巢區'},{ value: '田寮區'},{ value: '阿蓮區'},{ value: '茄萣區'},{ value: '湖內區'},{ value: '旗山區'},{ value: '美濃區'},{ value: '內門區'},{ value: '杉林區'},{ value: '甲仙區'},{ value: '六龜區'},{ value: '茂林區'},{ value: '桃源區'},{ value: '那瑪夏區'}]
    const keelungAreaOptions = [{ value: '區域不限' },{ value: '仁愛區'},{ value: '中正區'},{ value: '信義區'},{ value: '中山區'},{ value: '安樂區'},{ value: '暖暖區'},{ value: '七堵區'}]
    const hsinchuCityAreaOptions = [{ value: '區域不限' },{ value: '東區'},{ value: '北區'},{ value: '香山區'}]
    const chiayiCityAreaOptions = [{ value: '區域不限' },{ value: '東區'},{ value: '西區'}]
    const hsinchuAreaOptions = [{ value: '區域不限' },{ value: '竹北市'},{ value: '竹東鎮'},{ value: '新埔鎮'},{ value: '關西鎮'},{ value: '湖口鄉'},{ value: '新豐鄉'},{ value: '峨眉鄉'},{ value: '寶山鄉'},{ value: '北埔鄉'},{ value: '芎林鄉'},{ value: '橫山鄉'},{ value: '尖石鄉'},{ value: '五峰鄉'}]
    const miaoliAreaOptions = [{ value: '區域不限' },{ value: '苗栗市'},{ value: '頭份市'},{ value: '竹南鎮'},{ value: '後龍鎮'},{ value: '通霄鎮'},{ value: '苑裡鎮'},{ value: '卓蘭鎮'},{ value: '造橋鄉'},{ value: '西湖鄉'},{ value: '頭屋鄉'},{ value: '公館鄉'},{ value: '銅鑼鄉'},{ value: '三義鄉'},{ value: '大湖鄉'},{ value: '獅潭鄉'},{ value: '三灣鄉'},{ value: '南庄鄉'},{ value: '泰安鄉'}]
    const changhuaAreaOptions = [{ value: '區域不限' },{ value: '彰化市'},{ value: '員林市'},{ value: '和美鎮'},{ value: '鹿港鎮'},{ value: '溪湖鎮'},{ value: '二林鎮'},{ value: '田中鎮'},{ value: '北斗鎮'},{ value: '花壇鄉'},{ value: '芬園鄉'},{ value: '大村鄉'},{ value: '永靖鄉'},{ value: '伸港鄉'},{ value: '線西鄉'},{ value: '福興鄉'},{ value: '秀水鄉'},{ value: '埔心鄉'},{ value: '埔鹽鄉'},{ value: '大城鄉'},{ value: '芳苑鄉'},{ value: '竹塘鄉'},{ value: '社頭鄉'},{ value: '二水鄉'},{ value: '田尾鄉'},{ value: '埤頭鄉'},{ value: '溪州鄉'}]
    const nantouAreaOptions = [{ value: '區域不限' },{ value: '南投市'},{ value: '埔里鎮'},{ value: '草屯鎮'},{ value: '竹山鎮'},{ value: '集集鎮'},{ value: '名間鄉'},{ value: '鹿谷鄉'},{ value: '中寮鄉'},{ value: '魚池鄉'},{ value: '國姓鄉'},{ value: '水里鄉'},{ value: '信義鄉'},{ value: '仁愛鄉'}]
    const yunlinAreaOptions = [{ value: '區域不限' },{ value: '斗六市'},{ value: '斗南鎮'},{ value: '虎尾鎮'},{ value: '西螺鎮'},{ value: '土庫鎮'},{ value: '北港鎮'},{ value: '林內鄉'},{ value: '古坑鄉'},{ value: '大埤鄉'},{ value: '莿桐鄉'},{ value: '褒忠鄉'},{ value: '二崙鄉'},{ value: '崙背鄉'},{ value: '麥寮鄉'},{ value: '臺西鄉'},{ value: '東勢鄉'},{ value: '元長鄉'},{ value: '四湖鄉'},{ value: '口湖鄉'},{ value: '水林鄉'}]
    const chiayiAreaOptions = [{ value: '區域不限' },{ value: '太保市'},{ value: '朴子市'},{ value: '布袋鎮'},{ value: '大林鎮'},{ value: '民雄鄉'},{ value: '溪口鄉'},{ value: '新港鄉'},{ value: '六腳鄉'},{ value: '東石鄉'},{ value: '義竹鄉'},{ value: '鹿草鄉'},{ value: '水上鄉'},{ value: '中埔鄉'},{ value: '竹崎鄉'},{ value: '梅山鄉'},{ value: '番路鄉'},{ value: '大埔鄉'},{ value: '阿里山鄉'}]
    const pingtungAreaOptions = [{ value: '區域不限' },{ value: '屏東市'},{ value: '潮州鎮'},{ value: '東港鎮'},{ value: '恆春鎮'},{ value: '萬丹鄉'},{ value: '長治鄉'},{ value: '麟洛鄉'},{ value: '九如鄉'},{ value: '里港鄉'},{ value: '鹽埔鄉'},{ value: '高樹鄉'},{ value: '萬巒鄉'},{ value: '內埔鄉'},{ value: '竹田鄉'},{ value: '新埤鄉'},{ value: '枋寮鄉'},{ value: '新園鄉'},{ value: '崁頂鄉'},{ value: '林邊鄉'},{ value: '南州鄉'},{ value: '佳冬鄉'},{ value: '琉球鄉'},{ value: '車城鄉'},{ value: '滿州鄉'},{ value: '枋山鄉'},{ value: '霧臺鄉'},{ value: '瑪家鄉'},{ value: '泰武鄉'},{ value: '來義鄉'},{ value: '春日鄉'},{ value: '獅子鄉'},{ value: '牡丹鄉'},{ value: '三地門鄉'}]
    const yilanAreaOptions = [{ value: '區域不限' },{ value: '宜蘭市'},{ value: '頭城鎮'},{ value: '羅東鎮'},{ value: '蘇澳鎮'},{ value: '礁溪鄉'},{ value: '壯圍鄉'},{ value: '員山鄉'},{ value: '冬山鄉'},{ value: '五結鄉'},{ value: '三星鄉'},{ value: '大同鄉'},{ value: '南澳鄉'}]
    const hualienAreaOptions = [{ value: '區域不限' },{ value: '花蓮市'},{ value: '鳳林鎮'},{ value: '玉里鎮'},{ value: '新城鄉'},{ value: '吉安鄉'},{ value: '壽豐鄉'},{ value: '光復鄉'},{ value: '豐濱鄉'},{ value: '瑞穗鄉'},{ value: '富里鄉'},{ value: '秀林鄉'},{ value: '萬榮鄉'},{ value: '卓溪鄉'}]
    const taitungAreaOptions = [{ value: '區域不限' },{ value: '臺東市'},{ value: '成功鎮'},{ value: '關山鎮'},{ value: '長濱鄉'},{ value: '池上鄉'},{ value: '東河鄉'},{ value: '鹿野鄉'},{ value: '卑南鄉'},{ value: '大武鄉'},{ value: '綠島鄉'},{ value: '太麻里鄉'},{ value: '海端鄉'},{ value: '延平鄉'},{ value: '金峰鄉'},{ value: '達仁鄉'},{ value: '蘭嶼鄉'}]
    const penghuAreaOptions = [{ value: '區域不限' },{ value: '馬公市'},{ value: '湖西鄉'},{ value: '白沙鄉'},{ value: '西嶼鄉'},{ value: '望安鄉'},{ value: '七美鄉'}]
    const kinmenAreaOptions = [{ value: '區域不限' },{ value: '金城鎮'},{ value: '金湖鎮'},{ value: '金沙鎮'},{ value: '金寧鄉'},{ value: '烈嶼鄉'},{ value: '烏坵鄉'}]
    const lianjiangAreaOptions = [{ value: '區域不限' },{ value: '南竿鄉'},{ value: '北竿鄉'},{ value: '莒光鄉'},{ value: '東引鄉'}]
    const typeOfRentalOptions = [{ value: '類型不限' },{ value: '整層住家' }, { value: '獨立套房' }, { value: '分租套房' }, { value: '雅房' }];
    const priceOptions = [{ value: '租金不限' },{ value: '0 - 5000 元' }, { value: '5000 - 10000 元' }, { value: '10000 - 20000 元' }, { value: '20000 - 30000 元' }, { value: '30000 - 40000 元' }, { value: '40000 以上元' }, { value: '自訂租金範圍' }];
    const roomOptions = [{ value: '格局不限' },{ value: '1 房' }, { value: '2 房' }, { value: '3 房' }, { value: '4 房以上' }];
    const buildingTypeOptions = [{ value: '型態不限' },{ value: '公寓' }, { value: '電梯大樓' }, { value: '透天' }, { value: '店面' }, { value: '辦公室' }];
    const pingOptions = [{ value: '坪數不限' },{ value: '10 坪以下' }, { value: '10 - 20 坪' }, { value: '20 - 30 坪' }, { value: '30 - 40 坪' }, { value: '40 - 50 坪' }, { value: '自訂坪數範圍' }];
    const floorOptions = [{ value: '樓層不限' },{ value: '1 層' }, { value: '2 - 6 層' }, { value: '6 - 12 層' }, { value: '12 層以上' }, { value: '自訂樓層範圍' }];
    const featureOptions = [{ value: '可養寵物' }, { value: '可吸菸' }, { value: '可開伙' }, { value: '有管理員' }, { value: '有車位' }, { value: '倒垃圾服務' }];
    const sortOptions = [{ value: '時間近到遠' },{ value: '時間遠到近' }, { value: '租金便宜到貴' }, { value: '租金貴到便宜' }, { value: '坪數小到大' }, { value: '坪數大到小' }];
    const [houses, setHouses] = useState([]);
    const [isCustomPrice, setIsCustomPrice] = useState(false);
    const [isCustomPing, setIsCustomPing] = useState(false);
    const [isCustomFloor, setIsCustomFloor] = useState(false);
    const [areaOptions, setAreaOptions] = useState([]);
    const [init, setInit] = useState(true);
    const [selectArea, setSelectArea] = useState(null);
    const [isShowEdit, setIsShowEdit] = useState('none');
    const [housesListDetail, setHousesListDetail] = useState([]);
    const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false);
    const [removeHouseId, setRemoveHouseId] = useState('');
    const [enableDealForm, setEnableDealForm] = useState(false);
    const [size] = useState("large");
    const [isPostDeal, setIsPostDeal] = useState(false)
    const [isCancelDeal, setIsCancelDeal] = useState(false)
    const [isPutTransfer, setIsPutTransfer] = useState(false)
    const [transferModalEnable, setTransferModalEnable] = useState(false)
    const [enableShowEmployeeInfo, setEnableShowEmployeeInfo] = useState(false)
    const [employeeName, setEmployeeName] = useState([])
    const [houseData, setHouseData] = useState([])
    const [houseKey, setHouseKey] = useState()
    const [dealData] = useState({
        houseId: '',
        actualPrice : '',
        serviceCharge : '',
        startRentDate : '',
        endRentDate : '',
        dealSales : '',
        userId: ''
    })
    const [transferOwnerId, setTransferOwnerId] = useState([])
    // console.log(props)
    // console.log(houseData[houseKey], houseKey, props.companyEmployees, props.enableTransfer, props.owner, props.roles, props.dealOptions, props.dealUserId, props)
    // //concole.log(houseKey?Object.assign(houseData[houseKey], {'owner': props.companyEmployees[houseKey].userId}):[])
    useEffect(() => {
        if (init) {
            setInit(false)
            // if(props.rank === -1) {
            //     toast.warning(`需加入公司後才能使用`)
            //     backToInitPage()
            // }
            getHousesList()
        }
    }, )

    const backToInitPage = () => {
        setTimeout(() => {
            window.location.replace(config.mainPage)
        }, 2000)
    }
    // //concole.log(props.companyManager)
    //transaction function
    useEffect(() => {
        const xToken = cookie.load('x-token')
        //concole.log(xToken)
        let tempData = dealData
        delete tempData['dealSales']
        if (isPostDeal) {
            CompanyAxios.post(Transaction_Auth, tempData, {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    'x-token':xToken
                }
            }).then((response) => {
                //concole.log(response)
                if(response.data.status) {
                    setIsPostDeal(false)
                    form_deal.resetFields()
                    setEnableDealForm(false)
                    getHousesList()
                }
            }).catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(`${error}`)
            })
        }
    }, [isPostDeal])
    // //concole.log(props)
    //cancel transaction function
    useEffect(() => {
        const xToken = cookie.load('x-token')
        //concole.log(xToken)
        if (isCancelDeal) {
            // //concole.log(Object.assign(houseData[houseKey].transactionData[0],
            //     {
            //         'id': houseData[houseKey].transactionData[0]._id,
            //         'state': 0,
            //         'transactionDate' : new Date(Date.parse(houseData[houseKey].transactionData[0].transactionDate)).toLocaleDateString(),
            //         'startRentDate': new Date(Date.parse(houseData[houseKey].transactionData[0].startRentDate)).toLocaleDateString(),
            //         'endRentDate': new Date(Date.parse(houseData[houseKey].transactionData[0].endRentDate)).toLocaleDateString(),
            //     }))
            // //concole.log(new Date(Date.parse(houseData[houseKey].transactionData[0].startRentDate)).toLocaleDateString(), new Date(Date.parse(houseData[houseKey].transactionData[0].transactionDate)).toLocaleDateString(),new Date(Date.parse(houseData[houseKey].transactionData[0].endRentDate)).toLocaleDateString())
            CompanyAxios.put(cancelTransaction_Auth,
                    {
                        'id': houseData[houseKey].transactionData[0]._id,
                        'houseId' : houseData[houseKey].transactionData[0].houseId,
                        'userId' : houseData[houseKey].transactionData[0].userId,
                        'actualPrice': houseData[houseKey].transactionData[0].actualPrice,
                        'serviceCharge': houseData[houseKey].transactionData[0].serviceCharge,
                        'transactionDate' : new Date(Date.parse(houseData[houseKey].transactionData[0].transactionDate)).toLocaleDateString(),
                        'startRentDate': new Date(Date.parse(houseData[houseKey].transactionData[0].startRentDate)).toLocaleDateString(),
                        'endRentDate': new Date(Date.parse(houseData[houseKey].transactionData[0].endRentDate)).toLocaleDateString(),
                        'companyId': houseData[houseKey].transactionData[0].companyId,
                        'edit': {

                        },
                        'state': 0,
                    }
                    , {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    'x-token':xToken
                }
            }).then((response) => {
                //concole.log(response)
                if(response.data.status) {
                    setIsPostDeal(false)
                    form_deal.resetFields()
                    setEnableDealForm(false)
                    setIsCancelDeal(false)
                    getHousesList()
                }
            }).catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(`${error}`)
            })
        }
    }, [isCancelDeal])

    //transfer function
    useEffect(() => {
        const xToken = cookie.load('x-token')
        //concole.log(xToken)
        if (isPutTransfer) {
            HouseAxios.put(transferHouse_Auth, Object.assign(houseData[houseKey], {'id': houseData[houseKey]._id ,'owner': transferOwnerId, 'annex':houseData[houseKey].annex ? houseData[houseKey].annex :[]}), {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    'x-token':xToken
                }
            }).then((response) => {
                //concole.log(response)
                if(response.data.status===true) {
                    setIsPutTransfer(false)
                    form_transfer.resetFields()
                    setEnableShowEmployeeInfo(false)
                    setTransferModalEnable(false)
                    getHousesList()
                    toast.success(`物件轉移成功`)
                }
            }).catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(`${error}`)
            })
        }
    }, [isPutTransfer])

    const [getHousesArg] = useState({
        start : '0',
        count : '99999999',
        timeSort : '-1',
        priceSort : '',
        pingSort : '',
        isDelete : 'false',
        minPrice : '0',
        maxPrice : '99999999',
        minPing : '0',
        maxPing : '99999999',
        minRoom : '0',
        maxRoom : '99999999',
        minFloor : '-10',
        maxFloor : '99999999',
        city : '',
        area : '',
        parking : '',
        pet : '',
        manager : '',
        garbage : '',
        smoke : '',
        cook : '',
        typeOfRental : '',
        buildingType : '',
    });

    const getHousesList = () => {
        if(isCustomPrice){
            const minCustomPrice = document.getElementById('minCustomPrice');
            const maxCustomPrice= document.getElementById('maxCustomPrice');
            getHousesArg.minPrice = minCustomPrice.value
            getHousesArg.maxPrice = maxCustomPrice.value
            if(isNaN(getHousesArg.minPrice) || isNaN(getHousesArg.maxPrice)){
                getHousesArg.minPrice = 0;
                getHousesArg.maxPrice = 0;
            }
        }

        if(isCustomPing){
            const minCustomPing = document.getElementById('minCustomPing');
            const maxCustomPing= document.getElementById('maxCustomPing');
            getHousesArg.minPing = minCustomPing.value
            getHousesArg.maxPing = maxCustomPing.value
            if(isNaN(getHousesArg.minPing) || isNaN(getHousesArg.maxPing)){
                getHousesArg.minPing = 0;
                getHousesArg.maxPing = 0;
            }
        }

        if(isCustomFloor){
            const minCustomFloor = document.getElementById('minCustomFloor');
            const maxCustomFloor= document.getElementById('maxCustomFloor');
            getHousesArg.minFloor = minCustomFloor.value
            getHousesArg.maxFloor = maxCustomFloor.value
            if(isNaN(getHousesArg.minFloor) || isNaN(getHousesArg.maxFloor)){
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 0;
            }
        }


        let reqUrl = `${housesListUrl}?start=${getHousesArg.start}&&count=${getHousesArg.count}&&isDelete=${getHousesArg.isDelete}&&minPrice=${getHousesArg.minPrice}&&maxPrice=${getHousesArg.maxPrice}&&minPing=${getHousesArg.minPing}&&maxPing=${getHousesArg.maxPing}&&minRoom=${getHousesArg.minRoom}&&maxRoom=${getHousesArg.maxRoom}&&minFloor=${getHousesArg.minFloor}&&maxFloor=${getHousesArg.maxFloor}`
        const textQuery= document.getElementById('textQuery');

        if(textQuery){
            const value = textQuery.value
            if(value !== '' && value !== undefined && value !== null){
                reqUrl = `${reqUrl}&&textQuery=${value}`
            }
        }

        if(getHousesArg.city !=='' && getHousesArg.city !==undefined){
            reqUrl = `${reqUrl}&&city=${getHousesArg.city}`
        }
        if(getHousesArg.area !=='' && getHousesArg.area !==undefined){
            reqUrl = `${reqUrl}&&area=${getHousesArg.area}`
        }
        if(getHousesArg.parking !=='' && getHousesArg.parking !==undefined){
            reqUrl = `${reqUrl}&&parking=${getHousesArg.parking}`
        }
        if(getHousesArg.pet !=='' && getHousesArg.pet !==undefined){
            reqUrl = `${reqUrl}&&pet=${getHousesArg.pet}`
        }
        if(getHousesArg.manager !=='' && getHousesArg.manager !==undefined){
            reqUrl = `${reqUrl}&&manager=${getHousesArg.manager}`
        }
        if(getHousesArg.garbage !=='' && getHousesArg.garbage !==undefined){
            reqUrl = `${reqUrl}&&garbage=${getHousesArg.garbage}`
        }
        if(getHousesArg.smoke !=='' && getHousesArg.smoke !==undefined){
            reqUrl = `${reqUrl}&&smoke=${getHousesArg.smoke}`
        }
        if(getHousesArg.cook !=='' && getHousesArg.cook !==undefined){
            reqUrl = `${reqUrl}&&cook=${getHousesArg.cook}`
        }
        if(getHousesArg.typeOfRental !=='' && getHousesArg.typeOfRental !==undefined){
            reqUrl = `${reqUrl}&&typeOfRental=${getHousesArg.typeOfRental}`
        }
        if(getHousesArg.buildingType !=='' && getHousesArg.buildingType !==undefined){
            reqUrl = `${reqUrl}&&buildingType=${getHousesArg.buildingType}`
        }
        if(getHousesArg.timeSort !=='' && getHousesArg.timeSort !==undefined){
            reqUrl = `${reqUrl}&&timeSort=${getHousesArg.timeSort}`
        }
        if(getHousesArg.pingSort !=='' && getHousesArg.pingSort !==undefined){
            reqUrl = `${reqUrl}&&pingSort=${getHousesArg.pingSort}`
        }
        if(getHousesArg.priceSort !=='' && getHousesArg.priceSort !==undefined){
            reqUrl = `${reqUrl}&&priceSort=${getHousesArg.priceSort}`
        }

        if(props.isCompanyList === true){
            reqUrl = `${reqUrl}&&belongType=2&&belongId=${props.companyId}`
        }

        if(props.owner!==''&&props.owner!==undefined&&props.owner!==null){
            let sendOwner = true
            for(let i = 0 ;i<props.roles.length;i++){
                if(props.roles[i]== 1){
                    sendOwner = false
                    i = props.roles.length
                }
            }
            //concole.log(sendOwner)
            if(sendOwner && props.companyManager!==0){
                reqUrl = `${reqUrl}&&owner=${props.owner}`
            }
        }
        HouseAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            }
        )
            .then( (response) => {
                // dealData.id = response.data.data[0].owner
                resolveHousesList(response)
                setHouseData(response.data.data)
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)})
    }

    function resolveHousesList(response){
        //concole.log(response)
        data = []
        if(response.data && response.data.data){

            const items = response.data.data
            setHousesListDetail([])
            setHousesListDetail(items)
            for(let i = 0 ;i<items.length; i++){

                const item = {
                    key: i,
                    price: items[i].price,
                    address: `地址 : ${items[i].address}`,
                    content: [items[i].name,`租金 : ${items[i].price}`, `地址 : ${items[i].address}`, `坪數 : ${items[i].ping}`],
                }
                if(items[i].floor === -3){
                    item.content.push(`樓層 : 地下三樓`)
                }else if(items[i].floor === -2){
                    item.content.push(`樓層 : 地下二樓`)
                }else if(items[i].floor === -1){
                    item.content.push(`樓層 : 地下一樓`)
                }else {
                    // item.content.push(`樓層 : ${items[i].floor}`)
                    item.content.push(`${items[i].floor}`)

                }
                if(items[i].photo && items[i].photo.length > 0){
                    item.image = `${houseService}/resource/${items[i]._id}/photo/${items[i].photo[0]}`
                }else{
                    item.image = houseDefaultImage
                }
                if(items[i].config){
                    switch(items[i].config.buildingType){
                        case 1 :
                            item.content.push('公寓')
                            // item.content.push('型態 : 公寓')
                            break;
                        case 2 :
                            item.content.push('電梯大樓')
                            // item.content.push('型態 : 電梯大樓')
                            break;
                        case 3 :
                            item.content.push('透天')
                            // item.content.push('型態 : 透天')
                            break;
                        case 4 :
                            item.content.push('辦公室')
                            // item.content.push('型態 : 透天')
                            break;
                        case 5 :
                            item.content.push('店面')
                            // item.content.push('型態 : 透天')
                            break;
                        default:
                            item.content.push('未知')
                            // item.content.push('型態 : 未知')
                    }
                }
                if(items[i].saleInfo){
                    switch(items[i].saleInfo.typeOfRental){
                        case 1 :
                            item.content.push('整層住家')
                            // item.content.push('類型 : 整層住家')
                            break;
                        case 2 :
                            item.content.push('獨立套房')
                            // item.content.push('類型 : 獨立套房')
                            break;
                        case 3 :
                            item.content.push('分租套房')
                            // item.content.push('類型 : 分租套房')
                            break;
                        case 4 :
                            item.content.push('雅房')
                            // item.content.push('類型 : 雅房')
                            break;
                        default:
                            item.content.push('未知')
                            // item.content.push('類型 : 未知')

                    }
                }
                if(items[i].traffic && items[i].traffic.length >0 ){
                    // item.content.push(`交通 : 距${items[i].traffic[0].name} ${items[i].traffic[0].distance} 公尺`)
                    item.content.push(`交通 : 近 ${items[i].traffic[0].name}`)
                }else{
                    item.content.push(`交通 : 無設施`);
                }

                if(items[i].life && items[i].life.length >0){
                    // item.content.push(`生活 : 距${items[i].life[0].name} ${items[i].life[0].distance} 公尺`)
                    item.content.push(`生活 : 近 ${items[i].life[0].name}`)
                }else{
                    item.content.push(`生活 : 無設施`);
                }

                if(items[i].educate && items[i].educate.length >0){
                    // item.content.push(`教育 : 距${items[i].educate[0].name} ${items[i].educate[0].distance} 公尺`)
                    item.content.push(`教育 : 近 ${items[i].educate[0].name}`)
                }else{
                    item.content.push(`教育 : 無設施`);
                }
                let date = ''+new Date(items[i].updateTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})
                date= date.substring(0,date.indexOf(' '))
                item.content.push(`更新時間 : ${date}`)

                if(props.owner!==''&&props.owner!==undefined&&props.owner!==null){
                    item.content.push(items[i]._id)
                    setIsShowEdit('flex')
                }

                item.content.push(items[i].belongId)
                item.content.push(items[i].belongType)

                if(items[i].transactionData.length>0 && items[i].transactionData[0].state === 1) {
                    item.content.push(true)
                }else {
                    item.content.push(false)
                }

                //concole.log(item.content[14])
                data.push(item)
            }
            setHouses(data)
        }
    }


    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function changeSort(sort) {
        getHousesArg.timeSort = ''
        getHousesArg.pingSort = ''
        getHousesArg.priceSort = ''

        switch(sort){
            case sortOptions[0].value:
                getHousesArg.timeSort = '-1'
                break;
            case sortOptions[1].value:
                getHousesArg.timeSort = '1'
                break;
            case sortOptions[2].value:
                getHousesArg.priceSort = '1';
                break;
            case sortOptions[3].value:
                getHousesArg.priceSort = '-1';
                break;
            case sortOptions[4].value:
                getHousesArg.pingSort = '1';
                break;
            case sortOptions[5].value:
                getHousesArg.pingSort = '-1';
                break;
            default:
                getHousesArg.timeSort = '-1'
        }
    }

    function changeCity(city) {
        setSelectArea(null)
        setAreaOptions([])
        if(cityOptions[0].value !== city){
            getHousesArg.city = city
            getHousesArg.area = ''
            switch(city){
                case cityOptions[1].value:
                    setAreaOptions(taipeiAreaOptions)
                    break;
                case cityOptions[2].value:
                    setAreaOptions(newTaipeiAreaOptions)
                    break;
                case cityOptions[3].value:
                    setAreaOptions(taoyuanAreaOptions)
                    break;
                case cityOptions[4].value:
                    setAreaOptions(taichungAreaOptions)
                    break;
                case cityOptions[5].value:
                    setAreaOptions(tainanAreaOptions)
                    break;
                case cityOptions[6].value:
                    setAreaOptions(kaohsiungAreaOptions)
                    break;
                case cityOptions[7].value:
                    setAreaOptions(keelungAreaOptions)
                    break;
                case cityOptions[8].value:
                    setAreaOptions(hsinchuCityAreaOptions)
                    break;
                case cityOptions[9].value:
                    setAreaOptions(chiayiCityAreaOptions)
                    break;
                case cityOptions[10].value:
                    setAreaOptions(hsinchuAreaOptions)
                    break;
                case cityOptions[11].value:
                    setAreaOptions(miaoliAreaOptions)
                    break;
                case cityOptions[12].value:
                    setAreaOptions(changhuaAreaOptions)
                    break;
                case cityOptions[13].value:
                    setAreaOptions(nantouAreaOptions)
                    break;
                case cityOptions[14].value:
                    setAreaOptions(yunlinAreaOptions)
                    break;
                case cityOptions[15].value:
                    setAreaOptions(chiayiAreaOptions)
                    break;
                case cityOptions[16].value:
                    setAreaOptions(pingtungAreaOptions)
                    break;
                case cityOptions[17].value:
                    setAreaOptions(yilanAreaOptions)
                    break;
                case cityOptions[18].value:
                    setAreaOptions(hualienAreaOptions)
                    break;
                case cityOptions[19].value:
                    setAreaOptions(taitungAreaOptions)
                    break;
                case cityOptions[20].value:
                    setAreaOptions(penghuAreaOptions)
                    break;
                case cityOptions[21].value:
                    setAreaOptions(kinmenAreaOptions)
                    break;
                case cityOptions[22].value:
                    setAreaOptions(lianjiangAreaOptions)
                    break;
                default:
            }
        }else{
            getHousesArg.city = ''
        }
    }

    function changeArea(area) {
        setSelectArea(area)
        if(area === '區域不限'){
            getHousesArg.area = ''
        }else{
            getHousesArg.area = area
        }
    }

    function changeTypeOfRental(typeOfRental) {
        switch(typeOfRental){
            case typeOfRentalOptions[1].value:
                getHousesArg.typeOfRental = 1;
                break;
            case typeOfRentalOptions[2].value:
                getHousesArg.typeOfRental = 2;
                break;
            case typeOfRentalOptions[3].value:
                getHousesArg.typeOfRental = 3;
                break;
            case typeOfRentalOptions[4].value:
                getHousesArg.typeOfRental = 4;
                break;
            default:
                getHousesArg.typeOfRental = ''
        }
    }

    function changePrice(price) {
        const customPrice = document.getElementById('customPrice');
        customPrice.style.display = 'none'
        setIsCustomPrice(false)
        switch(price){
            case priceOptions[1].value:
                getHousesArg.minPrice = 0;
                getHousesArg.maxPrice = 5000;
                break;
            case priceOptions[2].value:
                getHousesArg.minPrice = 5000;
                getHousesArg.maxPrice = 10000;
                break;
            case priceOptions[3].value:
                getHousesArg.minPrice = 10000;
                getHousesArg.maxPrice = 20000;
                break;
            case priceOptions[4].value:
                getHousesArg.minPrice = 20000;
                getHousesArg.maxPrice = 30000;
                break;
            case priceOptions[5].value:
                getHousesArg.minPrice = 30000;
                getHousesArg.maxPrice = 40000;
                break;
            case priceOptions[6].value:
                getHousesArg.minPrice = 40000;
                getHousesArg.maxPrice = 99999999;
                break;
            case priceOptions[7].value:
                customPrice.style.display = 'flex'
                setIsCustomPrice(true)
                getHousesArg.minPrice = 0
                getHousesArg.maxPrice = 0
                break;
            default:
                getHousesArg.minPrice = 0
                getHousesArg.maxPrice = 99999999
        }

    }

    function changeRoom(room) {
        switch(room){
            case roomOptions[1].value:
                getHousesArg.minRoom = 1;
                getHousesArg.maxRoom = 1;
                break;
            case roomOptions[2].value:
                getHousesArg.minRoom = 2;
                getHousesArg.maxRoom = 2;
                break;
            case roomOptions[3].value:
                getHousesArg.minRoom = 3;
                getHousesArg.maxRoom = 3;
                break;
            case roomOptions[4].value:
                getHousesArg.minRoom = 4;
                getHousesArg.maxRoom = 99999999;
                break;
            default:
                getHousesArg.minRoom = '0'
                getHousesArg.maxRoom = '99999999'
        }
    }

    function changeBuildingType(buildingType) {
        switch(buildingType){
            case buildingTypeOptions[1].value:
                getHousesArg.buildingType = 1
                break;
            case buildingTypeOptions[2].value:
                getHousesArg.buildingType = 2;
                break;
            case buildingTypeOptions[3].value:
                getHousesArg.buildingType = 3;
                break;
            default:
                getHousesArg.buildingType = ''
        }
    }

    function changePing(ping) {
        const customPing = document.getElementById('customPing');
        customPing.style.display = 'none'
        setIsCustomPing(false)
        switch(ping){
            case pingOptions[1].value:
                getHousesArg.minPing = 0
                getHousesArg.maxPing = 10
                break;
            case pingOptions[2].value:
                getHousesArg.minPing = 10
                getHousesArg.maxPing = 20
                break;
            case pingOptions[3].value:
                getHousesArg.minPing = 20
                getHousesArg.maxPing = 30
                break;
            case pingOptions[4].value:
                getHousesArg.minPing = 30
                getHousesArg.maxPing = 40
                break;
            case pingOptions[5].value:
                getHousesArg.minPing = 40
                getHousesArg.maxPing = 50
                break;
            case pingOptions[6].value:
                // custom
                customPing.style.display = 'flex'
                setIsCustomPing(true)
                getHousesArg.minPing = 0
                getHousesArg.maxPing = 0
                break;
            default:
                getHousesArg.minPing = '0'
                getHousesArg.maxPing = '99999999'
        }
    }

    function changeFloor(floor) {
        const customFloor = document.getElementById('customFloor');
        customFloor.style.display = 'none'
        setIsCustomFloor(false)
        switch(floor){
            case floorOptions[1].value:
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 1;
                break;
            case floorOptions[2].value:
                getHousesArg.minFloor = 2;
                getHousesArg.maxFloor = 6;
                break;
            case floorOptions[3].value:
                getHousesArg.minFloor = 6;
                getHousesArg.maxFloor = 12;
                break;
            case floorOptions[4].value:
                getHousesArg.minFloor = 12;
                getHousesArg.maxFloor = 99999999;
                break;
            case floorOptions[5].value:
                // custom
                customFloor.style.display = 'flex'
                setIsCustomFloor(true)
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 0;
                break;
            default:
                getHousesArg.minFloor = 0;
                getHousesArg.maxFloor = 99999999;
        }
    }

    function changeFeature(feature) {
        if(feature.indexOf(featureOptions[0].value)>=0){
            getHousesArg.pet = 'true'
        }else{
            getHousesArg.pet = ''
        }

        if(feature.indexOf(featureOptions[1].value)>=0){
            getHousesArg.smoke = 'true'
        }else{
            getHousesArg.smoke = ''
        }

        if(feature.indexOf(featureOptions[2].value)>=0){
            getHousesArg.cook = 'true'
        }else{
            getHousesArg.cook = ''
        }

        if(feature.indexOf(featureOptions[3].value)>=0){
            getHousesArg.manager = 'true'
        }else{
            getHousesArg.manager = ''
        }

        if(feature.indexOf(featureOptions[4].value)>=0){
            getHousesArg.parking = 'true'
        }else{
            getHousesArg.parking = ''
        }

        if(feature.indexOf(featureOptions[5].value)>=0){
            getHousesArg.garbage = 'true'
        }else{
            getHousesArg.garbage = ''
        }
    }



    const columns = [
        {
            title: '房屋照片',
            dataIndex: 'image',
            key: 'image',
            //   width:'250px',
            width:'40%',
            render: (image) => (
                <div style={{
                    height:'250px',
                    'line-height': '250px',
                    overflow:'hidden',
                }}>
                    <Image
                        src = {image}
                        preview = {false}
                        fallback ="data:image/png;base64,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"
                    />
                </div>
            )
        },
        {
            title: '房屋資訊',
            key: 'content',
            dataIndex: 'content',
            render: (content) => (
                <div style={{
                    //   'textAlign': 'center',
                }}>
                    <Row>
                        <Col xs={0} sm={2} md={2} lg={2} xl={4}></Col>
                        <Col xs={24} sm={22} md={22} lg={22} xl={20}>
                            <div style={{
                                //   'display': 'inline-block',
                                //   'textAlign': 'left',
                            }}>
                                <div style={{
                                    'color': '#0000ff',
                                    'fontSize':'20px'
                                }}>{content[0]}</div>

                                <div style={{
                                    'color':'#FF0000',
                                    'fontSize':'20px'
                                }}>{content[1]}元 / 月</div>

                                {content[2]}
                                <br/>
                                {content[3]+' 坪'}
                                <br/>
                                {content[5]}&nbsp;&nbsp;-&nbsp;&nbsp;{content[4] +' 樓'}&nbsp;&nbsp;-&nbsp;&nbsp;{content[6]}
                                <br/>
                                {'鄰近'+content[7]}
                                <br/>
                                {/*{content[8]}*/}
                                {/*<br/>*/}
                                {/*{content[9]}*/}
                                {/*<br/>*/}
                                {content[10]}
                                <br/>
                                {props.enableTransfer ?
                                    <div style={{display: "flex"}}>
                                        <Button onClick={() => onTransfer()} style={{width: '70px', backgroundColor:'green', color:'white' }}>
                                            轉移
                                        </Button>
                                        &nbsp;
                                        <Button type="primary" disabled={isShowDeleteAlert} onClick={() => removeHouse(content[11])} danger style={{width: '70px'}}>
                                            刪除
                                        </Button>
                                    </div>
                                    :
                                <div style={{display: isShowEdit}}>
                                    {!content[14]?
                                        <span>
                                            <Button type="primary" onClick={() => queryHouse(content[11])} style={{width: '60px' }}>
                                        查看
                                        </Button>

                                            &nbsp;
                                            <Button type="primary" disabled={isShowDeleteAlert} onClick={() => removeHouse(content[11])} danger style={{width: '60px'}}>
                                            刪除
                                        </Button>
                                            &nbsp;
                                        </span>:[]}

                                    {content[13] === 2 ?
                                        <Button type="primary"
                                                disabled={content[14]}
                                                onClick={() => {
                                                     dealData.houseId = content[11]
                                                     dealData.companyId = content[12]
                                                     setEnableDealForm(true)
                                                }}
                                                style={{width: '60px', backgroundColor: !content[14]?'#FFA500':'', borderColor: !content[14]?'#FFA500':''}}>
                                            {!content[14]?'成交':'申請中'}
                                        </Button>
                                        :
                                        []
                                    }
                                    {!content[14]? []:
                                        <span>
                                        &nbsp;
                                            <Button type="primary"
                                                    onClick={() => {
                                                        setIsCancelDeal(true)
                                                    }}
                                                    style={{width: '90px', backgroundColor: '#FF0000', borderColor: '#FF0000'}}>
                                            取消申請
                                        </Button>
                                        </span>
                                    }
                                </div>}
                            </div>
                        </Col>
                    </Row>
                </div>
            ),
        },
    ];

    const getPersonalInfo = (xToken) => {
        return new Promise((resolve, reject) => {
            const userListUrl = 'user/getPersonalInfo'
            let reqUrl = `${userListUrl}`
            UserAxios.get(
                reqUrl,{
                    headers:{
                        'x-token':xToken
                    }
                }
            )
            .then( (response) => {
                if(response.data.data !== undefined){
                    if(response.data.data.bornDate === undefined || response.data.data.bornDate === null ){
                        response.data.data.bornDate = ''
                    }
                    resolve(response)
                }else{
                    reject(response)
                }
            })
            .catch( (error) => {
                reject(error)
            })
        })
    }

    function queryHouse(houseId){
        //concole.log(houseId)
        const xToken = cookie.load('x-token')
        getPersonalInfo(xToken).then( (response) => {
            if(response.data.data !== undefined){
                const user = response.data.data
                openInNewTab(`/HouseDetailOwner/${houseId}/${user._id}`)
            }
        })
        .catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }

    function cancelRemoveHouse(){
        setIsShowDeleteAlert(false)
    }

    function removeHouse(houseId){
        setIsShowDeleteAlert(true)
        setRemoveHouseId(houseId)
    }

    function removeHouseAction(){
        const houseId = removeHouseId
        const reqUrl = `${removeHouseUrl}`
        HouseAxios.delete(
            reqUrl,{
                headers:{
                    'x-token':xToken
                },
                data: {
                    ids: [houseId]
                }
            }
        )
            .then( (response) => {
                if(response.data.status === true){
                    getHousesList()
                    toast.success('刪除成功');
                }else{
                    toast.error(response.data.data)
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
        cancelRemoveHouse()
    }

    const handleDealData = (value) => {
        // //concole.log(value)
        dealData.actualPrice =  parseInt(value.dealPrice)
        dealData.serviceCharge = parseInt(value.servePrice)
        dealData.startRentDate = value.rentDate[0].format("YYYY/MM/DD")
        dealData.endRentDate = value.rentDate[1].format("YYYY/MM/DD")
        dealData.dealSales = value.dealSales
        if (props.rank === 0) {
            const index = props.dealOptions.findIndex(n =>{return n.value === value.dealSales})
            dealData.userId = props.dealUserId[index].userId
            //concole.log(index, props.dealUserId[index].userId)
        }
        //concole.log(dealData, )

        setIsPostDeal(true)
    }
    const handleTransferData = (value) => {
        //concole.log(value, value.transferName, props.companyEmployees)
        for(let i = 0; i< props.companyEmployees.length; i++) {
            if(props.companyEmployees[i].userData[0].name === value.transferName) {
                //concole.log("Hello World", props.companyEmployees[i].userId)
                setTransferOwnerId(props.companyEmployees[i].userId)
            }
        }
        setIsPutTransfer(true)
    }
    //concole.log(transferOwnerId)
    const showEmployeeInfo = (value) => {
        //concole.log(value)
        setEnableShowEmployeeInfo(true)
        setEmployeeName(value)
        // setIsPostDeal(true)
    }

    const showDealSales = (value) => {
        //concole.log(value)
    }

    let data = [
        {
            key: '1',
            image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25-%E5%8F%B0%E5%8C%97101-%E4%BD%B3%E4%BD%9C12-%E5%88%A9%E5%8B%9D%E7%AB%A0-%E5%94%AF%E6%88%91%E7%8D%A8%E5%B0%8A-101%E4%BF%A1%E7%BE%A9%E8%B7%AF-1590736305.jpg?crop=0.752xw:1.00xh;0.118xw,0&resize=640:*',
            price: 10000,
            address: 'New York No. 1 Lake Park',
            content: ['文山區好房子', '台北市文山區興隆路二段', '獨立套房','萬芳醫院站200公尺'],
        }
    ];

    const onTransfer = () => {
        setTransferModalEnable(true)
    }

    return (
        <div>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
            {
                isShowDeleteAlert?(
                    <div style={{'position':'sticky' ,'top':'0px','zIndex':100 }}>
                        <Alert
                            afterClose={cancelRemoveHouse}
                            type="error"
                            action={
                                <Space>
                                    <Button size="small" type="ghost" onClick={removeHouseAction}>
                                        確定刪除
                                    </Button>
                                    <Button size="small" type="ghost" onClick={cancelRemoveHouse}>
                                        取消刪除
                                    </Button>
                                </Space>

                            }
                            closable
                        />
                    </div>
                ):null
            }
            <div>
                {props.enableTranfer ?
                <Row>
                    <Col xs={24} sm={8} md={8} lg={8} xl={6}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={12}>
                        <Divider>物件轉移</Divider>

                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={6}></Col>
                </Row>:[]
                }

                <Row>
                    <Col xs={0} sm={8} md={8} lg={8} xl={6}></Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Button type="primary" onClick={getHousesList} style={{
                            width: '100%',
                            height: '40px',
                            backgroundColor:'#008000'
                        }}>
                            搜尋
                        </Button>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  placeholder="排序:默認時間近到遠" size={size} options={sortOptions} onChange={changeSort} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Input id="textQuery" placeholder="文字搜尋 : 捷運,夜市,路段,學校..."  style={{
                            width: '100%',
                            height: '40px',
                        }}>
                        </Input>
                    </Col>
                    <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  id="citySelect" placeholder="縣市" size={size} options={cityOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select id="area" value={selectArea}   placeholder="區域" size={size} options={areaOptions} onChange={changeArea} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  placeholder="類型" size={size}  options={typeOfRentalOptions} onChange={changeTypeOfRental} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  mode="multiple" size={size}  placeholder="特色"  options={featureOptions} onChange={changeFeature} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select   placeholder="格局" size={size} options={roomOptions} onChange={changeRoom} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  placeholder="型態" size={size}  options={buildingTypeOptions} onChange={changeBuildingType} style={{
                            width: '100%',
                        }}>
                        </Select>
                    </Col>
                    <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>

                <Row>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  placeholder="租金" size={size} options={priceOptions} onChange={changePrice} style={{
                            width: '100%',
                        }}>
                        </Select>

                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  placeholder="坪數" size={size} options={pingOptions} onChange={changePing} style={{
                            width: '100%',
                        }}>
                        </Select>

                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                        <Select  placeholder="樓層" size={size} options={floorOptions} onChange={changeFloor} style={{
                            width: '100%',
                        }}>
                        </Select>

                    </Col>
                    <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>

                <Row style={{
                    'lineHeight':'30px',
                    'height': '30px'
                }}>
                    <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <span id="customPrice" style={{
                        width: '100%',
                        display: 'none'
                    }}>
                        租金：
                        <Input id="minCustomPrice" placeholder="最低"  style={{
                            width: '37%',
                        }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomPrice" placeholder="最高"  style={{
                            width: '37%',
                        }}>
                        </Input>
                    </span>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <span id="customPing" style={{
                        width: '100%',
                        display: 'none'
                    }}>
                        坪數：
                        <Input id="minCustomPing" placeholder="最低"  style={{
                            width: '37%',
                        }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomPing" placeholder="最高"  style={{
                            width: '37%',
                        }}>
                        </Input>
                    </span>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <span id="customFloor" style={{
                        width: '100%',
                        display: 'none'
                    }}>
                        樓層：
                        <Input id="minCustomFloor" placeholder="最低"  style={{
                            width: '37%',
                        }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomFloor" placeholder="最高"  style={{
                            width: '37%',
                        }}>
                        </Input>
                    </span>
                    </Col>
                    <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>
                <br></br><br></br><br></br>
                <Row>
                    <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Table
                            columns={columns}
                            pagination={{ position: ['topLeft', 'bottomRight'] }}
                            dataSource={houses}
                            // scroll={{
                            //     y: 540,
                            // }}
                            onChange={() => {window.scrollTo(0,0)}}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => {
                                        //concole.log('record',record)
                                        setHouseKey(record.key)
                                        if(isShowEdit === 'none' && props.enableTransfer !== true){
                                            //concole.log('event',event)
                                            //concole.log('record',record)
                                            //concole.log('rowIndex',rowIndex)
                                            //concole.log(housesListDetail[record.key])
                                            if(props.isCompanyList){
                                                openInNewTab(`/CompanyHouseDetail/${housesListDetail[record.key]._id}`)
                                            }else{
                                                openInNewTab(`/HouseDetail/${housesListDetail[record.key]._id}`)
                                            }
                                        }
                                    }, // click row
                                };}}
                        />
                    </Col>
                    <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>
            </div>
            <Modal  title=""
                    visible={enableDealForm}
                // onCancel={() => setEnableDealForm(false)}
                    closable={false}
                    footer={[]}
            >
                <Form form={form_deal}
                      className="deal_form"
                      name="dealForm"
                      onFinish={handleDealData}
                      scrollToFirstError
                >
                    <Form.Item
                        name="dealPrice"
                        label="實際租金："
                        rules={[
                            {
                                required: true,
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: '只能填寫數字'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="" maxlength={8} style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item
                        // name="TrafficType"
                        name="servePrice"
                        label="服務收入："
                        rules={[
                            {
                                required: true,
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: '只能填寫數字'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="" maxlength={8} style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item
                        // name="TrafficType"
                        name="rentDate"
                        label="租期："
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker.RangePicker style={{width: '100%'}}/>
                    </Form.Item>
                    {props.rank === 0 ?
                        <Form.Item
                        // name="TrafficType"
                        name="dealSales"
                        label="業務："
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                            <Select options={props.dealOptions} onSelect={showDealSales}/>
                    </Form.Item> : null}
                    <div style={{display: 'flex'}}>
                        <Button type="primary"
                                className='login-form-button'
                                shape="round"
                                key="submit"
                                htmlType="submit"
                                style={{width: '50%'}}
                        >
                            {/*Submit*/}
                            送出
                        </Button>
                        &nbsp;
                        <Button type="primary"
                                shape="round"
                                onClick={() => {
                                    form_deal.resetFields()
                                    setEnableDealForm(false)
                                }}
                                style={{width: '50%', backgroundColor:'red'}}
                        >
                            取消
                        </Button>
                    </div>

                </Form>

            </Modal>
            <Modal  title=""
                    visible={transferModalEnable}
                // onCancel={() => setEnableDealForm(false)}
                    closable={false}
                    footer={[]}
            >
                <Form form={form_transfer}
                      className="transferForm"
                      name="transferForm"
                      onFinish={handleTransferData}
                      scrollToFirstError
                >
                    <Form.Item
                        name="transferName"
                        label="轉移人員："
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select options={props.transferOptions} onSelect={showEmployeeInfo}/>

                    </Form.Item>
                    {enableShowEmployeeInfo ? <Descriptions title="員工資料" layout="horizontal" bordered column={{
                        xxl: 4,
                        xl: 4,
                        lg: 3,
                        md: 3,
                        sm: 2,
                        xs: 1,
                    }}>
                        <Descriptions.Item label="姓名" span={4}>{props.companyEmployees[props.transferOptions.map(item => item.value).indexOf(employeeName)].userData[0].name}</Descriptions.Item>
                        <Descriptions.Item label="電話" span={4}>{props.companyEmployees[props.transferOptions.map(item => item.value).indexOf(employeeName)].userData[0].phone}</Descriptions.Item>
                        <Descriptions.Item label="信箱" span={4}>{props.companyEmployees[props.transferOptions.map(item => item.value).indexOf(employeeName)].userData[0].mail}</Descriptions.Item>
                    </Descriptions>:[]}
                    <br/>
                    <div style={{display: 'flex'}}>
                        <Button type="primary"
                                className='login-form-button'
                                shape="round"
                                key="submit"
                                htmlType="submit"
                                style={{width: '50%'}}
                        >
                            {/*Submit*/}
                            送出
                        </Button>
                        &nbsp;
                        <Button type="primary"
                                shape="round"
                                onClick={() => {
                                    form_transfer.resetFields()
                                    setTransferModalEnable(false)
                                    setEnableShowEmployeeInfo(false)
                                }}
                                style={{width: '50%', backgroundColor:'red'}}
                        >
                            取消
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default HousesList;
