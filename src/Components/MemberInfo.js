import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {LoginRegisterAxios, UserAxios} from './axiosApi'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'
const userListUrl = 'user/getPersonalInfo'
const editUserUrl = 'user/editUser'
const SendResetPassword_Auth = '/auth/sendResetPasswordMail/'

const MemberInfo = (props) => {

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

    const dateFormat = 'YYYY/MM/DD';
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({});
    const [isEdit, seIsEdit] = useState(false);
    const [roles, setRoles] = useState([]);
    const [salesLicense, setSalesLicense] = useState('');
    const [salesScopeCity, setSalesScopeCity] = useState('');
    const [salesScopeArea, setSalesScopeArea] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);
    const [gender, setGender] = useState([]);
    const [isShowExtraData, setIsShowExtraData] = useState(false);
    const [editUser, setEditUser] = useState({});
    const [editDate, setEditDate] = useState(moment('2022-01-01', dateFormat));
    const [EnableResetPW, setEnableResetPW] = useState(false);
    const [borderColorIsGrey, setBorderColorIsGrey] = useState(true)
    const [isPhoneBlank, setIsPhoneBlank] = useState(false)
    const xToken = cookie.load('x-token')
    const LicensePattern = /[0-9]{2,3}[\u4e00-\u9fa5]{3,4}[0-9]{6}[\u4e00-\u9fa5]/

    const onAreaInCharge = (value) => {
        const editUserValue = editUser
        let editScope = [];
        if(salesScopeArea.length<2){
            setSalesScopeArea(value)
            editScope = value
        }else{
            let area = []
            if(value[0]){
                area.push(value[0])
            }
            if(value[2]){
                area.push(value[2])
            }
            editScope = area
            setSalesScopeArea(area)
        }
        if(!editUserValue.rolesInfo.sales){
            editUserValue.rolesInfo.sales = {
                scope : []
            }
        }else{
            editUserValue.rolesInfo.sales.scope = []
        }
        for(let i = 0 ;i<editScope.length; i++){
            editUserValue.rolesInfo.sales.scope.push(
                {
                    city : salesScopeCity,
                    area : editScope[i]
                } 
            )
        }
        setEditUser(editUserValue)
    }

    const onCityInCharge = (City) => {
        setSalesScopeCity(City)
        setAreaOptions([])
        setSalesScopeArea([])

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


    useEffect(() => {
        if (init) {
            setInit(false)
            getPersonalInfo()
            
        }
    }, )
const getPersonalInfo = () => {
    let reqUrl = `${userListUrl}`
    UserAxios.get(
        reqUrl,{
            headers:{
                'x-token':xToken
            }
        }
    )
    .then( (response) => {
        if(response.data.data.bornDate === undefined || response.data.data.bornDate === null ){
            response.data.data.bornDate = ''
        }
        setUser(response.data.data)
        setData(response.data.data)
    })
    .catch( (error) => {
        showInternelErrorPageForMobile()
        toast.error(error)
    })
}

function setData(data){
    setIsShowExtraData(false)
    setRolesAction(data.roles)
    setGender(data.gender)
    const extraDivAll = document.getElementById('extraDivAll')
    extraDivAll.style.display = 'none'
    for(let i = 0 ;i<data.roles.length;i++){
        if(data.roles[i] === 4){
            setIsShowExtraData(true)
            i = data.roles.length
            extraDivAll.style.display = ''
        }
    }

    if(data.rolesInfo.sales){
        if(data.rolesInfo.sales){
            if(data.rolesInfo.sales.license){
                setSalesLicense(data.rolesInfo.sales.license)
            }
            if(data.rolesInfo.sales.scope){
                let scopeCity = ''
                let scopeArea = []
                for(let i = 0 ;i<data.rolesInfo.sales.scope.length;i++){
                    if(i === 0){
                        scopeCity = data.rolesInfo.sales.scope[i].city 
                    }
                    scopeArea.push(data.rolesInfo.sales.scope[i].area) ;
                }
                onCityInCharge(scopeCity)
                setSalesScopeCity(scopeCity)
                setSalesScopeArea(scopeArea)
            }
        }
    }
    if(data.bornDate !==null && data.bornDate !==undefined && data.bornDate !==''){
        setEditDate(moment(data.bornDate, dateFormat));
    }
    
}

function setRolesAction(data){
    const result = []
    for(let i = 0;i<data.length;i++){
        if(data[i] === 2 ||data[i] === 3 ||data[i] === 4 ){
            result.push(''+data[i])
        }
        
    }
    setRoles(result)
}

function changeRoles(e){
    setRoles(e)
    const value = []
    let showExtra = false
    const roles = user.roles
    for(let i = 0 ;i<roles.length; i++){
        if(roles[i] === 1){
            value.push(1)
        }
    }

    for(let i = 0 ;i<e.length; i++){
        value.push(e[i]*1)
        if(e[i] == '4'){
            showExtra = true
        }
    }

    setIsShowExtraData(showExtra)

    if(showExtra){
        const extraDivAll = document.getElementById('extraDivAll')
        extraDivAll.style.display = ''
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = '320px'
    }else{
        const extraDivAll = document.getElementById('extraDivAll')
        extraDivAll.style.display = 'none'
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = ''
    }

    const editUserValue = editUser
    editUserValue.roles = value
    setEditUser(editUserValue)

}

function changeGender(e){
    const value = e.target.value
    const editUserValue = editUser
    editUserValue.gender = value
    setGender(value)
    setEditUser(editUserValue)

}
function edit(){
    const baseDiv = document.getElementById('baseDiv')
    baseDiv.style.width = '320px'
    if(isShowExtraData){
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = '320px'
    }
    seIsEdit(true)
    setEditUser(JSON.parse(JSON.stringify(user)))
}

function cancelEdit(){
    const baseDiv = document.getElementById('baseDiv')
    baseDiv.style.width = null
    if(isShowExtraData){
        const extraDiv = document.getElementById('extraDiv')
        extraDiv.style.width = null
    }
    seIsEdit(false)
    setData(user)
    setEditUser({})
}

function editIsSales(){
    let result = false
    for(let i = 0 ;i<editUser.roles.length;i++){
        if(editUser.roles[i] === 4){
            result = true;
        }
    }
    return result
}

function sendEdit(){
    editUser.id = user._id
    let isOkLicense = true
    let isOkPhone = true
    let LicenseNull = true
    let isOkPassword = false
    let isSales = editIsSales()
    let isOkSalesScopeCount = true
    if(isSales && editUser.rolesInfo.sales && editUser.rolesInfo.sales.license.length > 0){
        if (LicensePattern.test(editUser.rolesInfo.sales.license)  ) {
            isOkLicense = true
        }else{
            isOkLicense = false
        }
    } else {
        LicenseNull = false
    }

    if(isSales && (editUser.rolesInfo.sales.scope.length < 2 || salesScopeArea.length < 2)){
        isOkSalesScopeCount = false
    }

    if(editUser.password !==''&&editUser.password !==null&&editUser.password !==undefined){
        isOkPassword = true
    }

    if(editUser.phone.length < 10) {
        isOkPhone=false
        toast.error('手機號碼不足10位數')
    }

    if(LicenseNull === true && isOkLicense === true && isOkPassword === true && isOkSalesScopeCount === true && isOkPhone === true){
    let reqUrl = `${editUserUrl}`
    UserAxios.put(
        reqUrl,editUser,{
            headers:{
                'x-token':xToken
            }
        }
    )
    .then( (response) => {
        if(response.data.status === true){
            console.log(response.data)
            setUser(editUser)
            setData(editUser)
            seIsEdit(false)
            const token = response.data.data.token
            // const roles = response.data.data.roles
            // props.changeRolesMenu(roles)
            props.changeUserMenu(xToken)
            cookie.save('x-token',token,{path:'/'})
            toast.success('編輯成功');
            const baseDiv = document.getElementById('baseDiv')
            baseDiv.style.width = null
            if(isShowExtraData){
                const extraDiv = document.getElementById('extraDiv')
                extraDiv.style.width = null
            }
        }else{
            toast.error(response.data.data)
        }
    })
    .catch( (error) => {
        showInternelErrorPageForMobile()
        toast.error(error)
    })
    }
    if(isOkLicense === false){
        toast.error('請輸入正確的營業員證號格式');
    }

    if(LicenseNull === false){
        toast.error('營業員證號不能為空');
    }

    if(isOkPassword === false){
        toast.error('密碼不能為空');
    }

    if(isOkSalesScopeCount === false){
        toast.error('經營地區必須2個');
    }
}

function editName(e){
    const editUserValue = editUser
    editUserValue.name = e.target.value
    setEditUser(editUserValue)
}

function editPassword(e){
    const editUserValue = editUser
    editUserValue.password = e.target.value
    setEditUser(editUserValue)
}

function editAddress(e){
    const editUserValue = editUser
    editUserValue.address = e.target.value
    setEditUser(editUserValue)
}

function editPhone(e){
    const editUserValue = editUser
    let pattern=/[a-zA-Z+_()*&^%$#@!]/
    console.log(e.target.value.length, !pattern.test(e.target.value))
    if(e.target.value.length > 0) {
        setIsPhoneBlank(false)
        setBorderColorIsGrey(true)
        if(!pattern.test(e.target.value)) {
            setBorderColorIsGrey(true)
            if(e.target.value[0] !== '0') {
                setBorderColorIsGrey(false)
            }else {
                setBorderColorIsGrey(true)
                if(e.target.value.length > 1 && e.target.value.substring(0, 2) !== '09') {
                    setBorderColorIsGrey(false)
                } else {
                    setBorderColorIsGrey(true)
                }
            }
        } else {
            setBorderColorIsGrey(false)
        }
    } else {
        setBorderColorIsGrey(false)
        setIsPhoneBlank(true)
    }

    editUserValue.phone = e.target.value.substring(0, 4) + e.target.value.substring(4, 7) + e.target.value.substring(7, 10)
    setEditUser(editUserValue)
}

function editLineId(e){
    const editUserValue = editUser
    editUserValue.lineId = e.target.value
    setEditUser(editUserValue)
}

function editLicense(e){
    const editUserValue = editUser
    if(editUserValue.rolesInfo.sales){
        editUserValue.rolesInfo.sales.license = e.target.value
        setEditUser(editUserValue)
    }
}

function changeDate(e, dateString){
    setEditDate(moment(dateString, dateFormat));
    const editUserValue = editUser
    editUserValue.bornDate = dateString
    setEditUser(editUserValue)
}

    const ResetPW = () => {
        setEnableResetPW(true);
    }

    useEffect(() => {
        if (EnableResetPW) {
        LoginRegisterAxios.get(SendResetPassword_Auth+'?accountOrMail='+user.account, {
            headers: {
                "accept": "application/json",
            }
        })
            .then( (response) =>  {
                console.log(response)
                if(response.data.status) {
                    toast.success('請至郵件信箱進行重置密碼的設定')
                }else {
                    toast.error(`${response.data.data}`)
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })

            setEnableResetPW(false)
        }
    }, [EnableResetPW])

const checkRoleInCompany = () => {
        let temp = roles
    if(user.employeesData.length > 0 && user.roles.includes(4)) {
        toast.error('此帳戶已有加入公司，無法更改房仲身分。')
        temp.push('4')
        setRoles(temp)
        cancelEdit()
    }
}

    return (

        <div>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
            <div Style='float:right'>
            {isEdit?(
                    <div>
                    <Button type="primary" onClick={() => sendEdit()} style={{width: '70px',backgroundColor : '#00cc00' }}>
                        提交
                    </Button>
                    &nbsp; 
                    <Button type="primary" onClick={() => cancelEdit()} danger style={{width: '70px'}}>
                        取消
                    </Button>
                    </div>
                    ): <Button type="primary" onClick={() => edit()} style={{width: '70px',backgroundColor : '#00cc00' }}>
                        編輯
                    </Button>
}
                </div>
            <br/><br/>
            <Divider>基本資料</Divider>
            <Row>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}></Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}style={{
                            textAlign: 'center',
                }}>

                    <Checkbox.Group value={roles} onChange={changeRoles}>
                    {
                        isEdit?( <Checkbox value='2'>屋主</Checkbox>): <Checkbox disabled value='2'>屋主</Checkbox>
                    }
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    {
                        isEdit?( <Checkbox  value='3'>一般會員</Checkbox>): <Checkbox disabled value='3'>一般會員</Checkbox>
                    }
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    {
                        isEdit?( <Checkbox value='4' onChange={checkRoleInCompany}>房仲</Checkbox>): <Checkbox disabled value='4'>房仲</Checkbox>
                    }
                    </Checkbox.Group>
                    
                </Col>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}></Col>  
            </Row>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                            
                }}>
                <br/>
                <div id='baseDiv' style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    帳號:&nbsp;{user.account}<br/><br/>
                    {isEdit?( 
                        <div >
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                <div style={{                
                                    'display': 'inline-block',
                                    'textAlign': 'left',
                                }}>
                                    姓名:
                                </div>                                
                            </Col>
                            <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                <Input onChange={editName} style={{ width: '100%' }} defaultValue={user.name}></Input>
                            </Col>
                        </Row>
                        </div>): 
                        <div>姓名:&nbsp;{user.name}</div> }
                    <br/>
                    {isEdit?( 
                        <div >
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                <div style={{                
                                    'display': 'inline-block',
                                    'textAlign': 'left',
                                }}>
                                    密碼:
                                </div>                                
                            </Col>
                            <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                {/*<Input onChange={editPassword} style={{ width: '100%' }} defaultValue={user.password} disabled></Input>*/}
                                <Input onChange={editPassword} style={{ width: '100%' }} defaultValue={'******'} disabled></Input>
                            </Col>
                        </Row>
                            <Row>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>

                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <Button onClick={ResetPW} type='primary'>重置密碼</Button>
                                </Col>
                            </Row>

                        </div>): 
                        <div>密碼:&nbsp;******</div> }
                    <br/>
                    性別:
                    &nbsp; &nbsp;
                    <Radio.Group  value={gender} onChange={changeGender}>
                        {
                            isEdit?( <Radio value={true}>男</Radio>): <Radio disabled value={true}>男</Radio>
                        }
                        {
                            isEdit?( <Radio value={false}>女</Radio>): <Radio disabled value={false}>女</Radio>
                        }
                        
                    </Radio.Group>
                    <br/><br/>
                    {isEdit?( 
                    <div >
                    <Row>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <div style={{                
                                'display': 'inline-block',
                                'textAlign': 'left',
                            }}>
                                生日:
                            </div>                                
                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                        <DatePicker onChange={changeDate} defaultValue={editDate} format={dateFormat}/>
                        </Col>
                    </Row>
                    </div>): 
                    <div>生日:&nbsp;{user.bornDate}</div> }

                    <br/>
                    {isEdit?( 
                    <div >
                    <Row>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <div style={{                
                                'display': 'inline-block',
                                'textAlign': 'left',
                            }}>
                                地址:
                            </div>                                
                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <Input onChange={editAddress} style={{ width: '100%' }} defaultValue={user.address}></Input>
                        </Col>
                    </Row>
                    </div>): 
                    <div>地址:&nbsp;{user.address}</div> }
                    <br/>
                    <div>信箱:&nbsp;{user.mail}</div> 
                    <br/>
                    {isEdit?(
                            <div >
                                <Row>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                        <div style={{
                                            'display': 'inline-block',
                                            'textAlign': 'left',
                                        }}>
                                            LineID:
                                        </div>
                                    </Col>
                                    <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                        <Input onChange={editLineId} style={{ width: '100%' }} defaultValue={user.lineId}></Input>
                                    </Col>
                                </Row>
                            </div>):
                        <div>LineID:&nbsp;{user.lineId}</div> }
                    <br/>
                    {isEdit?(
                         <div >
                         <Row>
                             <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                                 <div style={{                
                                     'display': 'inline-block',
                                     'textAlign': 'left',
                                 }}>
                                     電話:
                                 </div>                                
                             </Col>
                             <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                                 <div>
                                     <Input onChange={editPhone}
                                            placeholder='ex:0912345678'
                                            maxLength={10}
                                            style={{ width: '100%', borderColor: borderColorIsGrey?null:'red' }}
                                            defaultValue={user.phone}>
                                     </Input>
                                     {isPhoneBlank ? <span style={{color:'red'}}>此欄位不能為空白</span> : borderColorIsGrey ? null: <p style={{color:'red'}}>手機電話格式（09）不對，請重新填寫</p>}
                                 </div>

                             </Col>
                         </Row>
                         </div>): 
                         <div>電話:&nbsp;{user.phone}</div> }
                    <br/>
                    註冊時間:&nbsp;{new Date(user.createTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}
                    <br/><br/>
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            <div id='extraDivAll' style={{
                display :'none',
                textAlign: 'center',
                width: '100%'
            }}>
            <Divider>房仲資料</Divider>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                }}>
                <br/>
                <div id='extraDiv' style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                   'width' :'320px'
                  }}>
                    {isEdit?( 
                        <div >
                        <Row>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <div style={{                
                                    'display': 'inline-block',
                                    'textAlign': 'left',
                                }}>
                                    營業員証號:
                                </div>                                
                            </Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                <Input onChange={editLicense} style={{ width: '100%' }} maxLength={14} defaultValue={salesLicense}></Input>
                            </Col>
                        </Row>
                        </div>): 
                        <div style={{ width: '100%' }}>營業員証號:&nbsp;{salesLicense}</div> }
                    <br/>
                    <div style={{ width: '100%' }}>經營地區:</div> 
                    <Row>
                    
                        <Select size="large"
                                                        disabled={!isEdit}
                                                        value={salesScopeCity}
                                                        id="citySelect"
                                                        placeholder="縣市"
                                                        options={CityOptions}
                                                        onChange={onCityInCharge}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                >
                        </Select>
                        {salesScopeCity.length < 1 && <p style={{color:'red'}}>此欄位不能空</p>}     

                        <Select mode="multiple"
                                                        disabled={!isEdit}
                                                        size="large"
                                                        id="area"
                                                        value={salesScopeArea}
                                                        allowClear
                                                        placeholder="區域"
                                                        options={areaOptions}
                                                        onChange={onAreaInCharge}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                >
                        </Select>
                        {salesScopeArea.length<1 && <p style={{color:'red'}}>此欄位不能空</p>}
                    </Row>
                    </div>
                
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>
            </div>
            
        </div>
    );
};

export default MemberInfo;
