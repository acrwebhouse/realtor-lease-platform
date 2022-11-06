import React, {useEffect, useState} from 'react';
import {Table, Button, Image, Divider, Row, Col, message, Alert, Space} from "antd";
import {
    useParams
  } from "react-router-dom";
import {HouseAxios} from './axiosApi'
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";
import {config} from '../Setting/config'

import {
    CloseSquareTwoTone,
  } from '@ant-design/icons';

import GoogleMapHouse from "./GoogleMapHouse";

const houseListUrl = 'house/getHouse'
const removeHouseUrl = 'house/removeHouse'

const HouseDetail = (prop) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [house, setHouse] = useState(true);
    const [housePhoto, setHousePhoto] = useState(['','','','','','','','','','']);
    const houseService = config.base_URL_House
    const [buildingType, setBuildingType] = useState('');
    const [typeOfRental, setTypeOfRental] = useState('');
    const [pattern, setPattern] = useState('');
    const [feature, setFeature] = useState('');
    const [traffic, setTraffic] = useState(null);
    const [life, setLife] = useState(null);
    const [educate, setEducate] = useState(null);
    const [annex, setAnnex] = useState(null);
    const [phone, setPhone] = useState('');
    const [lineId, setLineId] = useState('');
    const [mail, setMail] = useState('');
    const [remark, setRemark] = useState('');
    const [owner, setOwner] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false);
    const [hostGender, setHostGender] = useState('');
    const [showFloor2, setShowFloor2] = useState('');



    const fallback ='data:image/png;base64,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'
      
      const columns = [
        {
            title: '序號',
            dataIndex: 'index',
            key: 'index',
            render: (index) => {
              return index
            }
          },
        {
          title: '名稱',
          dataIndex: 'name',
          key: 'name',
          render: (name) => {
            return name
          }
        },
        {
            title: '類型',
            dataIndex: 'type',
            key: 'type',
            render: (type) => {
              return type
            }
        }
        //暫時註解,未來開放
        // ,
        // {
        //     title: '距離(公尺)',
        //     dataIndex: 'distance',
        //     key: 'distance',
        //     render: (distance) => {
        //       return distance
        //     }
        // },
      ];

      const annexColumns = [
        {
            title: '序號',
            dataIndex: 'index',
            key: 'index',
            render: (index) => {
              return index
            }
          },
        {
          title: '檔案',
          dataIndex: 'content',
          key: 'content',
          render: (content) => (
            <div style={{
                'textAlign': 'center',
            }}>
               <div style={{
                'display': 'inline-block',
                'textAlign': 'left',
                }}>
                <a href={content[1]}>{content[0]}</a>
                </div>
            </div>
          ),
        }
      ];


    const getHouse = () => {
        let reqUrl = `${houseListUrl}?id=${id}&&isDelete=false`
        HouseAxios.get(
            reqUrl,{}
        )
        .then( (response) => {
            setHouse(response)
            resolveHouse(response)
        })
        .catch( (error) => message.error(error, 3))
    }

    function changeBuildType(house){
        switch(house.config.buildingType){
            case 1 :
                setBuildingType("公寓");
                break ;
            case 2 :
                setBuildingType("電梯大樓");
                break ;
            case 3 :
                setBuildingType("透天");
                break ;
            default:
                setBuildingType("未知");

        }
    }

    function changeTypeOfRental(house){
        if(house.saleInfo){
            switch(house.saleInfo.typeOfRental){
                case 1 :
                    setTypeOfRental("整層住家");
                    break ;
                case 2 :
                    setTypeOfRental("獨立套房");
                    break ;
                case 3 :
                    setTypeOfRental("分租套房");
                    break ;
                case 4 :
                    setTypeOfRental("雅房");
                    break ;
                default:
                    setTypeOfRental("未知");
            }
        }
    }

    function changeTraffic(house){
        if(house.traffic){
            const items = house.traffic
            const saveTraffic = []
            for(let i =0 ;i<items.length;i++){
                const item = items[i]
                item.index = i+1
                switch(item.type*1){
                    case 1 :
                        item.type = '捷運站'
                        break;
                    case 2 :
                        item.type = '公車站/客運站'
                        break;
                    case 3 :
                        item.type = '火車站'
                        break;
                    case 4 :
                        item.type = '高鐵站'
                        break;
                    case 5 :
                        item.type = '機場'
                        break;
                    default:
                }
                saveTraffic.push(item)
            }
            setTraffic(saveTraffic)
        }
      
    }

    function changeLife(house){
        if(house.life){
            const items = house.life
            const saveLife = []
            for(let i =0 ;i<items.length;i++){
                const item = items[i]
                item.index = i+1
                switch(item.type*1){
                    case 1 :
                        item.type = '夜市'
                        break;
                    case 2 :
                        item.type = '科學園區'
                        break;
                    case 3 :
                        item.type = '計畫區'
                        break;
                    case 4 :
                        item.type = '重劃區'
                        break;
                    case 5 :
                        item.type = '傳統商區'
                        break;
                    default:
                }
                saveLife.push(item)
            }
            setLife(saveLife)
        }
      
    }


    function changeEducate(house){
        if(house.educate){
            const items = house.educate
            const saveEducate = []
            for(let i =0 ;i<items.length;i++){
                const item = items[i]
                item.index = i+1
                switch(item.type*1){
                    case 1 :
                        item.type = '幼稚園'
                        break;
                    case 2 :
                        item.type = '小學'
                        break;
                    case 3 :
                        item.type = '國中'
                        break;
                    case 4 :
                        item.type = '高中/高職'
                        break;
                    case 5 :
                        item.type = '大學/科大'
                        break;
                    default:
                }
                saveEducate.push(item)
            }
            setEducate(saveEducate)
        }
      
    }

    function changePattern(house){
        if(house.config){
            let data = `${house.config.room} 房 ${house.config.livingRoom} 廳`
            if(house.config.bathroom){
                data = data + ` ${house.config.bathroom} 衛`
            }else{
                data = data + ` 0 衛`
            }
            if(house.config.balcony){
                data = data + ` ${house.config.balcony} 陽台`
            }else{
                data = data + ` 0 陽台`
            }
            setPattern(data)
        }
        
    }
    

    function changeFeature(house){
        let data = ''
        if(house.parking === true){
            data = data + ' 有車位'
        }

        if(house.saleInfo){
            if(house.saleInfo.pet === true){
                data = data + ' 可養寵物'
            }
            if(house.saleInfo.smoke === true){
                data = data + ' 可抽煙'
            }
            if(house.saleInfo.cook === true){
                data = data + ' 可開伙'
            }

            if(house.saleInfo.manager === true){
                data = data + ' 管理人('+house.saleInfo.managerPrice+' 元 / 月)'
            }

            if(house.saleInfo.garbage === true){
                data = data + ' 收垃圾('+house.saleInfo.garbagePrice+' 元 / 月)'
            }

        }
        if(data === ''){
            setFeature('無')
        }else{
            setFeature(data)
        }
    }

    function resolveHouse(response){
        if(response.data.status){
            const data = response.data.data
            setHouse(data)
            changeHousePhoto(data)
            changeTraffic(data)
            changeLife(data)
            changeEducate(data)
            changeHouseAnnex(data)
            changeBuildType(data)
            changeTypeOfRental(data)
            changeFeature(data)
            changePattern(data)
            setHost(data)
            changeRemark(data)
            changeAddressDetail(data)
            let hostGender = ''
            if(data.hostGender === false){
                hostGender = hostGender + ' 小姐'
             }else{
                hostGender = hostGender + ' 先生'
            }
            if(data.floor2 !== null && data.floor2 !== undefined && data.floor2 !== ''){
                setShowFloor2(' 之 '+data.floor2)
            }
            setHostGender(hostGender)
        }
        
    }

    function changeAddressDetail(house){
        const houseNumber = house.houseNumber
        let value = ''
        if(houseNumber.lane !== null && houseNumber.lane !== ''&& houseNumber.lane !==undefined){
            value = value+houseNumber.lane+'巷'
        }
        if(houseNumber.alley !== null && houseNumber.alley !== ''&& houseNumber.alley !==undefined){
            value = value+houseNumber.alley+'弄'
        }
        if(houseNumber.number1 !== null && houseNumber.number1 !== ''&& houseNumber.number1 !==undefined){
            value = value+houseNumber.number1+'號'
            if(houseNumber.number2 !== null && houseNumber.number2 !== ''&& houseNumber.number2 !==undefined){
                value = value+'之'+houseNumber.number2
            }
        }

        setAddressDetail(value)
    }

    function changeRemark(house){
        if(house.remark !== null && house.remark !== undefined){
            setRemark(house.remark)
        }else{
            setRemark('無')
        }
    }

    function setHost(data){
        let name = data.ownerDetail.name[0]
        if(data.ownerDetail.gender === false){
            name = name + ' 小姐'
        }else{
            name = name + ' 先生'
        }
        setOwner(name)
        setPhone(data.ownerDetail.phone)
        setMail(data.ownerDetail.mail)
        setLineId(data.ownerDetail.lineId)
    }

    function basename(str) {
        var idx = str.lastIndexOf('/')
        idx = idx > -1 ? idx : str.lastIndexOf('\\')
        if (idx < 0) {
          return str
        }
        return str.substring(idx + 1);
      }

    function changeHouseAnnex(house){
        let annex = house.annex
        if(annex){
            const items = []
            for(let i = 0 ;i<annex.length;i++){
                annex[i] = `${houseService}/resource/${house._id}/annex/${annex[i]}`
                
                const item = {
                    index : i+1,
                    content :[basename(annex[i]),annex[i]]
    
                }
                items.push(item)
            }
            setAnnex(items)
        }
    }

    function changeHousePhoto(house){
        let photo = house.photo
        for(let i = 0 ;i<photo.length;i++){
            photo[i] = `${houseService}/resource/${house._id}/photo/${photo[i]}`
        }
        setHousePhoto(photo)
    }

    function editHouse(){
        const url = window.location.origin + '/HouseDetailOwnerEdit/'+id+'/'+house.owner
        window.location.href = url;
    }


    function cancelRemoveHouse(){
        setIsShowDeleteAlert(false)
    }

    function removeHouse(){
        setIsShowDeleteAlert(true)
    }

    function closePage(){
        window.close();
    }

    function shareLink(){
        const url = window.location.origin + '/HouseDetail/'+id
        const dummy = document.createElement('input') 
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        message.success('連結已複製到剪貼簿', 3);
    }

    function phoneClick(phoneNumber){
        let a = document.createElement('a');
        a.href = 'tel:'+phoneNumber;
        document.body.appendChild(a);
        a.click()
    }

    function lineClick(lineId){
        console.log('===lineId===',lineId)
        let strWindowFeatures = `
            height=600,
            width=600,
        `;
        window.open('https://line.me/ti/p/~'+lineId,'加入好友',strWindowFeatures)
    }

    const reserveLink = () => {

    }

    function removeHouseAction(){
        const houseId = id
        const reqUrl = `${removeHouseUrl}`
        const xToken = cookie.load('x-token')
        HouseAxios.delete(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                },
                data: {
                    ids: [houseId]
                }
            }
        )
        .then( (response) => {
            if(response.data.status === true){
                message.success('刪除成功', 3);
                setTimeout(()=>{
                    window.location.href = window.location.origin;
                },3000);
            }else{
                message.error(response.data.data, 3)
            }
        })
        .catch( (error) => message.error(error, 3))
        cancelRemoveHouse()
    }

    useEffect(() => {
        if (init) {
            if(prop.setId !== null && prop.setId !== undefined){
                id = prop.setId
            }
            setInit(false)
            getHouse()
            
        }
    }, )
    return (
        <div>
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

            {
                prop.isOwner?(<div Style='float:right'>
                    <Button type="primary" onClick={() => removeHouse()} danger style={{width: '70px'}}>
                        刪除
                    </Button>
                </div>):null   
            }

            {
                prop.isOwner && prop.isAdmin === false ?(<div Style='float:right'>
                    <Button type="primary" onClick={() => editHouse()} style={{width: '70px',backgroundColor : '#00cc00' }}>
                        編輯
                    </Button>
                    &nbsp; 
                </div>):null   
            }

            

            {/* <div style={{'position':'sticky' ,'top':'0px' ,'float':'right','zIndex':100 }}>
                <Button   onClick={() => closePage()} style={{ 'backgroundColor': 'transparent','borderColor':'transparent', 'textAlign': 'center',width: '50px'}}>
                        <CloseSquareTwoTone style={{ fontSize: '25px' }} />
                    </Button></div> */}

            <Divider>基本資料</Divider>
            <Row>
                <Col xs={24} sm={4} md={4} lg={4} xl={4}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                            width: '100%',
                            height:'500px',
                            overflow:'hidden',
                        }}>                            
                        <Image  src={housePhoto[0]} fallback={fallback} />                          
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                            width: '100%',
                        }}>
                    <div style={{
                        'display': 'inline-block',
                        'textAlign': 'left',
                        }}>                                
                        <div style={{
                        'color': '#0000ff',
                        'fontSize':'40px'
                        }}>{`${house.name}`}</div>
                  
                        <div style={{
                        'color':'#FF0000',
                        'fontSize':'20px'
                        }}>{`價格：${house.price}元 / 月`}</div>
                        {
                            prop.isOwner?(
                                <div style={{'fontSize':'15px'}}>{`地址：${house.address}${addressDetail}`}</div>
                            ):<div style={{'fontSize':'15px'}}>{`地址：${house.address}`}</div>
                        }
                        <div style={{'fontSize':'15px'}}>{`格局：${pattern}`}</div>  
                        <div style={{'fontSize':'15px'}}>{`空間：${house.ping} 坪`}</div> 
                        <div style={{'fontSize':'15px'}}>{`類型：${typeOfRental}`}</div>
                        <div style={{'fontSize':'15px'}}>{`型態：${buildingType}`}</div>
                        <div style={{'fontSize':'15px'}}>{`樓層：${house.floor}${showFloor2} 樓 / ${house.totalFloor} 樓`}</div>
                        {
                            prop.isOwner&&house.room && house.room !== ''&& house.room !==undefined?(
                                <div style={{'fontSize':'15px'}}>{`房間${house.room} ${hostGender}`}</div>
                            ):null   
                        }
                        {
                            prop.isOwner?(
                                <div style={{'fontSize':'15px'}}>{`屋主：${house.hostName} ${hostGender}`}</div>
                            ):null   
                        }
                        {
                            prop.isOwner?(
                                <div style={{'fontSize':'15px'}}>{`屋主電話：${house.hostPhone}`}</div>
                            ):null   
                        }
                        <div style={{'fontSize':'10px'}}>{`特色：${feature}`}</div>
                        {
                            prop.isOwner?(
                                <div style={{'fontSize':'10px',width: '200px'}}>{`備註：${remark}`}</div>
                            ):null   
                        }
                        
                        <br/>
                        <div>
                            <Button type="primary" onClick={() => shareLink()} style={{width: '100px',backgroundColor : '#00cc00' }}>
                                複製連結
                            </Button>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            {/*<Button type="primary" onClick={() => reserveLink()} style={{width: '100px',backgroundColor : '#00cc00' }}>*/}
                            {/*    我要看房*/}
                            {/*</Button>*/}
                        </div>

                        <br/>

                        <div style={{'fontSize':'15px' ,'borderRadius': '30px','borderStyle':'solid','borderColor':'#FFAC55','backgroundColor':'#FFE4CA' }}>
                            <br/>
                            <div >&nbsp;&nbsp;{`聯絡人：${owner}`}</div>
                            <br/>
                            &nbsp;&nbsp;<Button type="primary" onClick={() => phoneClick(phone)} style={{width: '135px' }}>
                                電話聯絡
                            </Button>
                            {
                                lineId !== null && lineId !== undefined && lineId !== ''?(
                                    <Button type="primary" onClick={() => lineClick(lineId)} style={{marginLeft: '20px', width: '135px',backgroundColor : '#00cc00' }}>
                                        line 加好友
                                    </Button>
                                ):null           
                            }
                            <br/>
                            <br/>
                        </div>
                        <br/>
                        
                        {/* {JSON.stringify(house)} */}
                    </div>           
                </Col>
                <Col xs={24} sm={4} md={4} lg={4} xl={4}></Col> 
            </Row>

            <Divider>照片</Divider>

            <Row>
            <Col xs={24} sm={2} md={2} lg={2} xl={2}></Col>
                <Col xs={24} sm={20} md={20} lg={20} xl={20}style={{
                            textAlign: 'center',
                            
                        }}>
                            
                <Image.PreviewGroup>

                    {
                        housePhoto.length>0?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[0]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

{
                        housePhoto.length>1?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[1]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

{
                        housePhoto.length>2?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[2]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

{
                        housePhoto.length>3?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[3]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

{
                        housePhoto.length>4?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[4]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

{
                        housePhoto.length>5?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[5]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

{
                        housePhoto.length>6?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[6]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

{
                        housePhoto.length>7?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[7]} fallback={fallback} />
                         </div>
                        ):null                  
                    }

                    {
                        housePhoto.length>8?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[8]} fallback={fallback} />
                         </div>
                        ):null                  
                    }
                    
                    {
                        housePhoto.length>9?(
                        <div style={{
                            height:'300px',
                            overflow:'hidden',
                            display: 'inline-block',
                        }}>
                        <Image width={300}  src={housePhoto[9]} fallback={fallback} />
                         </div>
                        ):null                  
                    }
                </Image.PreviewGroup>
                            
                </Col>
            <Col xs={24} sm={2} md={2} lg={2} xl={2}></Col>   
            </Row>
            
            {
            prop.isOwner?(
            <div>
            <Divider>附件</Divider>
            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>
                            
                    <Table
                        columns={annexColumns}
                        dataSource={annex}
                        onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {
                        
                        }, // click row
                    };}}
            />        
                </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row> 
            </div>):null    
            }

            <Divider>交通資訊</Divider>
            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>
                            
                    <Table
                        columns={columns}
                        dataSource={traffic}
                        onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {
                        
                        }, // click row
                    };}}
            />        
                </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row> 

            <Divider>生活資訊</Divider>
            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>
                            
                    <Table
                        columns={columns}
                        dataSource={life}
                        onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {
                        
                        }, // click row
                    };}}
            />        
                </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row> 
            <Divider>教育資訊</Divider>
            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>
                            
                    <Table
                        columns={columns}
                        dataSource={educate}
                        onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {
                        
                        }, // click row
                    };}}
            />        
                </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row> 
            
            <Divider>地圖位置</Divider>
            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>
                            
                <GoogleMapHouse/>
                    
                </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row> 

        </div>
        </div>
    );
};

export default HouseDetail;
