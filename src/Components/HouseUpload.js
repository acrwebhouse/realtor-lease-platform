import React, {useEffect, useState} from 'react';
import {
    Form,
    Button,
    Modal,
    Input,
    InputNumber,
    Select,
    Divider,
    Row,
    Col,
    Checkbox,
    Upload,
    List,
    Image
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseAxios, PicAnnexAxios} from './axiosApi'
import { DeleteOutlined} from '@ant-design/icons';
import cookie from 'react-cookies'
import {config} from '../Setting/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    AirConditionerIcon,
    BedIcon, CigaretteIcon,
    ClosetIcon, CookIcon, DeskAndChairIcon, ElevatorIcon, GarbageFeeIcon, ManageFeeIcon, NaturalGasIcon,
    NetworkIcon, ParkingIcon, PetsIcon,
    RefrigeratorIcon, SofaIcon,
    TelevisionIcon, TvProgramIcon,
    WashMachineIcon, WaterHeaterIcon
} from "./Equipment";
import {showInternelErrorPageForMobile,horizontalScrollDisabled} from './CommonUtil'
import {getPersonalInfo,xTokenName} from './Auth'
// const AddressPattern = /^[\u4e00-\u9fa5]+$/
// const DoorNumberPattern = /^[0-9]*$/
// const SecondRoomNumberPattern = /^[A-Za-z0-9]+$/

const houseService = config.base_URL_House
const { Option } = Select;
const { TextArea } = Input;

const fallback ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='

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

const FloorOptions = [{value: '頂樓加蓋'},{value: '地下三樓'},{value: '地下二樓'},{value: '地下一樓'}]
for (let i = 1; i < 100; i++) {
    FloorOptions.push({
        value: i + '樓'
    });
}
console.log(FloorOptions[0])

const defaultExtraRequire = [];
const defaultEquipment = [];
let PicData = [];
let showPic = [];
let AnnexData = [];
let showAnnex = []
const TrafficArr = [];
const buildingType = ['公寓', '電梯大樓', '透天', '辦公室', '店面']
const RentalType = ['整層住家', '獨立套房', '分租套房', '雅房']
const Traffic_Type = ['捷運站', '公車/客運', '火車站', '高鐵站', '機場'];
const LifeArr = [];
const Life_Type = ['夜市', '科學圓區', '計畫區', '重劃區', '傳統商圈'];
const EducationArr = [];
const Edu_Type = ['幼稚園', '小學', '國中', '高中/高職', '大學/科大']
const House_Pic_Auth = 'house/uploadHousePhoto/'
const House_Annex_Auth = 'house/uploadHouseAnnex/'
const House_Auth = 'house/addHouse/'
const Edit_House_Auth = 'house/editHouse'
const photoType = ['image/png', 'image/heic', 'image/jpeg', 'image/jpg', 'image/bmp']
const annexType = ['application/pdf', 'image/png', 'image/svg+xml', 'image/jpeg', 'image/jpg', 'image/bmp']
const PicTemp = []
const firstPicTemp = []
const AnnexTemp = []
const hostGenderArr=['小姐', '先生']
const equipData = {0: 'airConditioner', 1: 'refrigerator', 2: 'television', 3: 'washMachine', 4: 'bed', 5: 'closet', 6: 'tvProgram', 7: 'network', 8: 'waterHeater', 9: 'naturalGas', 10: 'sofa', 11: 'deskAndChair', 12: 'elevator'}
let equipArr = [false, false, false, false, false, false, false, false, false, false, false, false, false]
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const convertString = (word) =>{
    switch(word.toLowerCase().trim()){
        case "yes": case "true": case "1": return true;
        case "no": case "false": case "0": case null: return false;
        default: return Boolean(word);
    }
}

const FloorCheck = (FloorValue, remark) => {
    if (remark === null) {
        if(FloorValue < 0) {
            return FloorValue + 4
        } else {
            return FloorValue + 3
        }
    } else {
        if (remark.indexOf('頂樓加蓋，') === 0){
            return '0'
        } else if(FloorValue < 0) {
            return FloorValue + 4
        } else {
            return FloorValue + 3
        }
    }

}

const HouseUpload = (prop) => {
    const xToken = cookie.load(xTokenName)
    const [user, setUser] = useState({});
    console.log(prop.defaultValue)
    const PicPreURL = prop.defaultValue? houseService+'/resource/'+prop.defaultValue._id+'/photo/' : []
    console.log(PicPreURL)
    const [form] = Form.useForm();
    const [form_photo] = Form.useForm();
    const [form_firstPhoto] = Form.useForm();
    const [form_annex] = Form.useForm();
    const [form_traffic] = Form.useForm();
    const [form_life] = Form.useForm();
    const [form_edu] = Form.useForm();
    const [extraRequire, setExtraRequire] = useState(defaultExtraRequire);
    const [equipment, setEquipment] = useState(defaultEquipment)
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
    const [delPic, setDelPic] = useState(false);
    const [delAnnex, setDelAnnex] = useState(false)
    const [PictureList, setPictureList] = useState([]);
    const [AnnexEnable, setAnnexEnable] = useState(false);
    const [FormDataEnable, setFormDataEnable] = useState(false);
    console.log(FormDataEnable)
    const [AnnexList, setAnnexList] = useState([]);
    const [PicUploading, setPicUploading] = useState(false);
    const [AnnexUploading, setAnnexUploading] = useState(false);
    const [HouseData, setHouseData] = useState({});
    const [photoData, setPhotoData] = useState([]);
    const [annexData, setAnnexData] = useState([]);
    const [isRunPost, setIsRunPost] = useState(false)
    const [photoCount, setPhotoCount] = useState(0)
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [PicUploadCheck, setPicUploadCheck] = useState(false)
    const [hostPhone, setHostPhone] = useState(prop.defaultValue?prop.defaultValue.hostPhone:'')
    const [enableFirstPicChange, setEnableFirstPicChange] = useState(false)
    const [firstPicFile, setFirstPicFile] = useState([])
    const [firstPhotoData, setFirstPhotoData] = useState([])
    const [totalLayer, setTotalLayer] = useState(0)
    console.log(totalLayer)
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



    console.log(PicData)
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
        if (delPic) {
            setDelPic(false)
        }
        if (delAnnex) {
            setDelAnnex(false)
        }
        
        getPersonalInfo(xToken).then( (userResponse) => {
            if(userResponse.data.data !== undefined){
                const userData = userResponse.data.data
                setUser(userData)
            }
        })
        .catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }, [delTraffic, delLife, delEdu, delPic, delAnnex])

    console.log(TrafficArr)
    useEffect(()=>{
        const temp = [];
        const equipTemp = [];
        if(prop.defaultValue && prop.defaultValue.traffic) {
            prop.defaultValue.traffic.map(x => TrafficArr.push(x))
        }
        if(prop.defaultValue && prop.defaultValue.life) {
            prop.defaultValue.life.map(x => LifeArr.push(x))
        }
        if(prop.defaultValue && prop.defaultValue.educate) {
            prop.defaultValue.educate.map(x => EducationArr.push(x))
        }

        if(prop.defaultValue && prop.defaultValue.photo) {
            prop.defaultValue.photo.map(x => PicData.push(x))
            prop.defaultValue.photo.map(x => showPic.push(x))
        }

        if(prop.defaultValue && prop.defaultValue.annex) {
            prop.defaultValue.annex.map(x => AnnexData.push(x))
            prop.defaultValue.annex.map(x => showAnnex.push(x))
        }

        if(prop.defaultValue) {
            setAnnexEnable(true)
            setFormDataEnable(true)
            // setPicUploading(true)
            // setPictureList(prop.defaultValue.photo)
            if(prop.defaultValue.saleInfo.pet){
                temp.push('pet')
                // console.log(temp)
            }
            if(prop.defaultValue.saleInfo.manager){
                temp.push('manager')
                setShowHideManageFee(true)
                // console.log(temp)
            }
            if(prop.defaultValue.saleInfo.garbage){
                temp.push('garbage')
                setShowHideGarbageFee(true)
                // console.log(temp)
            }
            if(prop.defaultValue.saleInfo.smoke){
                temp.push('smoke')
                // console.log(temp)
            }
            if(prop.defaultValue.saleInfo.cook){
                temp.push('cook')
                // console.log(temp)
            }
            if(prop.defaultValue.parking){
                temp.push('parking')
                // console.log(temp)
            }
            if(prop.defaultValue.saleInfo.devices) {
                for (let i = 0; i < prop.defaultValue.saleInfo.devices.length; i++) {
                    if (prop.defaultValue.saleInfo.devices[i]) {
                        equipTemp.push(equipData[i])
                    }
                }
            }
        }

        console.log(temp)
        setExtraRequire(temp)
        setEquipment(equipTemp)
    },[prop.defaultValue])

    useEffect(() => {
        // console.log(RegisterData)
        // console.log(CityAreaScope)

        if (isRunPost) {
            prop.defaultValue ?
                HouseAxios.put(Edit_House_Auth, Object.assign(HouseData, {'id': prop.defaultValue._id, 'owner': prop.defaultValue.owner, 'belongType': prop.defaultValue.belongType, 'belongId': prop.defaultValue.belongId}), {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        "x-token" : xToken,
                    }})
                    // .then( (response) => console.log(response.data.status))
                    .then((response) => {
                        console.log(response)
                        if (response.data.status === true) {
                            toast.success(`房屋資料更新成功`);
                            setTimeout(() => {
                                window.location.replace(window.location.origin + '/HouseDetailOwner/' + prop.defaultValue._id + '/' + prop.defaultValue.owner)
                            }, 2000)

                        } else if(!response.data.status && response.data.data.errorMessage.includes('house address is exist')){
                            toast.error(`房屋地址重複，房屋資料更新失敗。`);
                        }else {
                            toast.error(`房屋資料更新失敗`);
                        }

                    })
                    .catch( (error) => {
                        showInternelErrorPageForMobile()
                        toast.error(error)
                    })     
                :
                HouseAxios.post(House_Auth, HouseData, {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        "x-token" : xToken,
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        if(response.data.status) {
                            toast.success(`房屋資料上傳成功`);
                            form_photo.resetFields()
                            form_annex.resetFields()
                            form_firstPhoto.resetFields()
                            form.resetFields()
                            setHostPhone('')
                            PicTemp.splice(0, PicTemp.length)
                            AnnexTemp.splice(0, AnnexTemp.length)
                            TrafficArr.splice(0,  TrafficArr.length)
                            LifeArr.splice(0,  LifeArr.length)
                            EducationArr.splice(0, EducationArr.length)
                            PicData.splice(0, PicData.length)
                            AnnexData.splice(0, AnnexData.length)
                            setPhotoCount(0)
                        }else if(!response.data.status && response.data.data.errorMessage.includes('house address is exist')){
                            toast.error(`此房屋物件已存在，如有疑慮請聯繫該房仲。 ${response.data.data.errorInfo.name}  ${response.data.data.errorInfo.phone}。`);
                            setPhotoCount(1)
                        }

                    })
                    .catch( (error) => {
                        showInternelErrorPageForMobile()
                        toast.error(error)
                    })

            setIsRunPost(false)
        }
    }, [isRunPost, HouseData, prop.defaultValue, xToken])

    const UploadHouseData = (values) => {
        console.log('Received values of form: ', values);
        setHouseData(
            {
                'name' : values['name'],
                'city' : values['City'],
                'area' : values['Area'],
                'owner' : user._id,
                'address': values['City']+values['Area']+values['address'],
                'houseNumber' : {
                    'lane' : values['lane']  ? parseInt(values['lane']) : '',
                    'alley' : values['alley']  ? parseInt(values['alley']) : '',
                    'number1' : parseInt(values['NO1']),
                    'number2' : values['NO2']  ? parseInt(values['NO2']) : '',
                },
                'totalFloor' : parseInt(values['totalFloor']),
                'floor' : FloorOptions.findIndex(x => x.value === values['floorNo1']) ?     // index 0 => '頂樓加蓋' ， 1 => '地下三樓' ， 2 => '地下二樓'
                    FloorOptions.findIndex(x => x.value === values['floorNo1']) < 4 ?       //  3 => '地下一樓' ， 4 => '1樓' and so on。
                        FloorOptions.findIndex(x => x.value === values['floorNo1']) - 4     // index 0 => totalFloor , index 1 ~ 3 => index - 4, index 4 ~ 99 => index -3
                        : FloorOptions.findIndex(x => x.value === values['floorNo1']) - 3
                    : parseInt(values['totalFloor']),
                'floor2' : values['floorNo2'] ? parseInt(values['floorNo2']) : '',
                'isRoofAnnex' : !FloorOptions.findIndex(x => x.value === values['floorNo1']), // index 0 => '頂樓加蓋' => !0 == true
                // 'room' :  values['room-number'] ? parseInt(values['room-number']) : '' ,
                'room' :  values['room-number'] ,
                'price' : parseInt(values['lease-price']),
                'hostName': values['hostName'],
                'hostGender': convertString(String(hostGenderArr.indexOf(values['hostGender']))),
                'hostPhone': values['hostPhone'],
                'config' : {
                    'room' : parseInt(values['room']),
                    'livingRoom' : (typeof(values['livingRoom']) === 'number') ? parseInt(values['livingRoom']) : 0,
                    'balcony' : (typeof(values['balcony']) === 'number') ? parseInt(values['balcony']) : 0,
                    'bathroom' : parseInt(values['bathroom']),
                    "buildingType" : buildingType.indexOf(values['TypeOfBuild']) + 1
                },
                'ping' : values['ping'],
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
                    "typeOfRental": RentalType.indexOf(values['TypeOfRental']) + 1,
                    "devices": prop.defaultValue ? prop.defaultValue.saleInfo.devices : equipArr
                },
                'photo' : prop.defaultValue ? PicData : photoData, // PicData have defaultData, photoData new Upload
                'annex' : prop.defaultValue ? AnnexData : annexData, // AnnexData have defaultData, annexData new Upload
                'remark' : FloorOptions.findIndex(x => x.value === values['floorNo1']) ? values['remark'] : '頂樓加蓋，' + values['remark'],
                "belongType": prop.companyState === 2 || prop.companyState === 4 ? 2 : 1,
                "belongId": prop.companyState === 2 || prop.companyState === 4 ? prop.companyId : user._id
            }
        )
        if(values['hostPhone'].slice(0, 2) !== '09' || values['hostPhone'].length < 10  ) {
            // setIsSubmitModalVisible(false)
            errorPhoneFormat();
        } else {
            if (showPic.length+PictureList.length < 1 && photoCount === 0) {
                toast.warning(`照片至少上傳一張`)
            }else {
                if(!PicUploadCheck && !prop.defaultValue) {
                    toast.warning(`請記得按下提交照片`)
                } else {
                    setIsRunPost(true)

                    if (!prop.defaultValue) {
                        setAnnexEnable(false)
                        setFormDataEnable(false)
                        setPictureList([])
                        setAnnexList([])
                        setExtraRequire([])
                        setShowHideManageFee(false)
                        setShowHideGarbageFee(false)
                        setEquipment([])
                    }
                }
            }
        }

        console.log(TrafficArr);
        // console.log(photoData)


        // window.location.replace(window.location.origin+'/HouseDetailOwner/'+prop.defaultValue._id+'/'+ prop.defaultValue.owner)
    };
    console.log(HouseData);

    // const updateFirstPic = () => {
    //     const houseDataTemp = prop.defaultValue
    //     delete houseDataTemp['updateTime']
    //     // houseDataTemp['photo'][0] = PicData[0]
    //     console.log(houseDataTemp)
    //
    //     HouseAxios.put(Edit_House_Auth, Object.assign(houseDataTemp, {'id':prop.defaultValue._id, 'photo':PicData}), {
    //         headers: {
    //             // "content-type": "application/json",
    //             // "accept": "application/json",
    //             "x-token" : xToken,
    //         }})
    //         // .then( (response) => console.log(response.data.status))
    //         .then((response) => {
    //             console.log(response)
    //             if (response.data.status === true) {
    //                 toast.success(`首圖更新成功`);
    //                 setTimeout(() => {
    //                     window.location.replace(window.location.origin + '/HouseDetailOwner/' + prop.defaultValue._id + '/' + prop.defaultValue.owner)
    //                 }, 2000)
    //
    //             } else if(!response.data.status && response.data.data.errorMessage.includes('house address is exist')){
    //                 toast.error(`房屋地址重複，房屋資料更新失敗。`);
    //             }else {
    //                 toast.error(`房屋資料更新失敗`);
    //             }
    //
    //         })
    //         .catch( (error) => {
    //             showInternelErrorPageForMobile()
    //             toast.error(error)
    //         })
    // }

    /* phone Format set up */

    const normalizeInput = (value, previousValue) => {
        console.log(value)
        if (!value) return value;
        const currentValue = value.replace(/[^\d]/g, "");
        const cvLength = currentValue.length;

        if (!previousValue || value.length > previousValue.length) {
            if (cvLength < 5) return currentValue;
            if (cvLength < 8)
                return `${currentValue.slice(0, 4)}${currentValue.slice(4)}`;
            return `${currentValue.slice(0, 4)}${currentValue.slice(4,7)}${currentValue.slice(7, 10)}`;
        }
    };


    console.log(hostPhone)


    const errorPhoneFormat = () => {
            toast.error(`請輸入正確的手機號格式(09xxxxxxxx)`)
    }

    const changeCity = (City) => {

        setSelectArea([])
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

    const onExtraRequireChange = list => {
        // console.log(`selected ${list}` )
        console.log(list)
        setExtraRequire(list);
        setShowHideManageFee(list.includes('manager'))
        setShowHideGarbageFee(list.includes('garbage'))
        //
        // setRoles(list.map(i => Number(i)))
    };
    console.log(equipment)
    console.log(equipArr)
    const onEquipmentChange = list => {
        // console.log(`selected ${list}` )
        console.log(list)
        setEquipment(list);
        equipArr[0] = list.includes('airConditioner');
        equipArr[1] = list.includes('refrigerator');
        equipArr[2] = list.includes('television');
        equipArr[3] = list.includes('washMachine');
        equipArr[4] = list.includes('bed');
        equipArr[5] = list.includes('closet');
        equipArr[6] = list.includes('tvProgram');
        equipArr[7] = list.includes('network');
        equipArr[8] = list.includes('waterHeater');
        equipArr[9] = list.includes('naturalGas');
        equipArr[10] = list.includes('sofa');
        equipArr[11] = list.includes('deskAndChair');
        equipArr[12] = list.includes('elevator');
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
    const FirstPicRemove = (file) => {
        const index = firstPicFile.indexOf(file);
        const newFileList = firstPicFile.slice();
        newFileList.splice(index, 1);
        console.log(newFileList)
        setFirstPicFile(newFileList)
        firstPicTemp.splice(index, 1)
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
                "x-token" : xToken
            }})
            .then( (response) => {
                console.log(response)
                setPhotoData(response['data']['data'])
                setAnnexEnable(true)
                // console.log(response['data']['data'].map(temp => temp.split('/')[1]))
                // PicData = [...PicData, ...response['data']['data'].map(temp => temp.split('/')[1])]
                PicData = [...PicData, ...response['data']['data']]
            })
            .then(() => {
                // setPictureList([])
                setPicUploadCheck(true)
                toast.success('照片上傳成功');
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error('照片上傳失敗')
            })
            .finally(() => {
                setPicUploading(false)
            });
    };
    // console.log(photoData, annexData)

    const handleFirstPicUpload = () => {

        const formData = new FormData();
        firstPicFile.forEach(file => {
            formData.append('photo', file);
        });
        setPicUploading(true)
        console.log(formData.values())

        PicAnnexAxios.post(House_Pic_Auth, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-token" : xToken
            }})
            .then( (response) => {
                console.log(response)
                setFirstPhotoData(response['data']['data'])
                PicData[0] = response['data']['data'][0]
            })
            .then(() => {
                // setPictureList([])
                setPicUploadCheck(true)
                toast.success('首圖照片上傳成功');
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error('照片上傳失敗')
            })
            .finally(() => {
                setPicUploading(false)
            });
    };
    console.log(PicData, firstPhotoData)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handlePreviewCancel = () => setPreviewVisible(false);

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
                "x-token" : xToken
            }})
            .then( (response) => {
                console.log(response)
                setAnnexData(response['data']['data'])
                setFormDataEnable(true);
                // AnnexData = [...AnnexData, ...response['data']['data'].map(temp => temp.split('/')[1])]
                AnnexData = [...AnnexData, ...response['data']['data']]
            })
            .then(() => {
                // setAnnexList([])
                toast.success('附件上傳成功');
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error('附件上傳失敗')
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

    const uploadFirstPicButton = (
        <div>
            <PlusOutlined/>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const uploadAnnexButton = (
        <div>
            <PlusOutlined/>
            <div style={{ marginTop: 8 }}>Upload (Max:10)</div>
        </div>
    );

    // console.log(typeof(prop.defaultValue.floor))

    const clearForm = () => {
        PicTemp.splice(0, PicTemp.length)
        AnnexTemp.splice(0, AnnexTemp.length)
        TrafficArr.splice(0,  TrafficArr.length)
        LifeArr.splice(0,  LifeArr.length)
        EducationArr.splice(0, EducationArr.length)
        PicData.splice(0, PicData.length)
        AnnexData.splice(0, AnnexData.length)
        form_photo.resetFields()
        form_annex.resetFields()
        form_firstPhoto.resetFields()
        form.resetFields()
        setHostPhone('')
    }

    console.log(firstPicTemp.length)
    return (

        <div style={horizontalScrollDisabled}>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}

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
                            {(prop.defaultValue && prop.defaultValue.photo) ?
                                <List
                                    bordered
                                    dataSource={showPic}
                                    // style={{width:'80%'}}
                                    renderItem={(Pic, index) => (
                                        <List.Item

                                            actions={[
                                                index !== 0 ?
                                                    <Button  onClick={() => {
                                                        console.log(Pic, index, PicData)
                                                        let temp = PicData[0]
                                                        PicData[0] = PicData[index]
                                                        PicData[index] = temp
                                                        console.log(PicData)
                                                        toast.success('已設定新的首圖')
                                                        // setEnableFirstPicChange(true)
                                                    }
                                                    }>
                                                        設成首圖
                                                    </Button>
                                                    : []
                                                ,
                                                index === 0 ?
                                                    <p style={{fontSize:'40px'}}>首圖</p>
                                                    :
                                                    <Button icon={<DeleteOutlined />} onClick={() => {
                                                        if(!delPic ) {
                                                            PicData.splice(index, 1)
                                                            showPic.splice(index, 1)
                                                            setDelPic(true)
                                                        }
                                                    }
                                                    }>
                                                        刪除
                                                    </Button>]}>
                                            {/*{Pic}*/}
                                            {/*{'\u3000'.repeat(35)}*/}
                                            {/*<a href={PicPreURL+Pic} ><img src={PicPreURL+Pic} width={150} height={150} alt={Pic}/></a>*/}
                                            <div style={{
                                                // height:'150px',
                                                overflow:'hidden',
                                            }}>
                                                <Image  src={PicPreURL+Pic} width={150} height={150} fallback={fallback} />
                                                {/*<img src={PicPreURL+Pic} width={150} height={150} alt={Pic}/>*/}
                                            </div>
                                        </List.Item>
                                    )}
                                />
                                : []}
                            <>
                                <Upload multiple={true}
                                        listType="picture-card"
                                        fileList={PictureList['fileList']}
                                        maxCount={10-showPic.length}
                                        onRemove={PicRemove}
                                        onPreview={handlePreview}
                                        accept={'.jpg, .png, .heic, .bmp, .jpeg'}
                                        beforeUpload={file => {
                                            console.log(file)

                                            if(PicTemp.length < 10-showPic.length) {
                                                const isImage = photoType.includes(file.type);
                                                PicTemp.push(file)
                                                console.log(PicTemp)
                                                if (!isImage) {
                                                    toast.error('不是圖片檔')
                                                }else {
                                                    // setPictureList(
                                                    //     [...PictureList, file]
                                                    // );
                                                    setPictureList(PicTemp);
                                                    return false;
                                                }

                                                return isImage || Upload.LIST_IGNORE;
                                            }

                                        }}
                                    // onChange={CheckPicNum}
                                >
                                    {showPic.length+PictureList.length >= 10 ? null : uploadPicButton}
                                </Upload>
                                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handlePreviewCancel}>
                                    <img
                                        alt="example"
                                        style={{
                                            width: '100%',
                                        }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </>

                        </Col>
                    </Row>
                    <Modal visible={enableFirstPicChange}
                           title={'首圖更換'}
                           onCancel={() => {
                               setEnableFirstPicChange(false)
                               firstPicTemp.splice(0, firstPicTemp.length)
                               form_firstPhoto.resetFields()
                           }}
                           // onOk={updateFirstPic}
                           footer={null}
                           width={400}
                    >

                        <Form
                            form={form_firstPhoto}
                            className="PicUpload"
                            onFinish={handleFirstPicUpload}
                        >
                            <Form.Item name="firstPhotoUpload">
                                <div style={{'textAlign': 'center', }}>
                                <Upload listType="picture-card"
                                        maxCount={1}
                                        accept={'.jpg, .png, .heic, .bmp, .jpeg'}
                                        onPreview={handlePreview}
                                        onRemove={FirstPicRemove}
                                        beforeUpload={file => {
                                            console.log(file)
                                            firstPicTemp.splice(0, firstPicTemp.length)
                                            const isImage = photoType.includes(file.type);
                                            firstPicTemp.push(file)
                                            console.log(firstPicTemp)
                                            if (!isImage) {
                                                toast.error('不是圖片檔')
                                            }else {
                                                setFirstPicFile(firstPicTemp)
                                                console.log(firstPicTemp)
                                                return false;
                                            }

                                            return isImage || Upload.LIST_IGNORE;
                                        }}
                                >
                                    {firstPicTemp.length >= 1 ? null : uploadFirstPicButton}
                                </Upload>
                                <Button type="primary"
                                        htmlType="submit"
                                        className='PicUpload-button'
                                        shape="round"
                                        loading={PicUploading}
                                        disabled={firstPicTemp.length === 0}
                                    // onClick={() => message.success('照片上傳成功')}
                                >
                                    {PicUploading ? 'Uploading' : '提交照片'}
                                </Button>
                                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handlePreviewCancel}>
                                    <img
                                        alt="example"
                                        style={{
                                            width: '100%',
                                        }}
                                        src={previewImage}
                                    />
                                </Modal>
                                </div>
                            </Form.Item>
                        </Form>
                    </Modal>
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
                // AnnexEnable &&
                <Form

                    form={form_annex}
                    className="AnnexUpload"
                    onFinish={handleAnnexUpload}
                >
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                            <Divider>附件上傳(房屋謄本&授權書，PDF or 圖片檔</Divider>
                        </Col>
                    </Row>
                    <Form.Item
                        name="annexUpload"
                    >
                        <Row>
                            <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                            </Col>
                            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                                {(prop.defaultValue && prop.defaultValue.annex)  ?
                                    <List
                                        bordered
                                        dataSource={showAnnex}
                                        renderItem={(annex, index) => (
                                            <List.Item actions={[
                                                <Button icon={<DeleteOutlined />} onClick={() => {
                                                    if(!delAnnex ) {
                                                        AnnexData.splice(index, 1)
                                                        showAnnex.splice(index, 1)
                                                        setDelAnnex(true)
                                                    }
                                                }
                                                }>
                                                    delete
                                                </Button>]}>
                                                {annex}
                                            </List.Item>
                                        )}
                                    />
                                    : []}
                                <Upload multiple
                                        listType="picture-card"
                                        fileList={AnnexList['fileList']}
                                        maxCount={10}
                                        onRemove={AnnexRemove}
                                        accept={'.pdf, .jpg, .png, .bmp, .jpeg'}
                                        beforeUpload={file => {
                                            console.log(file)
                                            if(AnnexTemp.length > 0) {
                                                AnnexTemp.splice(0, AnnexTemp.length)
                                            }
                                            const isFile = annexType.includes(file.type);
                                            AnnexTemp.push(file)
                                            console.log(AnnexTemp)
                                            if (!isFile) {
                                                toast.error(`${file.name} 不是 pdf 檔`);
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
                // AnnexEnable &&
                <Form
                    form={form}
                    className="HouseUpload_form"
                    name="HouseUpload"
                    onFinish={UploadHouseData}
                    scrollToFirstError
                    initialValues={{
                        "name" : prop.defaultValue?prop.defaultValue.name:[],
                        "TypeOfBuild": prop.defaultValue?buildingType[prop.defaultValue.config.buildingType-1] : [],
                        "TypeOfRental" : prop.defaultValue? RentalType[prop.defaultValue.saleInfo.typeOfRental-1] : [],
                        "City" : prop.defaultValue?prop.defaultValue.city:[],
                        "Area" : prop.defaultValue?prop.defaultValue.area:[],
                        "address" : prop.defaultValue?prop.defaultValue.address.substring(prop.defaultValue.city.length+prop.defaultValue.area.length):[],
                        "lane" : prop.defaultValue?prop.defaultValue.houseNumber.lane:[],
                        "alley" : prop.defaultValue?prop.defaultValue.houseNumber.alley:[],
                        "NO1" : prop.defaultValue?prop.defaultValue.houseNumber.number1:[],
                        "NO2" : prop.defaultValue?prop.defaultValue.houseNumber.number2:[],
                        "hostName": prop.defaultValue?prop.defaultValue.hostName:[],
                        "hostGender" :prop.defaultValue?prop.defaultValue.hostGender ? '先生' : '小姐':[],
                        "hostPhone": prop.defaultValue?prop.defaultValue.hostPhone:[],
                        "totalFloor": prop.defaultValue?prop.defaultValue.totalFloor:[],
                        "floorNo2": prop.defaultValue?prop.defaultValue.floor2:[],
                        "floorNo1" : prop.defaultValue?FloorOptions[FloorCheck(prop.defaultValue.floor ,prop.defaultValue.remark)].value : [],
                        "room-number" : prop.defaultValue?prop.defaultValue.room : [],
                        "room" : prop.defaultValue?prop.defaultValue.config.room : [],
                        "livingRoom" : prop.defaultValue?prop.defaultValue.config.livingRoom : [],
                        "bathroom" : prop.defaultValue?prop.defaultValue.config.bathroom : [],
                        "balcony" : prop.defaultValue?prop.defaultValue.config.balcony : [],
                        "ping" : prop.defaultValue?prop.defaultValue.ping:[],
                        "lease-price" : prop.defaultValue?prop.defaultValue.price:[],
                        "manageFee" : prop.defaultValue?prop.defaultValue.saleInfo.manager ? prop.defaultValue.saleInfo.managerPrice : [] : [],
                        "garbageFee" : prop.defaultValue?prop.defaultValue.saleInfo.garbage ? prop.defaultValue.saleInfo.garbagePrice : [] : [],
                        "remark" : prop.defaultValue
                            ?
                            prop.defaultValue.remark !== null
                                ?
                                prop.defaultValue.remark.indexOf('頂樓加蓋，') === 0
                                    ?
                                    prop.defaultValue.remark.slice(5)
                                    :
                                    prop.defaultValue.remark
                                :
                                prop.defaultValue.remark
                            :
                            []
                    }}

                >
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
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
                                // style={{ width: '100%' }}
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
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col xs={24} sm={18} md={18} lg={15} xl={12}>
                            <Form.Item label="類型">
                                <Row justify="start">
                                    <Col  xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Form.Item style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                                                   name="TypeOfBuild"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '此欄位不能為空白',
                                                       },
                                                   ]}
                                        >
                                            <Select size="large">
                                                <Option value="公寓">公寓</Option>
                                                <Option value="電梯大樓">電梯大樓</Option>
                                                <Option value="透天">透天</Option>
                                                <Option value="辦公室">辦公室</Option>
                                                <Option value="店面">店面</Option>
                                                {/*<Option value="1">公寓</Option>*/}
                                                {/*<Option value="2">電梯大樓</Option>*/}
                                                {/*<Option value="3">透天</Option>*/}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                                                   name="TypeOfRental"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '此欄位不能為空白',
                                                       },
                                                   ]}
                                        >
                                            <Select size="large">
                                                <Option value="整層住家">整層住家</Option>
                                                <Option value="獨立套房">獨立套房</Option>
                                                <Option value="分租套房">分租套房</Option>
                                                <Option value="雅房">雅房</Option>
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
                            <Form.Item label="地址">
                                <Row>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="City"
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   style={{ width: '100%' }}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '此欄位不能為空白',
                                                       },
                                                   ]}
                                        >
                                            <Select size="large" allowClear id="citySelect" placeholder="縣市" options={CityOptions} onChange={changeCity} style={{
                                                width: '100%',
                                            }}>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="Area"
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   style={{ width: '100%' }}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '此欄位不能為空白',
                                                       },
                                                   ]}
                                        >
                                                <Select size="large"
                                                        id="area"
                                                        value={selectArea}
                                                        allowClear
                                                        placeholder="區域"
                                                        options={areaOptions}
                                                        onChange={changeArea}
                                                        style={{
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
                                                       {
                                                           pattern: /^[\u4e00-\u9fa5]+$/,
                                                           message: '地址只能填寫中文'
                                                       }
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
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="lane"
                                                   style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   rules={[
                                                       {
                                                           pattern: /^[0-9]*$/,
                                                           message: '只能填寫數字'
                                                       }
                                                   ]}
                                        >

                                            <Input size="large"
                                                   placeholder="非必填"
                                                   style={{width: '100%'}}
                                                   suffix='巷'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="alley"
                                                   style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   rules={[
                                                       {
                                                           pattern: /^[0-9]*$/,
                                                           message: '只能填寫數字'
                                                       }
                                                   ]}
                                        >
                                            <Input size="large"
                                                   placeholder="非必填"
                                                   style={{width: '100%'}}
                                                   suffix='弄'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="NO1"
                                                   style={{ width: '100%' }}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '此欄位不能為空白',
                                                       },
                                                       {
                                                           pattern: /^[0-9]*$/,
                                                           message: '只能填寫數字'
                                                       }
                                                   ]}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                        >
                                            <Input size="large"
                                                   placeholder=""
                                                   style={{width: '100%'}}
                                                   suffix='號'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="NO2"
                                                   style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   rules={[
                                                       {
                                                           pattern: /^[0-9]*$/,
                                                           message: '只能填寫數字'
                                                       }
                                                   ]}
                                        >
                                            <Input  size="large"
                                                    placeholder="   非必填"
                                                    style={{width: '100%'}}
                                                    prefix='之'
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

                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item
                                        name="totalFloor"
                                        label="總樓層"
                                        rules={[
                                            {
                                                required: true,
                                                message: '此欄位不能為空白',
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '100%'}}
                                                     min={1}
                                                     max={100}
                                                     size="large"
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="樓"
                                                     onChange={setTotalLayer}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col xs={24} sm={18} md={18} lg={15} xl={12}>
                            <Form.Item label="樓層">
                                <Row justify="start">
                                    <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            name="floorNo1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '此欄位不能為空白',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size={"large"}
                                                style={{ width: '100%' }}
                                                placeholder="樓層"
                                                options={FloorOptions.slice(0, totalLayer+4)}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(30% - 4px)', margin: '0 4px' }}
                                                   name="floorNo2"
                                        >
                                            <Input  size="large"
                                                    placeholder="   非必填"
                                                    style={{width: '100%'}}
                                                    prefix='之'
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
                            <Form.Item label="屋主">
                                <Row>
                                    <Col  xs={18} sm={19} md={19} lg={20} xl={21}>
                                        <Form.Item name="hostName"
                                                   style={{width: '100%'}}
                                        >
                                            <Input size="large"
                                                   placeholder="填屋主的姓氏或名字"
                                                   style={{
                                                       width: '100%',
                                                   }}
                                                   maxLength={20}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={6} sm={5} md={5} lg={4} xl={3}>
                                        <Form.Item name="hostGender"
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                   style={{width: '100%'}}
                                                   rules={[
                                                       {
                                                           required: false,
                                                           message: '此欄位不能為空白',
                                                       },
                                                   ]}
                                        >
                                            <Select size="large"
                                                    id="area"
                                                // value={selectArea}
                                                    allowClear
                                                    placeholder="性別"
                                                    options={[{ value: '先生'},{ value: '小姐'}]}
                                                // onChange={changeArea}
                                                    style={{
                                                        width: '100%',
                                                    }}>
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
                                        // addonBefore={PhonePrefixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                        size="large"
                                        placeholder='09xxxxxxxx'
                                        // value={hostPhone}
                                        maxLength={10}
                                    />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                            <Form.Item label="房間號碼">
                                <Row>
                                    {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                    {/*</Col>*/}
                                    <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item
                                            name="room-number"
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your Name!',
                                                },
                                                // {
                                                //     pattern: /^[A-Za-z0-9]+$/ || /s/,
                                                //     message: '房間號碼只能填寫英文與數字',
                                                // },
                                            ]}
                                        >
                                            <Input size="large"
                                                   placeholder="非必填"
                                                   style={{width: '100%'}}
                                                   maxLength={10}
                                                   // suffix='巷'
                                            />
                                            {/*<InputNumber placeholder=""*/}
                                            {/*             style={{width: '100%'}}*/}
                                            {/*             min={0}*/}
                                            {/*             size="large"*/}
                                            {/*    // formatter={value => `${value} 公尺`}*/}
                                            {/*             addonAfter=""*/}
                                            {/*/>*/}
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
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="room"
                                                   style={{ width: '100%' }}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '此欄位不能為空白',
                                                       },
                                                   ]}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                        >
                                            <InputNumber placeholder=""
                                                         style={{width: '100%'}}
                                                         min={0}
                                                         max={10}
                                                         size="large"
                                                // formatter={value => `${value} 公尺`}
                                                         addonAfter="房"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="livingRoom"
                                                   style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                        >
                                            <InputNumber placeholder=""
                                                         style={{width: '100%'}}
                                                         min={0}
                                                         max={10}
                                                         size="large"
                                                // formatter={value => `${value} 公尺`}
                                                         addonAfter="廳"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="bathroom"
                                                   style={{ width: '100%' }}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '此欄位不能為空白',
                                                       },
                                                   ]}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                        >
                                            <InputNumber placeholder=""
                                                         style={{width: '100%'}}
                                                         min={0}
                                                         max={10}
                                                         size="large"
                                                // formatter={value => `${value} 公尺`}
                                                         addonAfter="衛"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col  xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Form.Item name="balcony"
                                                   style={{ width: '100%' }}
                                            // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                        >
                                            <InputNumber placeholder=""
                                                         style={{width: '100%'}}
                                                         min={0}
                                                         max={10}
                                                         size="large"
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

                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item
                                        name="lease-price"
                                        label="租金"
                                        rules={[
                                            {
                                                required: true,
                                                message: '此欄位不能為空白',
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '100%'}}
                                                     min={0}
                                                     max={99999999}
                                                     size="large"
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="元/月"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col  xs={24} sm={18} md={18} lg={15} xl={12}>

                            <Row>
                                {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                {/*</Col>*/}
                                <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item
                                        name="ping"
                                        label="坪數"
                                        rules={[
                                            {
                                                required: true,
                                                message: '此欄位不能為空白',
                                            },
                                        ]}
                                    >
                                        <InputNumber placeholder=""
                                                     style={{width: '100%'}}
                                                     min={0}
                                                     step="0.01"
                                                     size="large"
                                            // formatter={value => `${value} 公尺`}
                                                     addonAfter="坪"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
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
                                <Form.Item label="鄰近交通" >
                                    <Row>
                                        {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                        {/*</Col>*/}
                                        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>

                                            {TrafficArr.length ? (
                                                <>
                                                    <List
                                                        style={{fontSize: '120%'}}
                                                        dataSource={TrafficArr}
                                                        renderItem={(traffic, index) => (
                                                            <List.Item actions={[
                                                                <Button icon={<DeleteOutlined style={{fontSize: '90%'}}/>} onClick={() => {
                                                                    if(!delTraffic ) {
                                                                        TrafficArr.splice(index,1)
                                                                        setDelTraffic(true)
                                                                    }
                                                                }}>

                                                                </Button>]}>
                                                                {index+1}.名稱：{traffic.name.length>4 ?
                                                                // <abbr title={traffic.name}>{traffic.name.substring(0, 3) + '...' + traffic.name.substring(traffic.name.length - 2)}</abbr>
                                                                // :
                                                                // traffic.name}
                                                                // ， 距離：{traffic.distance} 公尺 ， 類型：{Traffic_Type[traffic.type-1]}
                                                                <abbr title={traffic.name}>{traffic.name.substring(0, 3) + '...' + traffic.name.substring(traffic.name.length - 2)}</abbr>
                                                                :
                                                                traffic.name}
                                                                ， 類型：{Traffic_Type[traffic.type-1]}
                                                            </List.Item>
                                                        )}
                                                    />
                                                </>

                                                // TrafficArr.map((traffic, index) => (
                                                // <ol>
                                                //     <li key={index} style={{display: "inline", margin: '0px 20px 0px 0px'}}>{traffic.name}</li>
                                                //     <li key={index} style={{display: "inline", margin: '20px'}}>{traffic.distance}</li>
                                                //     <li key={index} style={{display: "inline", margin: '20px'}}>{Traffic_Type[traffic.type-1]}</li>
                                                //     <li key={index} style={{display: "inline", margin: '20px'}}>
                                                //         <Button icon={<DeleteOutlined />} onClick={() => {
                                                //         if(!delTraffic ) {
                                                //             TrafficArr.splice(index,1)
                                                //             setDelTraffic(true)
                                                //         }
                                                //         }}>
                                                //             delete
                                                //         </Button>
                                                //     </li>
                                                // </ol>
                                                //     ))
                                                // <ol>
                                                //     {TrafficArr.map((traffic, index) => (
                                                //         <li key={index} className="trafficList" style={{fontSize: '1.2rem', width:'70%'}}>
                                                //             {/*名稱：{traffic.TrafficName}, 距離：{traffic.TrafficDistance} 公尺 , 類型：{Traffic_Type[traffic.TrafficType-1]}*/}
                                                //             名稱：{traffic.name} ， 距離：{traffic.distance} 公尺 ， 類型：{Traffic_Type[traffic.type-1]}
                                                //             {/*<span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>*/}
                                                //
                                                //             <Button icon={<DeleteOutlined />} onClick={() => {
                                                //                 if(!delTraffic ) {
                                                //                     TrafficArr.splice(index,1)
                                                //                     setDelTraffic(true)
                                                //                 }
                                                //             }}>
                                                //                 delete
                                                //             </Button>
                                                //         </li>
                                                //     ))}
                                                // </ol>
                                            ) :  null}
                                            {/*<p style={{fontSize: '1.2rem'}}>NONE</p>*/}
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
                                                新增交通資訊
                                            </Button>
                                        </Col>
                                    </Row>

                                    <Modal title="交通資訊"
                                           visible={trafficVisible}
                                           onOk={() => {
                                               form_traffic.validateFields()
                                                   .then((values) => {
                                                       form_traffic.resetFields();
                                                       onTrafficCreate(values);
                                                   })
                                                   .catch( (error) => {
                                                    showInternelErrorPageForMobile()
                                                    // eslint-disable-next-line no-useless-concat
                                                    toast.error('Validate Failed:' + 'info')
                                                })
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
                                                <Input size="large" placeholder="" style={{width: '100%'}}/>
                                            </Form.Item>
                                            {/*<Form.Item*/}
                                            {/*    // name="TrafficDistance"*/}
                                            {/*    name="distance"*/}
                                            {/*    label="距離："*/}
                                            {/*    tooltip='限制距離在1000公尺內'*/}
                                            {/*    rules={[*/}
                                            {/*        {*/}
                                            {/*            required: true,*/}
                                            {/*        },*/}
                                            {/*    ]}*/}
                                            {/*>*/}
                                            {/*    <InputNumber placeholder=""*/}
                                            {/*                 style={{width: '100%'}}*/}
                                            {/*                 min={0}*/}
                                            {/*                 max={1000}*/}
                                            {/*                 size="large"*/}
                                            {/*        // formatter={value => `${value} 公尺`}*/}
                                            {/*                 addonAfter="公尺"*/}
                                            {/*    />*/}
                                            {/*</Form.Item>*/}
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
                                                <Select size="large"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                >
                                                    <Option value="1">捷運站</Option>
                                                    <Option value="2">公車/客運</Option>
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
                                <Form.Item label="鄰近生活">
                                    <Row>
                                        {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                        {/*</Col>*/}
                                        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                                            {LifeArr.length ? (
                                                <>
                                                    <List
                                                        style={{fontSize: '120%'}}
                                                        dataSource={LifeArr}
                                                        renderItem={(life, index) => (
                                                            <List.Item actions={[
                                                                <Button icon={<DeleteOutlined style={{fontSize: '90%'}}/>} onClick={() => {
                                                                    if(!delLife ) {
                                                                        LifeArr.splice(index,1)
                                                                        setDelLife(true)
                                                                    }
                                                                }}>

                                                                </Button>]}>
                                                                {index+1}.名稱：{life.name.length>4 ?
                                                                // <abbr title={life.name}>{life.name.substring(0, 3) + '...' + life.name.substring(life.name.length - 2)}</abbr>
                                                                // :
                                                                // life.name}
                                                                // ， 距離：{life.distance} 公尺 ， 類型：{Life_Type[life.type-1]}
                                                                <abbr title={life.name}>{life.name.substring(0, 3) + '...' + life.name.substring(life.name.length - 2)}</abbr>
                                                                :
                                                                life.name}
                                                                ，類型：{Life_Type[life.type-1]}
                                                            </List.Item>
                                                        )}
                                                    />
                                                </>
                                                // <ol>
                                                //     {LifeArr.map((life, index) => (
                                                //         <li key={index} className="lifeList" style={{fontSize: '1.2rem'}}>
                                                //             {/*名稱：{life.LifeName}, 距離：{life.LifeDistance} 公尺 , 類型：{Life_Type[life.LifeType-1]}*/}
                                                //             名稱：{life.name} ， 距離：{life.distance} 公尺 ， 類型：{Life_Type[life.type-1]}
                                                //             <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                                //             <Button icon={<DeleteOutlined />} onClick={() => {
                                                //                 if(!delLife ) {
                                                //                     LifeArr.splice(index,1)
                                                //                     setDelLife(true)
                                                //                 }
                                                //             }}>delete</Button>
                                                //         </li>
                                                //     ))}
                                                // </ol>
                                            ) : null}
                                            {/*<p style={{fontSize: '1.2rem'}}>NONE</p>*/}
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
                                                新增生活資訊
                                            </Button>
                                        </Col>
                                    </Row>

                                    <Modal title="生活資訊"
                                           visible={lifeVisible}
                                           onOk={() => {
                                               form_life.validateFields()
                                                   .then((values) => {
                                                       form_life.resetFields();
                                                       onLifeCreate(values);
                                                   })
                                                   .catch( (error) => {
                                                    showInternelErrorPageForMobile()
                                                    // eslint-disable-next-line no-useless-concat
                                                    toast.error(error)
                                                })
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
                                                <Input size="large" placeholder="" style={{width: '100%'}}/>
                                            </Form.Item>
                                            {/*<Form.Item*/}
                                            {/*    // name="LifeDistance"*/}
                                            {/*    name="distance"*/}
                                            {/*    label="距離："*/}
                                            {/*    tooltip='限制距離在1000公尺內'*/}
                                            {/*    rules={[*/}
                                            {/*        {*/}
                                            {/*            required: true,*/}
                                            {/*        },*/}
                                            {/*    ]}*/}
                                            {/*>*/}
                                            {/*    <InputNumber placeholder=""*/}
                                            {/*                 style={{width: '100%'}}*/}
                                            {/*                 min={0}*/}
                                            {/*                 max={1000}*/}
                                            {/*                 size="large"*/}
                                            {/*        // formatter={value => `${value} 公尺`}*/}
                                            {/*                 addonAfter="公尺"*/}
                                            {/*    />*/}
                                            {/*</Form.Item>*/}
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
                                                <Select size="large"
                                                        style={{
                                                            width: '100%',
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
                                        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                                            {EducationArr.length ? (
                                                <>
                                                    <List
                                                        style={{fontSize: '120%'}}
                                                        dataSource={EducationArr}
                                                        renderItem={(education, index) => (
                                                            <List.Item actions={[
                                                                <Button icon={<DeleteOutlined style={{fontSize: '90%'}}/>} onClick={() => {
                                                                    if(!delEdu ) {
                                                                        EducationArr.splice(index,1)
                                                                        setDelEdu(true)
                                                                    }
                                                                }}>

                                                                </Button>]}>
                                                                {index+1}.名稱：{education.name.length>4 ?
                                                                // <abbr title={education.name}>{education.name.substring(0, 3) + '...' + education.name.substring(education.name.length - 2)}</abbr>
                                                                // :
                                                                // education.name}
                                                                // ， 距離：{education.distance} 公尺 ， 類型：{Edu_Type[education.type-1]}
                                                                <abbr title={education.name}>{education.name.substring(0, 3) + '...' + education.name.substring(education.name.length - 2)}</abbr>
                                                                :
                                                                education.name}
                                                                ， 類型：{Edu_Type[education.type-1]}
                                                            </List.Item>
                                                        )}
                                                    />
                                                </>
                                                // <ol>
                                                //     {EducationArr.map((education, index) => (
                                                //         <li key={index} className="EduList" style={{fontSize: '1.2rem'}} >
                                                //             {/*名稱：{education.EduName}, 距離：{education.EduDistance} 公尺 , 類型：{Edu_Type[education.EduType-1]}*/}
                                                //             名稱：{education.name} ， 距離：{education.distance} 公尺 ， 類型：{Edu_Type[education.type-1]}
                                                //             <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                                //             <Button icon={<DeleteOutlined />} onClick={() => {
                                                //                 if(!delEdu ) {
                                                //                     EducationArr.splice(index,1)
                                                //                     setDelEdu(true)
                                                //                 }
                                                //             }}>delete</Button>
                                                //         </li>
                                                //     ))}
                                                // </ol>
                                            ) : null}
                                            {/*<p style={{fontSize: '1.2rem'}}>NONE</p>*/}
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
                                                新增學校資訊
                                            </Button>
                                        </Col>
                                    </Row>

                                    <Modal title="學校資訊"
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
                                                <Input size="large" placeholder="" style={{width: '100%'}}/>
                                            </Form.Item>
                                            {/*<Form.Item*/}
                                            {/*    // name="EduDistance"*/}
                                            {/*    name="distance"*/}
                                            {/*    label="距離："*/}
                                            {/*    tooltip='限制距離在1000公尺內'*/}
                                            {/*    rules={[*/}
                                            {/*        {*/}
                                            {/*            required: true,*/}
                                            {/*        },*/}
                                            {/*    ]}*/}
                                            {/*>*/}
                                            {/*    <InputNumber placeholder=""*/}
                                            {/*                 style={{width: '100%'}}*/}
                                            {/*                 min={0}*/}
                                            {/*                 max={1000}*/}
                                            {/*                 size="large"*/}
                                            {/*        // formatter={value => `${value} 公尺`}*/}
                                            {/*                 addonAfter="公尺"*/}
                                            {/*    />*/}
                                            {/*</Form.Item>*/}
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
                                                <Select size="large"
                                                        style={{
                                                            width: '100%',
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
                                label="需求許可"
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
                                    <Row gutter={[16, 16]}>
                                        <Col span={2} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='pet'><PetsIcon/><br/>養寵物</Checkbox>
                                        </Col>
                                        <Col span={2} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='manager'><ManageFeeIcon/><br/>管理費</Checkbox>
                                        </Col>
                                        <Col span={2} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='garbage'><GarbageFeeIcon/><br/>垃圾費</Checkbox>
                                        </Col>
                                        <Col span={2} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='smoke'><CigaretteIcon/><br/>可抽菸</Checkbox>
                                        </Col>
                                        <Col span={2} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='cook'><CookIcon/><br/>可開火</Checkbox>
                                        </Col>
                                        <Col span={2} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='parking'><ParkingIcon/><br/>停車位</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>

                                {(ShowHideManageFee || ShowHideGarbageFee) &&
                                    <Form.Item>
                                    <Row justify="start">
                                        {/*<Col xs={24} sm={3} md={3} lg={4} xl={6}>*/}

                                        {/*</Col>*/}
                                        <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                            {ShowHideManageFee &&
                                                <Form.Item
                                                    name="manageFee"
                                                    label="管理費"
                                                    style={{ width: '100%' }}
                                                    // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '此欄位不能為空白',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder=""
                                                                 style={{width: '100%'}}
                                                                 min={0}
                                                                 size="large"
                                                        // formatter={value => `${value} 公尺`}
                                                                 addonAfter="元/月"
                                                    />
                                                </Form.Item>
                                            }
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            {ShowHideGarbageFee &&
                                                <Form.Item
                                                    name="garbageFee"
                                                    label="垃圾費"
                                                    style={{ width: '100%' }}
                                                    // style={{ display: 'inline-block',  width: 'calc(15% - 8px)', margin: '0 4px' }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '此欄位不能為空白',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder=""
                                                                 style={{width: '100%'}}
                                                                 min={0}
                                                                 size="large"
                                                        // formatter={value => `${value} 公尺`}
                                                                 addonAfter="元/月"
                                                    />
                                                </Form.Item>
                                            }
                                        </Col>
                                    </Row>
                                </Form.Item>}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
                        <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
                            <Form.Item
                                // name="equip"
                                       label="提供設備"
                            >
                                <Checkbox.Group style={{ fontSize: '100%' ,width: '100%' }}
                                                value={equipment}
                                                onChange={onEquipmentChange}
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='airConditioner'><AirConditionerIcon/><br/>冷氣機</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='refrigerator'><RefrigeratorIcon/><br/>電冰箱</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='television'><TelevisionIcon/><br/>電視機</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='washMachine'><WashMachineIcon/><br/>洗衣機</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='bed'><BedIcon/><br/>床</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='closet'><ClosetIcon/><br/>衣櫥</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='tvProgram'><TvProgramIcon/><br/>第四台</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='network'><NetworkIcon/><br/>網路</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='waterHeater'><WaterHeaterIcon/><br/>熱水器</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='naturalGas'><NaturalGasIcon/><br/>天然氣</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='sofa'><SofaIcon/><br/>沙發</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='deskAndChair'><DeskAndChairIcon/><br/>桌椅</Checkbox>
                                        </Col>
                                        <Col span={4} xs={6} sm={4} md={4} lg={4} xl={4}>
                                            <Checkbox value='elevator'><ElevatorIcon/><br/>電梯</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={3} md={3} lg={4} xl={6}>

                        </Col>
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
                        <Col xs={11} sm={11} md={11} lg={11} xl={11}>

                        </Col>
                        <Col  xs={13} sm={13} md={13} lg={13} xl={13}>
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
                                        &nbsp;&nbsp;
                                        <Button type="primary"
                                                className='HouseData-button'
                                                shape="round"
                                                onClick={clearForm}
                                        >
                                            重新填寫
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
