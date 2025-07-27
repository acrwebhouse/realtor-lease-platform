import {useEffect, useState} from 'react';
import {
    Space,
    Button,
    Input,
    Select,
    Divider,
    Row,
    Col,
    Pagination,
    Alert,
    Form, Collapse, Descriptions
} from "antd";
import cookie from 'react-cookies'
import {HouseAxios} from './axiosApi'
import {CompanyAxios} from './axiosApi'
import {
    useParams
} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'
import {xTokenName} from './Auth';
const { Panel } = Collapse;

const AuthAddDev = '/houseDev/addHouseDev/'
const AuthGetDevList = `/houseDev/getHouseDevList/`
const AuthDelDevList = `/houseDev/removeHouseDev`
const AuthEditDevList = `/houseDev/editHouseDev/`

const CityOptions = [{ value: '', label: '縣市不限' }, { value: '台北市' }, { value: '新北市' }, { value: '桃園市' }, { value: '台中市' }, { value: '台南市' }, { value: '高雄市' }, { value: '基隆市' }, { value: '新竹市' }, { value: '嘉義市' }, { value: '新竹縣' }, { value: '苗栗縣' }, { value: '彰化縣' }, { value: '南投縣' }, { value: '雲林縣' }, { value: '嘉義縣' }, { value: '屏東縣' }, { value: '宜蘭縣' }, { value: '花蓮縣' }, { value: '臺東縣' }, { value: '澎湖縣' }, { value: '金門縣' }, { value: '連江縣' }];
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

const hostGenderArr=['小姐', '先生']
const DevState = [{ value: '開發中'}, { value: '成功' }, { value: '失敗' }]
const RentFee = [{ value: '未定' }, { value: '一個月' }, { value: '半個月'}, { value: '其他'}]

const convertString = (word) =>{
    switch(word.toLowerCase().trim()){
        case "yes": case "true": case "1": return true;
        case "no": case "false": case "0": case null: return false;
        default: return Boolean(word);
    }
}

const CompanyDevelopManage = (props) => {
    let { id } = useParams();
    const [form] = Form.useForm();
    const [init, setInit] = useState(true);
    const xToken = cookie.load(xTokenName)
    const [switchPage, setSwitchPage] = useState(0)
    const [areaOptions, setAreaOptions] = useState([]);
    const [selectArea, setSelectArea] = useState(null);
    const [DevStateIsSuccess, setDevStateIsSuccess] = useState([])
    const [isRunPost, setIsRunPost] = useState(false)
    const [isRunEdit, setIsRunEdit] = useState(false)
    const [DevData, setDevData] = useState([])
    const [DevDataList, setDevDataList] = useState([])
    const [enableDel, setEnableDel] = useState(false);
    const [enableGetDevData, setEnableGetDevData] = useState(false)
    const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false);
    const [devListData, setDevListData] = useState([])
    const [devListKey, setDevListKey] = useState([])
    const [editEnable, setEditEnable] = useState(false)
    const [page, setPage] = useState(1)
    const [filterParams, setFilterParams] = useState({})
    const [tempFilters, setTempFilters] = useState({})
    const [size] = useState("large")
    const [companyData] = useState(
        {
            name : '',
            companyId: '',
            userId: '',
            owner:'',
        }
    );
    const [devTempData] = useState({
        key:'',
        id:'',
        name: '',
        companyId: '',
        serviceCharge: '',
        owner:'',
        city: '',
        area: '',
        address: '',
        source: '',
        hostName: '',
        hostPhone: '',
        hostGender: '',
        remark: '',
        state: '',
    })

    useEffect(() => {
        if (init) {
            setInit(false)
            getCompanyEmployeeInfo()
            getDevDataInfo()
        }
    }, )
    console.log(props, companyData)

    function getCompanyEmployeeInfo(){
        let reqUrl = `/employees/getPersonalEmployeesInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                //concole.log(response)
                if(response.data.status === true){
                    console.log(response.data)
                    // resolveCompanyEmployee(response.data.data)
                    companyData.companyId = response.data.data[0].companyId
                    companyData.userId = response.data.data[0].userId
                    companyData.owner = response.data.data[0].userData[0].account
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    console.log(companyData.owner)
    const showAddDevelop = () => {
        setSwitchPage(1)
        // setInit(true)
    }
    const showDevelopList = () => {
        setSwitchPage(2)
        setEnableGetDevData(true)
        setFilterParams({})
        setTempFilters({})
        // setInit(true)
    }

    const changeCity = (City) => {

        setSelectArea([])
        setAreaOptions([])
        
        if (!City || City === '') {
            return;
        }
        
        switch(City){
            case '台北市':
                setAreaOptions(TaipeiAreaOptions)
                break;
            case '新北市':
                setAreaOptions(NewTaipeiAreaOptions)
                break;
            case '桃園市':
                setAreaOptions(TaoYuanAreaOptions)
                break;
            case '台中市':
                setAreaOptions(TaiChungAreaOptions)
                break;
            case '台南市':
                setAreaOptions(TaiNanAreaOptions)
                break;
            case '高雄市':
                setAreaOptions(KaoHsiungAreaOptions)
                break;
            case '基隆市':
                setAreaOptions(KeeLungAreaOptions)
                break;
            case '新竹市':
                setAreaOptions(HsinChuCityAreaOptions)
                break;
            case '嘉義市':
                setAreaOptions(ChiaYiCityAreaOptions)
                break;
            case '新竹縣':
                setAreaOptions(HsinChuAreaOptions)
                break;
            case '苗栗縣':
                setAreaOptions(MiaoLiAreaOptions)
                break;
            case '彰化縣':
                setAreaOptions(ChangHuaAreaOptions)
                break;
            case '南投縣':
                setAreaOptions(NanTouAreaOptions)
                break;
            case '雲林縣':
                setAreaOptions(YunLinAreaOptions)
                break;
            case '嘉義縣':
                setAreaOptions(chiayiAreaOptions)
                break;
            case '屏東縣':
                setAreaOptions(PingTungAreaOptions)
                break;
            case '宜蘭縣':
                setAreaOptions(YiLanAreaOptions)
                break;
            case '花蓮縣':
                setAreaOptions(HuaLienAreaOptions)
                break;
            case '臺東縣':
                setAreaOptions(TaiTungAreaOptions)
                break;
            case '澎湖縣':
                setAreaOptions(PengHuAreaOptions)
                break;
            case '金門縣':
                setAreaOptions(KinMenAreaOptions)
                break;
            case '連江縣':
                setAreaOptions(LianJiangAreaOptions)
                break;
            default:
        }
    }

    const changeArea = (area) => {
        setSelectArea(area)
    }
    
    const handleSearch = () => {
        setFilterParams(tempFilters)
        setPage(1)
        getDevDataInfo(tempFilters)
    }
    console.log(DevData)
    const DevStateCheck = (stateValue) => {
        let state = DevState.map(e => e.value).indexOf(stateValue);
        setDevStateIsSuccess(state)
    }
    console.log(DevStateIsSuccess === 1)
    const AddDevData = (values) => {
        console.log(values)
        if(!editEnable) {
            setDevData({
                    "name": values['name'],
                    "companyId": companyData.companyId,
                    "serviceCharge": DevStateIsSuccess === 1 ? values['RentFee'] : "",
                    "city": values['City'],
                    "area": values['Area'],
                    "owner": companyData.userId,
                    "address": values['City']+values['Area']+values['address'],
                    "saleType": 1,
                    "source": values['source'],
                    "hostName": values['hostName'],
                    "hostPhone": values['hostPhone'],
                    "hostGender": convertString(String(hostGenderArr.indexOf(values['hostGender']))),
                    "remark": values['remark'],
                    "state": DevStateIsSuccess + 1,
                })
            if(values['hostPhone'].slice(0, 2) !== '09' || values['hostPhone'].length < 10  ) {
                // setIsSubmitModalVisible(false)
                errorPhoneFormat();
            } else {
                setIsRunPost(true)
            }
        } else {
            devTempData.name = values['name']
            devTempData.city = values['City']
            devTempData.area = values['Area']
            devTempData.address = values['City']+values['Area']+values['address']
            devTempData.hostName = values['hostName']
            devTempData.hostGender = convertString(String(hostGenderArr.indexOf(values['hostGender'])))
            devTempData.hostPhone = values['hostPhone']
            devTempData.source = values['source']
            devTempData.state = DevStateIsSuccess + 1
            devTempData.serviceCharge = DevStateIsSuccess === 1 ? values['RentFee'] : ""
            devTempData.remark = values['remark']
            setIsRunEdit(true)
        }

    };
    console.log(DevStateIsSuccess)
    //Post Dev data
    useEffect(() => {
        // //concole.log(RegisterData)
        // //concole.log(CityAreaScope)

        if (isRunPost) {
                HouseAxios.post(AuthAddDev, DevData, {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        "x-token" : xToken,
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        if(response.data.status) {
                            toast.success(`開發資料上傳成功`);
                            form.setFieldsValue({
                                "name" : [],
                                "City" : [],
                                "Area" : [],
                                "address" : [],
                                "hostName" : [],
                                "hostGender" : [],
                                "hostPhone": [],
                                "source" : [],
                                "DevState" : [],
                                "RentFee": [],
                                "remark" : [],
                            })
                        }
                    })
                    .catch( (error) => {
                        showInternelErrorPageForMobile()
                        toast.error(error)
                    })

            setIsRunPost(false)
        }
    }, [isRunPost, DevData, xToken])

    //Put Dev data
    useEffect(() => {
        let reqUrl = `${AuthEditDevList}`
        if (isRunEdit) {
            const body = {
                "id" : devTempData.id,
                "companyId" : devTempData.companyId,
                "name" : devTempData.name,
                "state": devTempData.state,
                "serviceCharge": devTempData.serviceCharge,
                "city": devTempData.city,
                "area": devTempData.area,
                "owner": devTempData.owner,
                "address": devTempData.address,
                "saleType": 1,
                "source": devTempData.source,
                "hostName": devTempData.hostName,
                "hostPhone": devTempData.hostPhone,
                "hostGender": devTempData.hostGender,
                "remark": devTempData.remark
            }
            HouseAxios.put(reqUrl, body, {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "x-token" : xToken,
                }
            })
                .then((response) => {
                    console.log(response.data)
                    if(response.data.status) {
                        toast.success(`更新資料成功`);
                    }
                })
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    toast.error(error)
                })

            setIsRunEdit(false)
            setSwitchPage(2)
            getDevDataInfo()
        }
    }, [isRunEdit, xToken])
    // Get Dev data
    useEffect(() => {
        if(switchPage === 2 && enableGetDevData) {
            getDevDataInfo()
            setEnableGetDevData(false)
        }
    }, [switchPage, enableGetDevData])

    // 移除自動搜尋，改為手動按搜尋按鈕觸發


    function getDevDataInfo(customFilters){
        const filters = customFilters || filterParams;
        const params = {
            companyId: companyData.companyId,
            owner: companyData.userId,
            isDelete: false,
            timeSort: '-1', // 默認時間近到遠
            ...filters
        }
        
        const queryString = Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== '' && value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&')
        
        let reqUrl = `${AuthGetDevList}?${queryString}`
        const xToken = cookie.load('x-token')
        HouseAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                // console.log(response)
                if(response.data.status === true){
                    console.log(response.data)
                    setDevListData(response.data.data)
                    resolveDevList(response)
                }else{
                    toast.error('開發資料取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    console.log(devListKey)
    function resolveDevList(response){
        console.log(response.data, response.data.data)
        let data = []
        if(response.data && response.data.data){
            const items = response.data.data
            console.log(items)
            for(let i = 0 ;i<items.length; i++){
                    const item = {
                        key: i,
                        name : `${items[i].name}`,
                        hostName: `${items[i].hostName}`,
                        hostGender:`${items[i].hostGender}`,
                        owner: `${items[i].ownerData[0].account}`,
                        hostPhone: `${items[i].hostPhone}`,
                        address: `${items[i].address}`,
                        state: `${items[i].state}`,
                        source: `${items[i].source}`,
                        remark: `${items[i].remark}`,
                        serviceCharge: `${items[i].serviceCharge}`,
                        createTime:`${items[i].createTime}` ,
                        updateTime: `${items[i].updateTime}`,
                    }
                    data.push(item)
            }
            console.log(data)
            setDevDataList(data)
        }
    }

    console.log(DevDataList.owner)
    const clearForm = () => {
        form.resetFields()
        setDevStateIsSuccess('')
        setEditEnable(false)
    }

    const errorPhoneFormat = () => {
        toast.error(`請輸入正確的手機號格式(09xxxxxxxx)`)
    }

    const stateCheck = (state) => {
        switch (state) {
            case 1 :
                return '開發中'
            case '1' :
                return '開發中'
            case 2 :
                return '成功'
            case '2' :
                return '成功'
            case 3 :
                return '失敗'
            case '3' :
                return '失敗'
            default :
                return null
        }
    }

    const deleteDevList = () => {
        setEnableDel(true)
    }

    const cancelRemoveDelList = () => {
        setIsShowDeleteAlert(false)
    }
    console.log(devListData)

    //remove DevData
    useEffect(() => {
        if (enableDel) {
            let reqUrl = `${AuthDelDevList}`
            HouseAxios.delete(reqUrl, {
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "x-token" : xToken,
                },
                data: {"ids" : [devListData[devListKey]?devListData[devListKey]._id: '']}
            }).then((response) => {
                //console.log(response)
                if(response.data.status === true){
                    toast.success('刪除成功');
                    setEnableDel(false)
                    setIsShowDeleteAlert(false)
                    getDevDataInfo()
                }else{
                    toast.error(response.data.data)
                }
            })
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    toast.error(error)
                })
        }
    }, [enableDel])

    const tempDataSetup = (key) => {
        if(key !== undefined) {
            devTempData.id = devListData[key]._id
            devTempData.companyId = devListData[key].companyId
            devTempData.name = devListData[key].name
            devTempData.city = devListData[key].city
            devTempData.area = devListData[key].area
            devTempData.address = devListData[key].address
            devTempData.hostName = devListData[key].hostName
            devTempData.hostGender = devListData[key].hostGender
            devTempData.hostPhone = devListData[key].hostPhone
            devTempData.source = devListData[key].source
            devTempData.state = devListData[key].state
            devTempData.serviceCharge = devListData[key].serviceCharge
            devTempData.remark = devListData[key].remark
            devTempData.owner = devListData[key].owner
        }
    }

    const setEditInitValue = () => {
        form.setFieldsValue({
            "name" : devTempData.name.length > 0 ? devTempData.name : [],
            "City" : devTempData.name.length > 0 ? devTempData.city: [],
            "Area" : devTempData.name.length > 0 ? devTempData.area: [],
            "address" : devTempData.name.length > 0 ? devTempData.address.slice(6, devTempData.address.length): [],
            "hostName" : devTempData.name.length > 0 ? devTempData.hostName: [],
            "hostGender" :devTempData.name.length > 0 ? devTempData.hostGender ? '先生' : '小姐': [],
            "hostPhone": devTempData.name.length > 0 ? devTempData.hostPhone: [],
            "source" : devTempData.name.length > 0 ? devTempData.source: [],
            "DevState" : devTempData.name.length > 0 ? DevState[devTempData.state-1].value: [],
            "RentFee": devTempData.name.length > 0 ? devTempData.serviceCharge: [],
            "remark" : devTempData.name.length > 0 ? devTempData.remark: [],
        })
    }
    console.log(DevDataList)
    const clearDevTempData = () => {
        // devTempData.name = ''
        // devTempData.city = ''
        // devTempData.area = ''
        // devTempData.address = ''
        // devTempData.hostName = ''
        // devTempData.hostGender = ''
        // devTempData.hostPhone = ''
        // devTempData.source = ''
        // devTempData.state = ''
        // devTempData.serviceCharge = ''
        // devTempData.remark = ''
        form.setFieldsValue({
            "name" : [],
            "City" : [],
            "Area" : [],
            "address" : [],
            "hostName" : [],
            "hostGender" :[],
            "hostPhone": [],
            "source" : [],
            "DevState" : [],
            "RentFee": [],
            "remark" : [],
        })
    }
    console.log(devTempData, DevDataList.length)
    const backPage = () => {
        setSwitchPage(editEnable? 2 : 0)
        setEditEnable(false)
        setDevStateIsSuccess([])
        form.resetFields()
        console.log(222222)
    }
    console.log(devListData.length, editEnable )

    return (
        switchPage === 0
            ?
            <div style={{display: 'center', textAlign: 'center'}}>
                <Row>
                    <Col  xs={24} sm={3} md={3} lg={4} xl={9}></Col>
                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                        <div style={{transform: 'translate(0, 300px)', display:'flex'}}>
                            <Button  onClick={showAddDevelop}
                                    style={{
                                        width: '380px',
                                        height: '90px',
                                        color:'#FFFFFF',
                                        borderColor: '#FFFFFF',
                                        borderRadius: '34px',
                                        boxShadow: '3px 4px 0px 0px #899599',
                                        background: 'linear-gradient(to bottom, #003C9D 5%, #003C9D 100%)',
                                        backgroundColor: '#003C9D',
                                        cursor: 'pointer',
                                        fontFamily: "'cwTeXKai', serif",
                                        fontSize: '40px',
                                        margin: '40px',

                                    }}
                            >新增開發</Button>
                        </div>
                            {/*<br/>*/}
                            <br/>
                        <div style={{transform: 'translate(0, 250px)', display:'flex'}}>
                        <Button type="primary" onClick={showDevelopList}
                                    style={{
                                        width: '380px',
                                        height: '90px',
                                        color:'#FFFFFF',
                                        borderColor: '#FFFFFF',
                                        borderRadius: '34px',
                                        boxShadow: '3px 4px 0px 0px #899599',
                                        background: 'linear-gradient(to bottom, #003C9D 5%, #003C9D 100%)',
                                        backgroundColor: '#003C9D',
                                        cursor: 'pointer',
                                        fontFamily: "'cwTeXKai', serif",
                                        fontSize: '40px',
                                        margin: '40px',
                            }}
                            >開發案件</Button>
                        </div>
                    </Col>
                    <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                </Row>
            </div>

            :
         switchPage === 1
             ?
             <div>
                 <Row>
                     <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                     <Col  xs={24} sm={18} md={18} lg={15} xl={12}> </Col>
                     <Col xs={24} sm={3} md={3} lg={4} xl={6}>
                         <div style={{float:'right'}}>
                             <Button type="primary" onClick={() => {
                                 backPage()
                             }} style={{width: '80px'}}>返回</Button>
                         </div>
                     </Col>
                 </Row>
                 <Row>
                     <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                     <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                         <Divider> 物件開發</Divider>
                     </Col>
                 </Row>
                 <Form
                     form={form}
                     className="addDevelop_form"
                     name="addDevelop"
                     onFinish={AddDevData}
                     scrollToFirstError
                     initialValues={{
                         "name" : devTempData.name.length > 0 ? devTempData.name : [],
                         "City" : devTempData.name.length > 0 ? devTempData.city: [],
                         "Area" : devTempData.name.length > 0 ? devTempData.area: [],
                         "address" : devTempData.name.length > 0 ? devTempData.address: [],
                         "hostName" : devTempData.name.length > 0 ? devTempData.hostName: [],
                         "hostGender" :devTempData.name.length > 0 ? devTempData.hostGender ? '先生' : '小姐': [],
                         "hostPhone": devTempData.name.length > 0 ? devTempData.hostPhone: [],
                         "source" : devTempData.name.length > 0 ? devTempData.source: [],
                         "DevState" : devTempData.name.length > 0 ? DevState[devTempData.state-1].value: [],
                         "RentFee": devTempData.name.length > 0 ? devTempData.serviceCharge: [],
                         "remark" : devTempData.name.length > 0 ? devTempData.remark: [],
                     }}

                 >
                     <Row>
                         <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Form.Item
                                 name="name"
                                 label="名稱"
                                 rules={[
                                     {
                                         required: true,
                                         message: '名稱欄位不能為空白',
                                     },
                                 ]}
                                 style={{ width: '100%' }}
                             >
                                 <Input placeholder=""
                                        size="large"
                                        style={{ width: '100%' }}
                                        maxLength={20}
                                 />
                             </Form.Item>
                         </Col>
                     </Row>
                     <Row>
                         <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Form.Item label="屋主">
                                 <Row>
                                     <Col  xs={18} sm={19} md={19} lg={20} xl={21}>
                                         <Form.Item name="hostName"
                                                    style={{width: '100%'}}
                                         >
                                             <Input size="large"
                                                    placeholder="填屋主的姓氏或名字"
                                                    style={{width: '100%',}}
                                                    maxLength={20}
                                             />
                                         </Form.Item>
                                     </Col>
                                     <Col xs={6} sm={5} md={5} lg={4} xl={3}>
                                        <Form.Item name="hostGender" style={{width: '100%'}}
                                            rules={[{required: false, message: '此欄位不能為空白',},]}
                                        >
                                            <Select size="large" id="area" allowClear placeholder="性別"
                                                     options={[{ value: '先生'},{ value: '小姐'}]}
                                                     style={{width: '100%',}}>
                                            </Select>
                                        </Form.Item>
                                     </Col>
                                 </Row>
                             </Form.Item>
                         </Col>
                     </Row>
                     <Row>
                         <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Form.Item
                                 name="hostPhone"
                                 label="屋主電話"
                                 rules={[
                                     {
                                         required: true,
                                         message: '手機號碼欄位不能空白',
                                     },
                                     {
                                         pattern: /^[0-9]*$/,
                                         message: '電話只能填寫數字'
                                     }
                                 ]}
                                 style={{ width: '100%' }}
                             >
                                 <Input
                                     style={{
                                         width: '100%',
                                     }}
                                     size="large"
                                     placeholder='09xxxxxxxx'
                                     maxLength={10}
                                 />
                             </Form.Item>
                         </Col>
                     </Row>
                     <Row>
                         <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Form.Item
                                 name="source"
                                 label="案源"
                                 rules={[
                                     {
                                         required: false,
                                         message: '名稱欄位不能為空白',
                                     },
                                 ]}
                                 style={{ width: '100%' }}
                             >
                                 <Input placeholder=""
                                        size="large"
                                        style={{ width: '100%' }}
                                        maxLength={20}
                                 />
                             </Form.Item>
                         </Col>
                     </Row>
                     <Row>
                         <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Form.Item label="地址">
                                 <Row>
                                     <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                         <Form.Item name="City"
                                                    style={{ width: '100%' }}
                                                    rules={[{required: true, message: '此欄位不能為空白',}]}
                                         >
                                             <Select size="large" allowClear id="citySelect" placeholder="縣市" options={CityOptions} onChange={changeCity} style={{
                                                 width: '100%',
                                             }}>
                                             </Select>
                                         </Form.Item>
                                     </Col>
                                     <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                         <Form.Item name="Area"
                                                    style={{ width: '100%' }}
                                                    rules={[{required: true, message: '此欄位不能為空白',}]}
                                         >
                                             <Select size="large" allowClear id="area" value={selectArea} placeholder="區域" options={areaOptions} onChange={changeArea} style={{
                                                 width: '100%',
                                             }}>
                                             </Select>
                                         </Form.Item>
                                     </Col>
                                     <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                         <Form.Item name="address"
                                                    style={{ width: '100%' }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '此欄位不能為空白',
                                                        },
                                                        // {
                                                        //     pattern: /^[\u4e00-\u9fa5]+$/,
                                                        //     message: '地址只能填寫中文'
                                                        // }
                                                    ]}
                                         >
                                             <Input size="large"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                 // onChange={(e) => CheckAddressReg(e.target.value)}
                                             />
                                         </Form.Item>
                                     </Col>
                                 </Row>
                             </Form.Item>
                         </Col>
                     </Row>
                     <Row>
                         <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                         <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                             <Form.Item
                                 name="DevState"
                                 label="開發狀態"
                                 rules={[
                                     {
                                         required: true,
                                         message: '請選擇其中一個',
                                     }
                                 ]}
                                 style={{ width: '100%' }}
                             >
                                 <Select size="large" allowClear id="DevState" placeholder="狀態" options={DevState} onChange={DevStateCheck} style={{
                                     width: '100%',
                                 }}>
                                 </Select>
                             </Form.Item>
                         </Col>
                     </Row>
                     {DevStateIsSuccess === 1 ?
                         <div>
                             <Row>
                                 <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                                 <Col xs={24} sm={18} md={18} lg={15} xl={12}>
                                     <Form.Item
                                         name="RentFee"
                                         label="服務費"
                                         rules={[
                                             {
                                                 required: true,
                                                 message: '請選擇其中一個',
                                             }
                                         ]}
                                         style={{width: '100%'}}
                                     >
                                         <Select size="large" allowClear id="RentFee" placeholder="服務費" options={RentFee}
                                                 onChange={(x) => {
                                                     console.log(x)
                                                 }} style={{
                                             width: '100%',
                                         }}>
                                         </Select>
                                     </Form.Item>
                                 </Col>
                             </Row>
                             <Row>
                                 <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                                 <Col xs={24} sm={18} md={18} lg={15} xl={12}>
                                     <Form.Item
                                         name="remark"
                                         label="備註"
                                         // rules={[
                                         //     {
                                         //         required: false,
                                         //         message: 'Please input your requirement!',
                                         //     },
                                         // ]}
                                     >
                                         <Input.TextArea rows={12}
                                                         autoSize={{minRows: 12, maxRows: 12}}
                                                         showCount
                                                         allowClear
                                                         maxLength={100}
                                         />
                                     </Form.Item>
                                 </Col>
                             </Row>
                             <Row>
                                 <Col xs={11} sm={11} md={11} lg={11} xl={11}> </Col>
                                 <Col xs={13} sm={13} md={13} lg={13} xl={13}>
                                     <Form.Item>
                                         <Row>
                                             {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                             {/*</Col>*/}
                                             <Col xs={24} sm={18} md={18} lg={15} xl={12}>
                                                 <Button type="primary" htmlType="submit" className='DevData-button'
                                                         shape="round">
                                                     資料提交
                                                 </Button>
                                                 &nbsp;&nbsp;
                                                 {editEnable ? [] : <Button type="primary"
                                                         className='DevData-button'
                                                         shape="round"
                                                         onClick={clearForm}
                                                 >
                                                     重新填寫
                                                 </Button>}
                                             </Col>
                                         </Row>
                                     </Form.Item>
                                 </Col>
                             </Row>
                         </div>
                         :
                         (DevStateIsSuccess === 0 || DevStateIsSuccess === 2)?
                            <div>
                                <Row>
                                    <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                                    <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                        <Form.Item
                                            name="remark"
                                            label="備註"
                                            // rules={[
                                            //     {
                                            //         required: false,
                                            //         message: 'Please input your requirement!',
                                            //     },
                                            // ]}
                                        >
                                            <Input.TextArea  rows={12}
                                                             autoSize={{minRows: 12,maxRows: 12}}
                                                             showCount
                                                             allowClear
                                                             maxLength={100}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={11} sm={11} md={11} lg={11} xl={11}> </Col>
                                    <Col xs={13} sm={13} md={13} lg={13} xl={13}>
                                        <Form.Item>
                                            <Row>
                                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                                {/*</Col>*/}
                                                <Col xs={24} sm={18} md={18} lg={15} xl={12}>
                                                    <Button type="primary" htmlType="submit" className='DevData-button'
                                                            shape="round">
                                                        資料提交
                                                    </Button>
                                                    &nbsp;&nbsp;
                                                    {editEnable ? [] : <Button type="primary"
                                                            className='DevData-button'
                                                            shape="round"
                                                            onClick={clearForm}
                                                    >
                                                        重新填寫
                                                    </Button>}
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>

                             : []}
                         </Form>
             </div>
                :
                     <div>
                         {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
                         {
                             isShowDeleteAlert?(
                                 <div style={{'position':'sticky' ,'top':'0px','zIndex':100 }}>
                                     <Alert
                                         afterClose={cancelRemoveDelList}
                                         type="error"
                                         action={
                                             <Space>
                                                 <Button size="small" type="ghost" onClick={deleteDevList}>
                                                     確定刪除
                                                 </Button>
                                                 <Button size="small" type="ghost" onClick={cancelRemoveDelList}>
                                                     取消刪除
                                                 </Button>
                                             </Space>

                                         }
                                         closable
                                     />
                                 </div>
                             ):null
                         }
                         <Row>
                             <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                             <Col  xs={24} sm={18} md={18} lg={15} xl={12}> </Col>
                             <Col xs={24} sm={3} md={3} lg={4} xl={6}>
                                 <div style={{float:'right'}}>
                                     <Button type="primary"
                                             onClick={() => {
                                                 backPage()
                                                 setDevListData([])
                                                 clearDevTempData()
                                             }}
                                             style={{width: '80px'}}>返回</Button>
                                 </div>
                             </Col>
                         </Row>
                         <Row>
                             <Col xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                             <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                 <Divider> 開發列表</Divider>
                             </Col>
                         </Row>
                         <Row>
                             <Col xs={0} sm={8} md={8} lg={8} xl={6}></Col>
                             <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                                 <Button 
                                     type="primary" 
                                     onClick={handleSearch} 
                                     style={{
                                         width: '100%',
                                         height: '40px',
                                         backgroundColor:'#008000'
                                     }}
                                 >
                                     搜尋
                                 </Button>
                             </Col>
                             <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                                 <Select 
                                     placeholder="排序:默認時間近到遠" 
                                     size={size}
                                     value={tempFilters.timeSort}
                                     onChange={(value) => {
                                         setTempFilters(prev => ({...prev, timeSort: value}));
                                     }}
                                     style={{
                                         width: '100%',
                                     }}
                                 >
                                     <Select.Option value="-1">時間近到遠</Select.Option>
                                     <Select.Option value="1">時間遠到近</Select.Option>
                                 </Select>
                             </Col>
                             <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                                 <Input 
                                     id="textQuery"
                                     placeholder="文字搜尋 : 名稱..."
                                     value={tempFilters.name}
                                     onChange={(e) => {
                                         setTempFilters(prev => ({...prev, name: e.target.value}));
                                     }}
                                     style={{
                                         width: '100%',
                                         height: '40px',
                                     }}
                                 />
                             </Col>
                             <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                         </Row>

                         <Row>
                             <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                             <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                                 <Select 
                                     id="citySelect" 
                                     placeholder="縣市" 
                                     size={size}
                                     value={tempFilters.city}
                                     options={CityOptions} 
                                     onChange={(value) => {
                                         setTempFilters(prev => ({...prev, city: value, area: undefined}));
                                         if (value) {
                                             changeCity(value);
                                         } else {
                                             setAreaOptions([]);
                                         }
                                     }}
                                     style={{
                                         width: '100%',
                                     }}
                                 />
                             </Col>
                             <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                                 <Select 
                                     id="area"
                                     value={tempFilters.area}
                                     placeholder="區域" 
                                     size={size}
                                     options={areaOptions} 
                                     onChange={(value) => {
                                         setTempFilters(prev => ({...prev, area: value}));
                                     }}
                                     style={{
                                         width: '100%',
                                     }}
                                 />
                             </Col>
                             <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                                 <Select 
                                     placeholder="狀態" 
                                     size={size}
                                     value={tempFilters.state}
                                     onChange={(value) => {
                                         setTempFilters(prev => ({...prev, state: value}));
                                     }}
                                     style={{
                                         width: '100%',
                                     }}
                                 >
                                     <Select.Option value="">狀態不限</Select.Option>
                                     <Select.Option value="1">開發中</Select.Option>
                                     <Select.Option value="2">成功</Select.Option>
                                     <Select.Option value="3">失敗</Select.Option>
                                 </Select>
                             </Col>
                             <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
                         </Row>
                         
                         <br></br><br></br><br></br>
                         
                         <Row>
                             <Col xs={24} sm={6} md={6} lg={6} xl={6}> </Col>
                             <Col xs={24} sm={16} md={18} lg={12} xl={12}>
                                 <Pagination
                                     total={DevDataList.length}
                                     // total={(parseInt(DevDataList.length/10)+1)*10}
                                     showSizeChanger={false}
                                     // showQuickJumper
                                     onChange={(x) => {
                                         console.log(x)
                                         setPage(x)
                                     }}
                                 />
                             </Col>
                         </Row>
                         <Row>
                             <Col  xs={24} sm={3} md={3} lg={4} xl={6}> </Col>
                             <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                 <Collapse accordion onChange={(key) => {
                                     console.log(key)
                                     devTempData.key = key
                                     tempDataSetup(key)
                                 }}>
                                     {DevDataList.slice(0+(page-1)*20, 20+(page-1)*20).map((data, index) => (

                                         <Panel header={'【'+(index+1+(page-1)*20)+'】- '+ `${data.name}`} key={index}>
                                             <div>
                                                 <Descriptions  bordered>
                                                     <Descriptions.Item label="名稱" span={3}>{data.name }</Descriptions.Item>
                                                     <Descriptions.Item label="城市" span={3}>{data.address.slice(0, 3)}</Descriptions.Item>
                                                     <Descriptions.Item label="區域" span={3}>{data.address.slice(3, 6)}</Descriptions.Item>
                                                     <Descriptions.Item label="地址" span={3}>{data.address}</Descriptions.Item>
                                                     <Descriptions.Item label="負責人" span={3}>{data.owner }</Descriptions.Item>
                                                     <Descriptions.Item label="屋主" span={3}>{data.hostName+`${data.hostGender? ' 先生' : ' 小姐'}`}</Descriptions.Item>
                                                     <Descriptions.Item label="電話" span={3}>{data.hostPhone}</Descriptions.Item>
                                                     <Descriptions.Item label="案源" span={3}>{data.source}</Descriptions.Item>
                                                     <Descriptions.Item label="備註" span={3}>{data.remark}</Descriptions.Item>
                                                     <Descriptions.Item label="狀態" span={3}>{stateCheck(data.state)}</Descriptions.Item>
                                                     <Descriptions.Item label="創建時間" span={3}>{new Date(Date.parse(data.createTime)).toLocaleDateString()}</Descriptions.Item>
                                                     <Descriptions.Item label="更新時間" span={3}>{new Date(Date.parse(data.updateTime)).toLocaleDateString()}</Descriptions.Item>
                                                     {data.state === '2' ? <Descriptions.Item label="服務費" span={3}>{data.serviceCharge}</Descriptions.Item> : []}
                                                 </Descriptions>
                                                 <br/>
                                                 <Button
                                                     style={{width: '70px',
                                                         color: companyData.owner === data.owner && !isShowDeleteAlert ?'#FFFFFF':'',
                                                         backgroundColor:companyData.owner === data.owner && !isShowDeleteAlert ?'#1E90FF':'',
                                                         borderColor:companyData.owner === data.owner && !isShowDeleteAlert ?'#1E90FF':'',
                                                         // display: data.applyRetry ?  null : 'none'
                                                     }}
                                                     disabled={companyData.owner !== data.owner || isShowDeleteAlert}
                                                     onClick={() => {
                                                         setEditInitValue()
                                                         setDevStateIsSuccess(devListData[devTempData.key].state-1)
                                                         setEditEnable(true)
                                                         setSwitchPage(1)
                                                         setDevListKey(index)
                                                     }}
                                                 >
                                                     編輯
                                                 </Button>
                                                 &nbsp;&nbsp;&nbsp;
                                                 <Button style={{width: '70px',
                                                     backgroundColor: companyData.owner === data.owner && !isShowDeleteAlert ?'#FF0000':'',
                                                     borderColor: companyData.owner === data.owner && !isShowDeleteAlert ?'#FF0000':'',
                                                     color:companyData.owner === data.owner && !isShowDeleteAlert?'#FFFFFF':'',
                                                     // display: data.applyRetry? 'none' : (data.submitDel? null : 'none')
                                                 }}
                                                         disabled={companyData.owner !== data.owner || isShowDeleteAlert}
                                                         onClick={() => {
                                                             setDevListKey(index)
                                                             setIsShowDeleteAlert(true)
                                                         }}>
                                                     刪除
                                                 </Button>
                                             </div>
                                         </Panel>
                                     ))}
                                 </Collapse>
                             </Col>
                             <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                         </Row>
                         <Row>
                             <Col xs={24} sm={6} md={6} lg={6} xl={6}> </Col>
                             <Col xs={24} sm={16} md={18} lg={12} xl={12}>
                                 <div style={{textAlign:'end'}}>
                                     <Pagination
                                         total={DevDataList.length}
                                         // total={(parseInt(DevDataList.length/10)+1)*10}
                                         showSizeChanger={false}
                                         // showQuickJumper
                                         onChange={(x) => {
                                             console.log(x)
                                             setPage(x)
                                         }}
                                     />
                                 </div>

                             </Col>
                         </Row>

                     </div>

    );
};

export default CompanyDevelopManage;