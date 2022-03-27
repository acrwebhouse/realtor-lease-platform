import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
import { defaultIconPrefixCls } from 'antd/lib/config-provider';
// import { UploadOutlined } from '@ant-design/icons';
// import { Text, StyleSheet } from "react-native";


const { Option } = Select;

const housesListUrl = 'house/getHouses'
const xToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"

const HousesList = () => {
    const cityOptions = [{ value: '縣市不限' },{ value: '基隆市' }, { value: '台北市' }, { value: '新北市' }, { value: '桃園縣' }, { value: '新竹市' }, { value: '新竹縣' }, { value: '苗栗縣' }, { value: '台中市' }, { value: '彰化縣' }, { value: '南投縣' }, { value: '雲林縣' }, { value: '嘉義市' }, { value: '嘉義縣' }, { value: '台南市' }, { value: '高雄市' }, { value: '屏東縣' }, { value: '台東縣' }, { value: '花蓮縣' }, { value: '宜蘭縣' }, { value: '澎湖縣' }, { value: '金門縣' }, { value: '連江縣' }];
    const areaOptions = [{ value: '區域不限' },{ value: '基隆市' }, { value: '台北市' }];
    const typeOfRentalOptions = [{ value: '類型不限' },{ value: '整層住家' }, { value: '獨立套房' }, { value: '分租套房' }, { value: '雅房' }];
    const priceOptions = [{ value: '租金不限' },{ value: '0 - 5000 元' }, { value: '5000 - 10000 元' }, { value: '10000 - 20000 元' }, { value: '20000 - 30000 元' }, { value: '30000 - 40000 元' }, { value: '40000 以上元' }, { value: '自訂租金範圍' }];
    const roomOptions = [{ value: '格局不限' },{ value: '1 房' }, { value: '2 房' }, { value: '3 房' }, { value: '4 房以上' }];
    const buildingTypeOptions = [{ value: '型態不限' },{ value: '公寓' }, { value: '電梯大樓' }, { value: '透天' }];
    const pingOptions = [{ value: '坪數不限' },{ value: '10 坪以下' }, { value: '10 - 20 坪' }, { value: '20 - 30 坪' }, { value: '30 - 40 坪' }, { value: '40 - 50 坪' }, { value: '自訂坪數範圍' }];
    const floorOptions = [{ value: '樓層不限' },{ value: '1 層' }, { value: '2 - 6 層' }, { value: '6 - 12 層' }, { value: '12 層以上' }, { value: '自訂樓層範圍' }];
    const featureOptions = [{ value: '可養寵物' }, { value: '可吸菸' }, { value: '可開伙' }, { value: '有管理員' }, { value: '有車位' }, { value: '倒垃圾服務' }];
    const sortOptions = [{ value: '時間近到遠' },{ value: '時間遠到近' }, { value: '租金便宜到貴' }, { value: '租金貴到便宜' }, { value: '坪數小到大' }, { value: '坪數大到小' }];
    const [isRunPicPost, setIsRunPicPost] = useState(false)

    const [houses, setHouses] = useState([]);
    const [isCustomPrice, setIsCustomPrice] = useState(false);
    const [isCustomPing, setIsCustomPing] = useState(false);
    const [isCustomFloor, setIsCustomFloor] = useState(false);

    const getHousesArg ={
        start : '0',
        count : '9999999',
        timeSort : '-1',
        priceSort : '',
        pingSort : '',
        isDelete : 'false',
        minPrice : '0',
        maxPrice : '9999999',
        minPing : '0',
        maxPing : '999999',
        minRoom : '0',
        maxRoom : '999999',
        minFloor : '0',
        maxFloor : '999999',
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
    }


    useEffect(() => {
        // console.log(RegisterData)
        // console.log(CityAreaScope)
        if (isRunPicPost) {
            // HouseAxios.post(House_Auth, XToken)
            //     .then( (response) => console.log(response))
            //     .then(() => message.success(`成功`, 2))
            //     .catch( (error) => message.error(`${error}`, 2))

            // setIsRunPicPost(false)
        }
    }, [isRunPicPost, ])

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
        if(getHousesArg.city !==''){
            reqUrl = `${reqUrl}&&city=${getHousesArg.city}`
        }
        if(getHousesArg.area !==''){
            reqUrl = `${reqUrl}&&area=${getHousesArg.area}`
        }
        if(getHousesArg.parking !==''){
            reqUrl = `${reqUrl}&&parking=${getHousesArg.parking}`
        }
        if(getHousesArg.pet !==''){
            reqUrl = `${reqUrl}&&pet=${getHousesArg.pet}`
        }
        if(getHousesArg.manager !==''){
            reqUrl = `${reqUrl}&&manager=${getHousesArg.manager}`
        }
        if(getHousesArg.garbage !==''){
            reqUrl = `${reqUrl}&&garbage=${getHousesArg.garbage}`
        }
        if(getHousesArg.smoke !==''){
            reqUrl = `${reqUrl}&&smoke=${getHousesArg.smoke}`
        }
        if(getHousesArg.cook !==''){
            reqUrl = `${reqUrl}&&cook=${getHousesArg.cook}`
        }
        if(getHousesArg.typeOfRental !==''){
            reqUrl = `${reqUrl}&&typeOfRental=${getHousesArg.typeOfRental}`
        }
        if(getHousesArg.buildingType !==''){
            reqUrl = `${reqUrl}&&buildingType=${getHousesArg.buildingType}`
        }
        if(getHousesArg.timeSort !==''){
            reqUrl = `${reqUrl}&&timeSort=${getHousesArg.timeSort}`
        }
        if(getHousesArg.pingSort !==''){
            reqUrl = `${reqUrl}&&pingSort=${getHousesArg.pingSort}`
        }
        if(getHousesArg.priceSort !==''){
            reqUrl = `${reqUrl}&&priceSort=${getHousesArg.priceSort}`
        }
        console.log('====reqUrl===',reqUrl)
        HouseListAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
        // .then( (response) => console.log(response))
        .then( (response) => {
            resolveHousesList(response)
            console.log(data)
        })
        .catch( (error) => alert(error))
    }
    
    function resolveHousesList(response){
        console.log('====response===',response)
        data = []
        if(response.data && response.data.data){
            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){
                const item = {
                    key: i,
                    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25-%E5%8F%B0%E5%8C%97101-%E4%BD%B3%E4%BD%9C12-%E5%88%A9%E5%8B%9D%E7%AB%A0-%E5%94%AF%E6%88%91%E7%8D%A8%E5%B0%8A-101%E4%BF%A1%E7%BE%A9%E8%B7%AF-1590736305.jpg?crop=0.752xw:1.00xh;0.118xw,0&resize=640:*',
                    price: items[i].price,
                    address: `地址 : ${items[i].address}`,
                    content: [items[i].name, `地址 : ${items[i].address}`, `坪數 : ${items[i].ping}`, `樓層 : ${items[i].floor}`],
                    }
                if(items[i].saleInfo){
                    switch(items[i].saleInfo.typeOfRental){
                        case 1 :
                            item.content.push('類型 : 整層住家')
                            break;
                        case 2 :
                            item.content.push('類型 : 獨立套房')
                            break;
                        case 3 :
                            item.content.push('類型 : 分租套房')
                            break;
                        case 4 :
                            item.content.push('類型 : 雅房')
                            break;
                        default:

                    }
                }
                
                if(items[i].traffic.length >0){
                    item.content.push(`交通 : 距${items[i].traffic[0].name} ${items[i].traffic[0].distance} 公尺`)
                }
                if(items[i].life.length >0){
                    item.content.push(`生活 : 距${items[i].life[0].name} ${items[i].life[0].distance} 公尺`)
                }
                if(items[i].educate.length >0){
                    item.content.push(`教育 : 距${items[i].educate[0].name} ${items[i].educate[0].distance} 公尺`)
                }
                item.content.push(`更新時間 : ${items[i].updateTime}`)
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
        console.log(`selected city  ${city}`);
        if(cityOptions[0] == city){

        }else{
            getHousesArg.city = city
            getHousesArg.area = ''
        }
        console.log(getHousesArg)
    }

    function changeArea(area) {
        getHousesArg.area = area
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
                getHousesArg.maxPrice = 999999;
                break;
            case priceOptions[7].value:
                customPrice.style.display = 'flex'
                setIsCustomPrice(true)
                getHousesArg.minPrice = 0
                getHousesArg.maxPrice = 0
                break;
            default:
                getHousesArg.minPrice = 0
                getHousesArg.maxPrice = 999999
        }
        console.log(getHousesArg)
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
                getHousesArg.maxRoom = 999999;
                break;
            default:
                getHousesArg.minRoom = '0'
                getHousesArg.maxRoom = '999999'
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
                getHousesArg.maxPing = '999999'
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
                getHousesArg.maxFloor = 9999999;
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
                getHousesArg.maxFloor = 999999;
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
          title: '影像',
          dataIndex: 'image',
          key: 'image',
          width:'150px',
          render: (image) => {
            return <Image
            src = {image}
            />
            },
        },
        // {
        //   title: '價格',
        //   dataIndex: 'price',
        //   key: 'price',
        //   width:'100px',
        //   render: (price) => {
        //     return <div >{price}</div>
        //     },
        // },
        {
          title: '內容',
          key: 'content',
          dataIndex: 'content',
        //   width:'100px',
          render: (content) => (
            <div style={{
                'text-align': 'center',
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
                  {content[8]}
              
            </div>
          ),
        },
        {
          title: '價格',
          dataIndex: 'price',
          key: 'price',
        //   width:'100px',
          render: (price) => {
            return <div style={{
                'text-align': 'center',
            }}>{price}</div>
            },
        },
      ];
      
      let data = [
        {
          key: '1',
          image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/25-%E5%8F%B0%E5%8C%97101-%E4%BD%B3%E4%BD%9C12-%E5%88%A9%E5%8B%9D%E7%AB%A0-%E5%94%AF%E6%88%91%E7%8D%A8%E5%B0%8A-101%E4%BF%A1%E7%BE%A9%E8%B7%AF-1590736305.jpg?crop=0.752xw:1.00xh;0.118xw,0&resize=640:*',
          price: 10000,
          address: 'New York No. 1 Lake Park',
          content: ['文山區好房子', '台北市文山區興隆路二段', '獨立套房','萬芳醫院站200公尺'],
        }
      ];

      

    return (

        <div>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Button type="primary" onClick={getHousesList} style={{
                            width: '100%',
                        }}>
                        搜尋
                    </Button>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="排序:默認時間近到遠" options={sortOptions} onChange={changeSort} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Input placeholder="文字搜尋 : 請輸入捷運站名,公車站名"  style={{
                            width: '100%',
                        }}>
                    </Input>
                </Col>
            </Row>

            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select id="citySelect" placeholder="縣市" options={cityOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="區域" options={areaOptions} onChange={changeArea} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="類型"  options={typeOfRentalOptions} onChange={changeTypeOfRental} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
            </Row>

            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select mode="multiple" allowClear placeholder="特色"  options={featureOptions} onChange={changeFeature} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="格局" options={roomOptions} onChange={changeRoom} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="型態"  options={buildingTypeOptions} onChange={changeBuildingType} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
            </Row>
            
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="租金" options={priceOptions} onChange={changePrice} style={{
                            width: '100%',
                        }}>
                    </Select>
                    
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="坪數" options={pingOptions} onChange={changePing} style={{
                            width: '100%',
                        }}>
                    </Select>
                    
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="樓層" options={floorOptions} onChange={changeFloor} style={{
                            width: '100%',
                        }}>
                    </Select>
                    
                </Col>
            </Row>
            
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span id="customPrice" style={{
                            width: '100%',
                            display: 'none'
                            }}>
                        自訂租金：
                        <Input id="minCustomPrice" placeholder="最低租金(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomPrice" placeholder="最高租金(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                    </span>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span id="customPing" style={{
                            width: '100%',
                            display: 'none'
                            }}>
                        自訂坪數：
                        <Input id="minCustomPing" placeholder="最低坪數(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomPing" placeholder="最高坪數(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                    </span>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <span id="customFloor" style={{
                            width: '100%',
                            display: 'none'
                            }}>
                        自訂樓層：
                        <Input id="minCustomFloor" placeholder="最低樓層(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <Input id="maxCustomFloor" placeholder="最高樓層(請輸入數字)"  style={{
                                width: '37%',
                            }}>
                        </Input>
                    </span>
                </Col>
            </Row>

            <Table
          columns={columns}
          pagination={{ position: ['topLeft', 'bottomRight'] }}
        //   dataSource={data}
        dataSource={houses}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                  console.log('event',event)
                  console.log('record',record)
                  console.log('rowIndex',rowIndex)
                  alert("進入詳細資料")
              }, // click row
            };}}
        />
        </div>
    );
};

export default HousesList;
