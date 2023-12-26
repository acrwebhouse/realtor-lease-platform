import React, {useEffect, useState} from 'react';
import {Table,  Button, Input, Select, Row, Col} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'
const userListUrl = 'user/getUserList'
const removeUserUrl = 'user/removeUser'

const MemberList = () => {
    const xToken = cookie.load('x-token')
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
    const sortOptions = [{ value: '時間近到遠' },{ value: '時間遠到近' }];
    const roleOptions = [{ value: '角色不限' },{ value: 'admin' },{ value: 'host' },{ value: 'user' },{ value: 'sales' }];

    const [areaOptions, setAreaOptions] = useState([]);
    const [init, setInit] = useState(true);
    const [selectArea, setSelectArea] = useState(null);
    const [memberList, setMemberList] = useState([]);
    const [size] = useState("large");

    let data = [
        {
          key: '1',
          name: 'Chris',
        //   account: 'test123',
        //   gender: '男',
          phone: '0912636123',
        //   mail: "acr.webffhousve@gmail.com",
          roles: 'admin,host,user,sales',
        //   rolesInfo : '銷售城市：台北市,',
        //   updateTime : '2022-01-29T07:59:23.792Z'
          content:['帳號：test123','性別：男']
        }
      ];

    const [getUserListArg] = useState({
        start : '0',
        count : '9999999',
        timeSort : '-1',
        // isDelete : 'false',
        name : '',
        roles : '',
        salesCity : '',
        salesArea : '',        
    });

    useEffect(() => {
        if (init) {
            setInit(false)
            getUserList()
        }
    }, )

    const getUserList = () => {
        let reqUrl = `${userListUrl}?start=${getUserListArg.start}&&count=${getUserListArg.count}`
        const textQuery= document.getElementById('textQuery');
        
        if(textQuery){
            const value = textQuery.value
            if(value !== '' && value !== undefined && value !== null){
                reqUrl = `${reqUrl}&&name=${value}`
            }
        }

        if(getUserListArg.roles !=='' && getUserListArg.roles !==undefined){
            reqUrl = `${reqUrl}&&roles=[${getUserListArg.roles}]`
        }

        if(getUserListArg.salesCity !==''&& getUserListArg.salesCity !==undefined){
            reqUrl = `${reqUrl}&&salesCity=${getUserListArg.salesCity}`
        }
        
        if(getUserListArg.salesArea !==''&& getUserListArg.salesArea !==undefined){
            reqUrl = `${reqUrl}&&salesArea=${getUserListArg.salesArea}`
        }

        if(getUserListArg.timeSort !==''&& getUserListArg.timeSort !==undefined){
            reqUrl = `${reqUrl}&&timeSort=${getUserListArg.timeSort}`
        }
        UserAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            }
        )
        .then( (response) => {
            // //concole.log(response)
            resolveMemberList(response)
        })
        .catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }

    function resolveMemberList(response){
        data = []
        if(response.data && response.data.data){
            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){
                const item = {
                    key: i,
                    name: items[i].name,
                    content: [`帳號 : ${items[i].account}`,`電話 : ${items[i].phone}`],
                    }
                if(items[i].gender === true){
                    item.content.push('性別 : 男')
                }else{
                    item.content.push('性別 : 女')
                }
                let bornDate = '生日 : '
                if(items[i].bornDate){
                    bornDate = bornDate+items[i].bornDate
                }
                item.content.push(bornDate)
                let roles = '角色 : '
                let salesCity = '銷售城市 : '
                let salesArea = '銷售區域 : '
                
                if(items[i].roles){
                    for(let j = 0 ;j<items[i].roles.length; j++){
                        switch(items[i].roles[j]){
                            case 1 :
                                roles = roles + ' admin'
                                break;
                            case 2 :
                                roles = roles + ' host'
                                break;
                            case 3 :
                                roles = roles + ' user'
                                 break;
                            case 4 :
                                roles = roles + ' sales'
                                const sales = items[i].rolesInfo.sales
                                if(sales){
                                    const scope = sales.scope
                                    if(scope !== null && scope !==undefined){
                                        for(let k = 0 ;k<scope.length;k++){
                                            salesCity = salesCity + ' '+scope[k].city
                                            salesArea = salesArea + ' '+scope[k].area
                                        }
                                    }
                                }
                                break;
                            default:
            
                        }
                    }
                }else{
                    roles = roles+'異常'
                }
                
                item.content.push(roles)
                item.content.push(salesCity)
                item.content.push(salesArea)
                item.content.push(`更新時間 : ${new Date(items[i].updateTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}`)
                item.content.push(items[i]._id)
                data.push(item)
            }
            setMemberList(data)
        }
    }

    function changeSort(sort) {
        getUserListArg.timeSort = ''

        switch(sort){
            case sortOptions[0].value:
                getUserListArg.timeSort = '-1'
                break;
            case sortOptions[1].value:
                getUserListArg.timeSort = '1'
                break;
            default:
                getUserListArg.timeSort = '-1'
        }
    }

    function changeRole(role) {
        if(roleOptions[0].value !== role){
            switch(role){
                case roleOptions[1].value:
                    getUserListArg.roles = [1]
                    break;
                case roleOptions[2].value:
                    getUserListArg.roles = [2]
                    break;
                case roleOptions[3].value:
                    getUserListArg.roles = [3]
                    break;
                case roleOptions[4].value:
                    getUserListArg.roles = [4]
                    break;
                default:
                    getUserListArg.roles = ''
            }
        }else{
            getUserListArg.roles = ''
        }
    }

    function changeCity(city) {
        setSelectArea(null)
        setAreaOptions([])
        if(cityOptions[0].value !== city){
            getUserListArg.salesCity = city
            getUserListArg.salesArea = ''
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
            getUserListArg.salesCity = ''
        }
    }

    function changeArea(area) {
        setSelectArea(area)
        if(area === '區域不限'){
            getUserListArg.salesArea = ''
        }else{
            getUserListArg.salesArea = area
        }   
    }

function queryUser(userId){
    //concole.log(userId)
    alert("查看 userId: "+userId)
}

function removeUser(userId){
    const reqUrl = `${removeUserUrl}`

    UserAxios.delete(
        reqUrl,{
            headers:{
                'x-token':xToken
            },
            data: {
                ids: [userId]
            }
        }
    )
    .then( (response) => {
        if(response.data.status === true){
            getUserList()
            toast.success('刪除成功');
        }else{
            toast.error(response.data.data)
        }
    })
    .catch( (error) => {
        showInternelErrorPageForMobile()
        toast.error(error)
    })

}

  function editUser(userId){
    //concole.log(userId)
    alert("修改 userId: "+userId)
  }

    const columns = [
        {
          title: '名稱',
          dataIndex: 'name',
          key: 'name',
          render: (name) => {
            return <div style={{
                'textAlign': 'center',
            }}>
              {name}
            </div>
            },
        },
          {
            title: '內容',
            dataIndex: 'content',
            key: 'content',
            render: (content) => {
              return <div style={{
                  'textAlign': 'center',
              }}>
                  <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                      {content[0]}
                      <br/>
                      {content[1]}
                      <br/>
                      {content[2]}
                      <br/>
                      {content[3]}
                      <br/>
                      {content[4]}
                      <br/>
                      {content[5]}
                      <br/>
                      {content[6]}
                      <br/>
                      {content[7]}
                      <br/>
                <div >
                    {/* <Button type="primary" onClick={() => queryUser(content[8])} style={{width: '70px' }}>
                        查看
                    </Button>
                    &nbsp; */}
                    <Button type="primary" onClick={() => removeUser(content[8])} danger style={{width: '70px'}}>
                        刪除
                    </Button>
                    </div>
              </div>
              </div>
              },
          },
      ];

    return (

        <div>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
            <Row>
                <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Button type="primary" onClick={getUserList} style={{
                            width: '100%',
                            height: '40px',
                            backgroundColor:'#008000',
                        }}>
                        搜尋
                    </Button>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Select allowClear placeholder="排序:默認時間近到遠" size={size} options={sortOptions} onChange={changeSort} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Input id="textQuery" placeholder="搜尋人名"  style={{
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
                    <Select allowClear id="citySelect" placeholder="銷售縣市" size={size} options={cityOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Select id="area" value={selectArea}  allowClear placeholder="銷售區域" size={size} options={areaOptions} onChange={changeArea} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Select allowClear placeholder="角色" size={size} options={roleOptions} onChange={changeRole} style={{
                            width: '100%',
                        }}>
                    </Select>
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
                dataSource={memberList}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                    }, // click row
                };}}
            />
            </Col>
            <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
        </Row>
        </div>
    );
};

export default MemberList;
