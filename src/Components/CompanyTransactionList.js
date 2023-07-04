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
    Result,
    Descriptions,
    Collapse,
    Statistic, Card, Form, Modal
} from "antd";
import cookie from 'react-cookies'
import {CompanyAxios, HouseAxios, TransactionAxios, UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";
import {TableSkeleton} from "@ant-design/pro-skeleton";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import {showInternelErrorPageForMobile} from './CommonUtil'
import {log} from "@craco/craco/lib/logger";

const Transaction_Auth = 'transaction/getTransactionList'
const editTransaction_Auth = 'transaction/editTransactionNoIncludeCompany'
const removeTransaction_Auth = '/transaction/editTransactionNoIncludeCompany'
const cancelEditTransaction_Auth = '/transaction/editTransactionNoIncludeCompany'
const { Panel } = Collapse;
const dealYearMonth = {
    year: [],
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',  ]
};

const formItemLayout = {
    labelCol: {
        xs: {span: 4},
        sm: {span: 4}
    },
    wrapperCol: {
        xs: {span: 20},
        sm: {span: 20}
    },
}

const transactionArray = []

const CompanyTransactionList = (props) => {
    console.log(props)
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
    const [form_deal] = Form.useForm();
    const [areaOptions, setAreaOptions] = useState([]);
    const [selectArea, setSelectArea] = useState(null);
    const [init, setInit] = useState(true);
    const [transactionsListDetail, setTransactionsListDetail] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [enableEdit, setEnableEdit] = useState(false)
    const [enableEditModal, setEnableEditModal] = useState(false)
    const [size] = useState("large");
    const [minValue, setMinValue] = useState('')
    const [maxValue, setMaxValue] = useState('')
    const [getTransactionArg] = useState({
        skip : '',
        city : '',
        limit : '',
        isDelete : 'false',
        minPrice : 0,
        maxPrice : '9999999999',
        minServiceCharge : '',
        maxServiceCharge : '',
        minActualPrice : 0,
        maxActualPrice : '999999999',
        startTransactionDate : '',
        endTransactionDate : '',
        area : '',
        typeOfRental : '',
        userId : `${props.currentEmployeeData.userId}`,
        companyId : `${props.currentEmployeeData.companyId}`,
    });
    const [years, setYears] = useState();
    const [months, setMonths] = useState();
    const [enableCheckYearMonth, setEnableCheckYearMonth] = useState(false)
    const [caseCount, setCaseCount] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [editTransactionArg] = useState({
        id:'',
        houseId: '',
        userId: '',
        actualPrice: '',
        serviceCharge: '',
        transactionDate: '',
        startRentDate: '',
        endRentDate: '',
        companyId: '',
        state: '',
        edit: {
            actualPrice: '',
            serviceCharge: '',
            transactionDate: '',
            startRentDate: '',
            endRentDate: '',
        },
    });
    const [enableDel, setEnableDel] = useState(false);
    const [isShowDeleteAlert, SetIsShowDeleteAlert] = useState(false);
    const [isCancelEdit, setIsCancelEdit] = useState(false)
    const [isCancelDel, setIsCancelDel] = useState(false)
    const [delId, setDelId] = useState('');
    const [transactionData, setTransactionData] = useState([])
    const [transactionKey, setTransactionKey] = useState(null)
    const [updateInitialValue, setUpdateInitialValue] = useState(false)

    useEffect(() => {
        if (init) {
            setInit(false)
            props.checkEmployeeStateAndChangeMenu((result)=>{
                if(result === true){
                    setInit(false)
                    setYears(() => new Date().getFullYear())
                    setMonths(() => dealYearMonth.month[new Date().getMonth()])
                    setEnableCheckYearMonth(true)
                }else{
                    toast.warning('員工權限變動，請重新進入選單')
                }
            })
        }
    }, )
    console.log(transactionArray)
    useEffect(() => {
        console.log(transactionKey, typeof(transactionKey) ==='number')
        if(updateInitialValue && typeof(transactionKey) === 'number' ){

            form_deal.resetFields()
            form_deal.setFieldsValue({
                "dealPrice": (transactionArray && transactionArray.length > 0) ? transactionArray[transactionKey].actualPrice : null,
                "servicePrice": (transactionArray && transactionArray.length>0) ? transactionArray[transactionKey].serviceCharge:null,
                'dealDate': (transactionArray && transactionArray.length>0) ? moment(transactionArray[transactionKey].content[0]):null,
                'rentDate': [
                    (transactionArray && transactionArray.length>0) ? moment(transactionArray[transactionKey].content[1]):null,
                    (transactionArray && transactionArray.length>0) ? moment(transactionArray[transactionKey].content[2]):null
                ]
            })
            setTransactionKey(null)
        }
    }, [updateInitialValue, transactionKey]);
    // useEffect(() => {
    //     if (init) {
    //         setInit(false)
    //         setYears(() => new Date().getFullYear())
    //         setMonths(() => dealYearMonth.month[new Date().getMonth()])
    //         setEnableCheckYearMonth(true)
    //     }
    // }, )
    useEffect(() => {
        if (enableCheckYearMonth) {
            setEnableCheckYearMonth(false)
            getHousesTransactionList()
            checkYearMonth()
        }
    }, )
    // edit TransactionList
    useEffect(() => {
        if (enableEdit) {
            setEnableEdit(false)
            editHousesTransactionList()
        }
    }, )
    console.log(props.currentEmployeeData.rank)
    const getHousesTransactionList = () => {
        const xToken = cookie.load('x-token')
        const startDate = years+'/'+`${dealYearMonth.month.indexOf(months)+1}`+'/1'
        const endDate = years+'/'+`${dealYearMonth.month.indexOf(months)+1}`+'/31'
        // const startDate = '2022/12/1'
        // const endDate = '2022/12/31'
        console.log(startDate, endDate)
        let reqUrl = `${Transaction_Auth}?startTransactionDate=${startDate}&&endTransactionDate=${endDate}&&city=${getTransactionArg.city}&&area=${getTransactionArg.area}&&isDelete=${getTransactionArg.isDelete}&&companyId=${getTransactionArg.companyId}`
        if(props.currentEmployeeData.rank > 0) {
            reqUrl += `&&userId=${getTransactionArg.userId}`
        }
        console.log(reqUrl)
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    "content-type": "application/json",
                    "accept": "application/json",
                    'x-Token':xToken
                }
            }
        )
            .then( (response) => {
                console.log(response)
                setTransactionData(response.data.data)
                transactionArray.splice(0, transactionArray.length)
                resolveTransactionsList(response)
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    function resolveTransactionsList(response){
        console.log(response.data, response.data.data)
        console.log(moment(response.data.data[0].startRentDate).format('YYYY/MM/DD'))
        let data = []
        let countTemp = 0;
        let priceTemp = 0;
        console.log(data)
        if(response.data && response.data.data){
            const items = response.data.data
            setTransactionsListDetail([])
            setTransactionsListDetail(items)
            for(let i = 0 ;i<items.length; i++){
                if(items[i].houseData.length > 0 ) {
                    countTemp += 1;
                    priceTemp += parseInt(items[i].serviceCharge);
                    console.log(items[i])
                    const item = {
                        key: i,
                        transactionId : `${items[i]._id}`,
                        actualPrice: parseInt(`${items[i].actualPrice}`),
                        serviceCharge: parseInt(`${items[i].serviceCharge}`),
                        content: [`${moment(items[i].transactionDate).format('YYYY/MM/DD')}`, `${moment(items[i].startRentDate).format('YYYY/MM/DD')}`, `${moment(items[i].endRentDate).format('YYYY/MM/DD')}`],
                        houseData: items[i].houseData[0],
                        userData: items[i].userData[0],
                        state: items[i].state,
                        edit: items[i].edit,
                        // houseData: [items[i].houseData[0].name, items[i].houseData[0].price, items[i].houseData[0].hostName, items[i].houseData[0].hostGender, items[i].houseData[0].totalFloor, items[i].houseData[0].area]
                    }
                    if(items[i].state === 2) {
                        item.submitEdit = false
                    } else {
                        item.submitEdit = true
                    }
                    if(items[i].state === 3) {
                        item.submitDel = false
                    } else {
                        item.submitDel = true
                    }
                    if(items[i].state === 6 || items[i].state === 7) {
                        item.applyRetry = true
                    } else {
                        item.applyRetry = false
                    }

                    data.push(item)
                    transactionArray.push(item)
                }
            }
            console.log(data)
            setTransactions(data)
            setCaseCount(countTemp)
            setTotalPrice(priceTemp)
        }
    }
    const editHousesTransactionList = () => {
        const xToken = cookie.load('x-token')

        CompanyAxios.put(
            editTransaction_Auth, editTransactionArg,{
                headers:{
                    "content-type": "application/json",
                    "accept": "application/json",
                    'x-Token':xToken
                }
            }
        )
            .then( (response) => {
                console.log(response)
                if(response.data.status) {
                    toast.success('編輯審核已提交')
                    setEnableCheckYearMonth(true)
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }
    console.log(transactions)
    console.log(dealYearMonth.year)

    //cancel edit
    useEffect(() => {
        const xToken = cookie.load('x-token')
        console.log(xToken)
        if (isCancelEdit) {
             CompanyAxios.put(cancelEditTransaction_Auth,
                {
                    'id': transactionData[transactionKey]._id,
                    'houseId' : transactionData[transactionKey].houseId,
                    'userId' : transactionData[transactionKey].userId,
                    'actualPrice': transactionData[transactionKey].actualPrice,
                    'serviceCharge': transactionData[transactionKey].serviceCharge,
                    'transactionDate' : new Date(Date.parse(transactionData[transactionKey].transactionDate)).toLocaleDateString(),
                    'startRentDate': new Date(Date.parse(transactionData[transactionKey].startRentDate)).toLocaleDateString(),
                    'endRentDate': new Date(Date.parse(transactionData[transactionKey].endRentDate)).toLocaleDateString(),
                    'companyId': transactionData[transactionKey].companyId,
                    'edit': {

                    },
                    'state': 4,
                }
                , {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        'x-Token':xToken
                    }
                }).then((response) => {
                console.log(response)
                if(response.data.status) {
                    setIsCancelEdit(false)
                    getHousesTransactionList()
                }
            }).catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(`${error}`)
            })
        }
    }, [isCancelEdit])

    //remove transaction
    useEffect(() => {
        const xToken = cookie.load('x-token')
        console.log(xToken)
        if (enableDel) {
            CompanyAxios.put(removeTransaction_Auth,
                {
                    'id': transactionData[transactionKey]._id,
                    'houseId' : transactionData[transactionKey].houseId,
                    'userId' : transactionData[transactionKey].userId,
                    'actualPrice': transactionData[transactionKey].actualPrice,
                    'serviceCharge': transactionData[transactionKey].serviceCharge,
                    'transactionDate' : new Date(Date.parse(transactionData[transactionKey].transactionDate)).toLocaleDateString(),
                    'startRentDate': new Date(Date.parse(transactionData[transactionKey].startRentDate)).toLocaleDateString(),
                    'endRentDate': new Date(Date.parse(transactionData[transactionKey].endRentDate)).toLocaleDateString(),
                    'companyId': transactionData[transactionKey].companyId,
                    'edit': {

                    },
                    'state': 3,
                }
                , {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        'x-Token':xToken
                    }
                }).then((response) => {
                console.log(response)
                if(response.data.status) {
                    setEnableDel(false)
                    SetIsShowDeleteAlert(false)
                    getHousesTransactionList()
                }
            }).catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(`${error}`)
            })
        }
    }, [enableDel])

    //cancel Del
    useEffect(() => {
        const xToken = cookie.load('x-token')
        console.log(xToken)
        if (isCancelDel) {
            CompanyAxios.put(cancelEditTransaction_Auth,
                {
                    'id': transactionData[transactionKey]._id,
                    'houseId' : transactionData[transactionKey].houseId,
                    'userId' : transactionData[transactionKey].userId,
                    'actualPrice': transactionData[transactionKey].actualPrice,
                    'serviceCharge': transactionData[transactionKey].serviceCharge,
                    'transactionDate' : new Date(Date.parse(transactionData[transactionKey].transactionDate)).toLocaleDateString(),
                    'startRentDate': new Date(Date.parse(transactionData[transactionKey].startRentDate)).toLocaleDateString(),
                    'endRentDate': new Date(Date.parse(transactionData[transactionKey].endRentDate)).toLocaleDateString(),
                    'companyId': transactionData[transactionKey].companyId,
                    'edit': {

                    },
                    'state': 4,
                }
                , {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        'x-Token':xToken
                    }
                }).then((response) => {
                console.log(response)
                if(response.data.status) {
                    setIsCancelDel(false)
                    SetIsShowDeleteAlert(false)
                    getHousesTransactionList()
                }
            }).catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(`${error}`)
            })
        }
    }, [isCancelDel])

    const checkYearMonth = () => {
        let year = new Date().getFullYear()
        for (let i=year; i >= 2022; i--) {
            console.log(i)
            if(dealYearMonth.year.indexOf(i) < 0) {
                dealYearMonth.year.push(i)
            }
        }
    }
    const handleYearChange = (value) => {
        setYears(dealYearMonth.year[dealYearMonth.year.indexOf(value)]);
        setEnableCheckYearMonth(true)
        setTransactions([])
        setMaxValue('')
        setMinValue('')
        console.log(value)
        setCaseCount(0)
        setTotalPrice(0)
    };
    console.log(months)
    const handleMonthChange = (value) => {
        setMonths(dealYearMonth.month[dealYearMonth.month.indexOf(value)]);
        setEnableCheckYearMonth(true)
        setTransactions([])
        setMaxValue('')
        setMinValue('')
        setCaseCount(0)
        setTotalPrice(0)
    };
    console.log(transactions)

    function changeCity(city) {
        setSelectArea(null)
        setAreaOptions([])
        if(cityOptions[0].value !== city){
            getTransactionArg.city = city
            getTransactionArg.area = ''
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
                    getTransactionArg.city = ''
                    break;
            }
        }else{
            getTransactionArg.city = ''
        }
    }

    function changeArea(area) {
        setSelectArea(area)
        if(area === '區域不限'){
            getTransactionArg.area = ''
        }else{
            getTransactionArg.area = area
        }
    }

    const setMinPrice = (e) => {
        setMinValue(e.target.value)
        if(e.target.value) {
            getTransactionArg.minServiceCharge = parseInt(e.target.value)
        }else {
            getTransactionArg.minServiceCharge = 0
        }
    }

    const setMaxPrice = (e) => {
        console.log(e.target.value)
        setMaxValue(e.target.value)
        if(e.target.value) {
            getTransactionArg.maxServiceCharge = parseInt(e.target.value)
        }else {
            getTransactionArg.maxServiceCharge = 999999999
        }
    }
    const showSortResult = () => {
        setEnableCheckYearMonth(true)
        setTransactions([])
        setCaseCount(0)
        setTotalPrice(0)
    }
    console.log(getTransactionArg)

    const editTransactionData = (index) => {
        setEnableEditModal(true)
        console.log(transactions[index])
        editTransactionArg.id = transactions[index].transactionId
        editTransactionArg.houseId = transactions[index].houseData._id
        editTransactionArg.userId = transactions[index].houseData.owner
        editTransactionArg.actualPrice = parseInt(transactions[index].actualPrice)
        editTransactionArg.serviceCharge = parseInt(transactions[index].serviceCharge)
        editTransactionArg.transactionDate = transactions[index].content[0]
        editTransactionArg.startRentDate = transactions[index].content[1]
        editTransactionArg.endRentDate = transactions[index].content[2]
        editTransactionArg.companyId = transactions[index].houseData.belongId
        editTransactionArg.state = transactions[index].state
    }
    console.log(editTransactionArg)
    const handleDealData = (value) => {
        console.log(value)
        console.log(value.dealDate.format("YYYY/MM/DD"), value.rentDate[0].format("YYYY/MM/DD"), value.rentDate[1].format("YYYY/MM/DD"))
        editTransactionArg.edit.transactionDate = value.dealDate.format("YYYY/MM/DD")
        editTransactionArg.edit.startRentDate = value.rentDate[0].format("YYYY/MM/DD")
        editTransactionArg.edit.endRentDate = value.rentDate[1].format("YYYY/MM/DD")
        // {editTransactionArg.actualPrice = props.currentEmployeeData.rank === 0 ?parseInt(value.dealPrice) : editTransactionArg.actualPrice }
        // {editTransactionArg.serviceCharge = props.currentEmployeeData.rank === 0 ? parseInt(value.servicePrice) : editTransactionArg.serviceCharge}
        editTransactionArg.edit.actualPrice = parseInt(value.dealPrice)
        editTransactionArg.edit.serviceCharge = parseInt(value.servicePrice)
        editTransactionArg.state = 2
        setEnableEditModal(false)
        setEnableEdit(true)
        form_deal.resetFields()
    }

    const deleteTransaction = () => {
        setEnableDel(true)
    }

    const cancelRemoveTransaction = () => {
        SetIsShowDeleteAlert(false)
    }

    const stateCheck = (state) => {
        switch (state) {
            case 2 :
                return '編輯審核中'
            case 3 :
                return '刪除審核中'
            case 4 :
                return '正式資料'
            case 6 :
                return '編輯審核失敗'
            case 7 :
                return '刪除審核失敗'
            default :
                return null
        }
    }

    const stateColorCheck = (state) => {
        switch (state) {
            case 2 :
                return '#FF8E16'
            case 3 :
                return '#FF8E16'
            case 4 :
                return '#000000'
            case 6 :
                return '#FF0000'
            case 7 :
                return '#FF0000'
            default :
                return null
        }
    }

    // //delete
    // useEffect(() => {
    //     const xToken = cookie.load('x-token')
    //     let reqUrl = `${removeTransaction_Auth}?companyId=${props.currentEmployeeData.companyId}`
    //     if(enableDel) {
    //         UserAxios.delete(reqUrl, {
    //             headers: {
    //                 "content-type": "application/json",
    //                 "accept": "application/json",
    //                 "x-token" : xToken,
    //             },
    //             data: {"ids" : [delId]}
    //         }).then((response) => {
    //             console.log(response)
    //             if(response.data.status === true){
    //                 toast.success('刪除成功');
    //                 // setTimeout(()=>{
    //                 //     window.location.href = window.location.origin;
    //                 // },3000);
    //                 SetIsShowDeleteAlert(false)
    //                 setEnableCheckYearMonth(true)
    //             }else{
    //                 toast.error(response.data.data)
    //             }
    //         })
    //         .catch( (error) => {
    //             showInternelErrorPageForMobile()
    //             toast.error(error)
    //         })
    //     }
    // }, [enableDel])
    // console.log(delId)

    return (
        <div>
            {/*{JSON.stringify(props.currentEmployeeData)}*/}
            {/* CompanyTransactionList page */}
            {
                isShowDeleteAlert?(
                    <div style={{'position':'sticky' ,'top':'0px','zIndex':100 }}>
                        <Alert
                            afterClose={cancelRemoveTransaction}
                            type="error"
                            action={
                                <Space>
                                    <Button size="small" type="ghost" onClick={deleteTransaction}>
                                        確定刪除
                                    </Button>
                                    <Button size="small" type="ghost" onClick={cancelRemoveTransaction}>
                                        取消刪除
                                    </Button>
                                </Space>

                            }
                            closable
                        />
                    </div>
                ):null
            }
            <br/>
            <ToastContainer autoClose={2000} position="top-center"/>
            <Divider>成交紀錄</Divider>
            <Row>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                    <Select
                        defaultValue={years}
                        value={years}
                        size={size}
                        style={{ width: '50%' }}
                        onChange={handleYearChange}
                        options={dealYearMonth.year.map((year) => ({ label: year, value: year }))}
                    />
                    {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                    <Select
                        style={{ width: '50%' }}
                        value={months}
                        size={size}
                        onChange={handleMonthChange}
                        options={dealYearMonth.month.map((month) => ({ label: month, value: month }))}
                    />
                </Col>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            </Row>
            <br/>
            <Row>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col  xs={24} sm={9} md={9} lg={8} xl={6}>
                    服務費：
                    <Input id="minPrice" size={size} defaultValue={minValue} onChange={setMinPrice} placeholder="最低"  style={{
                        width: '37%',
                    }}>
                    </Input>
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    <Input id="maxPrice" size={size} defaultValue={maxValue} onChange={setMaxPrice} placeholder="最高"  style={{
                        width: '37%',
                    }}>
                    </Input>
                </Col>
                <Col  xs={11} sm={5} md={5} lg={4} xl={3}>
                    <Select allowClear id="citySelect" placeholder="縣市" size={size} options={cityOptions} onChange={changeCity} style={{
                        width: '100%',
                    }}>
                    </Select>
                </Col>
                &nbsp;&nbsp;
                <Col  xs={12} sm={5} md={5} lg={4} xl={3}>
                    <Select id="area" value={selectArea}  allowClear placeholder="區域" size={size} options={areaOptions} onChange={changeArea} style={{
                        width: '100%',
                    }}>
                    </Select>
                </Col>

            </Row>
            <br/>
            <Row>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col  xs={6} sm={5} md={5} lg={4} xl={3}>
                    <Button type="primary" onClick={showSortResult} style={{
                        width: '100%',
                        height: '40px',
                        backgroundColor:'#008000'
                    }}>
                        搜尋
                    </Button>
                </Col>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            </Row>
            <br/>
            <Row>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col  xs={12} sm={9} md={9} lg={7} xl={6}>
                    <Card>
                        <Statistic title="當月總案件數" value={caseCount} suffix="件"/>
                    </Card>
                </Col>
                <Col  xs={12} sm={9} md={9} lg={7} xl={6}>
                    <Card>
                        <Statistic title="當月總收入" value={totalPrice} suffix="元" />
                    </Card>
                </Col>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            </Row>
            <br/>
            <Row>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <Collapse defaultActiveKey={['0']}>
                            {transactions.map((data, index) => (
                                <Panel header={'【'+(index+1)+'】- '+data.houseData.name}
                                       key={index}
                                       extra={data.state === 2?
                                        <div>
                                            <a onClick={(event) => {

                                                Modal.info({
                                                    // title: '編輯結果',
                                                    content:
                                                        <div>
                                                            <Descriptions title="變更資料" bordered>
                                                                <Descriptions.Item label="成交價" span={3}>
                                                                    <div>
                                                                        <div style={{width:'80px',textAlign:'center' ,display:'inline-block'}}>{data.actualPrice} 元</div>
                                                                        <div style={{width:'80px', textAlign:'center' ,display:'inline-block'}}>⇨</div>
                                                                        <div style={{width:'80px', textAlign:'center',display:'inline-block'}}>{data.edit.actualPrice} 元</div>
                                                                    </div>
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label="服務費" span={3}>
                                                                    <div>
                                                                        <div style={{width:'80px',textAlign:'center' ,display:'inline-block'}}>{data.serviceCharge} 元</div>
                                                                        <div style={{width:'80px', textAlign:'center' ,display:'inline-block'}}>⇨</div>
                                                                        <div style={{width:'80px', textAlign:'center',display:'inline-block'}}>{data.edit.serviceCharge} 元</div>
                                                                    </div>
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label="成交日" span={3}>
                                                                    <div>
                                                                        <div style={{width:'80px',textAlign:'center' ,display:'inline-block'}}>{data.content[0]}</div>
                                                                        <div style={{width:'80px', textAlign:'center' ,display:'inline-block'}}>⇨</div>
                                                                        <div style={{width:'80px', textAlign:'center',display:'inline-block'}}>{data.edit.transactionDate}</div>
                                                                    </div>
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label="起租日" span={3}>
                                                                    <div>
                                                                        <div style={{width:'80px',textAlign:'center' ,display:'inline-block'}}>{data.content[1]}</div>
                                                                        <div style={{width:'80px', textAlign:'center' ,display:'inline-block'}}>⇨</div>
                                                                        <div style={{width:'80px', textAlign:'center',display:'inline-block'}}>{data.edit.startRentDate}</div>
                                                                    </div>
                                                                </Descriptions.Item>
                                                                <Descriptions.Item label="結租日" span={3}>
                                                                    <div>
                                                                        <div style={{width:'80px',textAlign:'center' ,display:'inline-block'}}>{data.content[2]}</div>
                                                                        <div style={{width:'80px', textAlign:'center' ,display:'inline-block'}}>⇨</div>
                                                                        <div style={{width:'80px', textAlign:'center',display:'inline-block'}}>{data.edit.endRentDate}</div>
                                                                    </div>
                                                                </Descriptions.Item>
                                                            </Descriptions>
                                                        </div>,
                                                    icon: [] ,
                                                    okText: '確定',
                                                    width: '1000px',
                                                    centered: 'true'
                                                });
                                                // setShowEditResultModal(true)
                                                console.log("Hello")
                                                // If you don't want click extra trigger collapse, you can prevent this:
                                                event.stopPropagation();
                                            }}>
                                                變更資料
                                            </a>
                                        </div>
                                           :
                                           null
                                       }
                                >
                                        <div>
                                            <Descriptions title="詳細資料" bordered>

                                                <Descriptions.Item label="原始價" span={1}>{data.houseData.price + ' 元'}</Descriptions.Item>
                                                <Descriptions.Item label="成交價" span={1}>{data.actualPrice + ' 元'}</Descriptions.Item>
                                                <Descriptions.Item label="服務費" span={1}>{data.serviceCharge + ' 元'}</Descriptions.Item>
                                                <Descriptions.Item label="成交日" span={1}>{data.content[0]}</Descriptions.Item>
                                                <Descriptions.Item label="起租日" span={1}>{data.content[1]}</Descriptions.Item>
                                                <Descriptions.Item label="結租日" span={1}>{data.content[2]}</Descriptions.Item>
                                                <Descriptions.Item label="城市" span={1.5}>{data.houseData.city}</Descriptions.Item>
                                                <Descriptions.Item label="區域" span={1.5}>{data.houseData.area}</Descriptions.Item>
                                                <Descriptions.Item label="屋主" span={3}>{data.houseData.hostName+`${data.houseData.hostGender? ' 先生' : ' 小姐'}`}</Descriptions.Item>
                                                <Descriptions.Item label="總樓層" span={3}>{data.houseData.totalFloor+ ' 樓'}</Descriptions.Item>
                                                <Descriptions.Item label="負責房仲" span={3}>
                                                    {'姓名 : ' + data.userData.name}
                                                    <br />
                                                    {'信箱 : ' + data.userData.mail}
                                                    <br />
                                                    {'電話 : ' + data.userData.phone}

                                                </Descriptions.Item>
                                                <Descriptions.Item label="狀態" span={3}><div style={{color: stateColorCheck(data.state)}}>{stateCheck(data.state)}</div></Descriptions.Item>
                                            </Descriptions>
                                            <br/>
                                            <Button
                                                style={{width: '90px',
                                                    color:'#FFFFFF',
                                                    backgroundColor:'#FF9A16',
                                                    borderColor:'#FF9A16',
                                                    display: data.applyRetry ?  null : 'none'
                                                }}
                                                onClick={() => {
                                                    console.log(index)
                                                    setTransactionKey(index)
                                                    setIsCancelEdit(true)
                                                }}
                                            >
                                                重新申請
                                            </Button>
                                            <Button disabled={!data.submitEdit}
                                                    style={{width: '70px',
                                                        backgroundColor: data.submitEdit?'#00CC00':'',
                                                        borderColor: data.submitEdit?'#00CC00':'',
                                                        color:data.submitEdit?'#FFFFFF':'',
                                                        display: data.applyRetry? 'none' : (data.submitDel? null : 'none')
                                                    }}
                                                    onClick={() => {
                                                        editTransactionData(index)
                                                        setTransactionKey(index)
                                                        setUpdateInitialValue(true)
                                                        console.log(index)
                                                    }}>
                                                { data.submitEdit ? '編輯' : '申請中'}
                                            </Button>
                                            &nbsp;
                                            {data.submitEdit
                                                ?
                                               []
                                                :
                                                <span>
                                                &nbsp;
                                                    <Button type="primary"
                                                            onClick={() => {
                                                                console.log(index)
                                                                setTransactionKey(index)
                                                                setIsCancelEdit(true)
                                                            }}
                                                            style={{
                                                                width: '90px',
                                                                backgroundColor: '#FF0000',
                                                                borderColor: '#FF0000'
                                                            }}>
                                                        取消申請
                                                    </Button>
                                                </span>
                                            }
                                            <Button disabled={isShowDeleteAlert? isShowDeleteAlert : !data.submitDel}
                                                    onClick={() => {
                                                        setTransactionKey(index)
                                                        SetIsShowDeleteAlert(true)
                                                        setDelId(transactions[index].transactionId)
                                                    }}
                                                    style={{width: '70px',
                                                        backgroundColor: isShowDeleteAlert?'':data.submitDel?'#FF0000':'',
                                                        borderColor: isShowDeleteAlert?'':data.submitDel?'#FF0000':'',
                                                        color:isShowDeleteAlert?'':data.submitDel?'#FFFFFF':'',
                                                        display: data.applyRetry? 'none' : (data.submitEdit? null : 'none')
                                                    }}
                                            >
                                                { data.submitDel ? '刪除' : '申請中'}
                                            </Button>
                                            {data.submitDel
                                                ?
                                                []
                                                :
                                                <span>
                                                &nbsp;
                                                    <Button type="primary"
                                                            onClick={() => {
                                                                console.log(index)
                                                                setTransactionKey(index)
                                                                setIsCancelDel(true)
                                                            }}
                                                            style={{
                                                                width: '90px',
                                                                backgroundColor: '#FF0000',
                                                                borderColor: '#FF0000'
                                                            }}>
                                                        取消申請
                                                    </Button>
                                                </span>
                                            }

                                        </div>
                                </Panel>
                            ))}
                        </Collapse>
                    </Col>
                <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            </Row>
            <Modal  title=""
                    visible={enableEditModal}
                    closable={false}
                    footer={[]}
            >
                <Form form={form_deal}
                      className="deal_form"
                      name="dealForm"
                      onFinish={handleDealData}
                      scrollToFirstError
                      initialValues={{
                          "dealPrice":  null,
                          // "servicePrice": transactionArray && transactionArray.length>0 ? transactionArray[transactionKey].serviceCharge:null,
                          // 'dealDate': moment(data.content[0]),
                          // 'rentDate': [moment(data.content[1]), moment(data.content[2])]
                          }}
                      {...formItemLayout}
                >
                    <div>
                        <Form.Item
                            // name="TrafficType"
                            name="dealPrice"
                            label="成交價："
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input id="dealPrice" style={{
                                width: '100%',
                            }}>
                            </Input>
                        </Form.Item>
                        <Form.Item
                            // name="TrafficType"
                            name="servicePrice"
                            label="服務費："
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input id="servicePrice" style={{
                                width: '100%',
                            }}>
                            </Input>
                        </Form.Item>
                    </div>
                    <Form.Item
                        // name="TrafficType"
                        name="dealDate"
                        label="成交日："
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker style={{
                            width: '100%',
                        }}/>
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
                        <DatePicker.RangePicker style={{
                            width: '100%',
                        }}/>
                    </Form.Item>
                    <div style={{display: 'flex'}}>
                        <Button type="primary"
                                className='login-form-button'
                                shape="round"
                                key="submit"
                                htmlType="submit"
                                style={{width: '50%'}}
                            // onClick={(x) => console.log(x)}
                        >
                            {/*Submit*/}
                            送出
                        </Button>
                        &nbsp;
                        <Button type="primary"
                                shape="round"
                                onClick={() => {
                                    form_deal.resetFields()
                                    setEnableEditModal(false)
                                }}
                                style={{width: '50%', backgroundColor:'red', borderColor: 'red'}}
                        >
                            取消
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CompanyTransactionList;
