import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Space, message} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
// import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
        md: {
            span: 8,
        },
        lg: {
            span: 8,
        }
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 16,
        }
    },
};

// const defaultSaleType = 1;
// console.log(defaultSaleType)
const defaultExtraRequire = [];
const housesListUrl = 'house/getHouses'
const xToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWUxNDA1NzM0Mzg1MDAxZjE5MDg2NiIsInJvbGVzIjpbMiwzLDRdLCJpYXQiOiIyMDIyLTAzLTEzVDEzOjEyOjI5LjM5N1oifQ.i24MARH_Mc_H8BBl-S2LV0ibAy9KaTSjkCuoI648jvM"

const HousesList = () => {

    // const [form] = Form.useForm();

    // const [isUploadVisible, setIsIUploadVisible] = useState(false);
    // const [extraRequire, setExtraRequire] = useState(defaultExtraRequire);
    // const [ShowHideManageFee, setShowHideManageFee] = useState(false );
    // const [ShowHideGarbageFee, setShowHideGarbageFee] = useState(false );
    const [isRunPicPost, setIsRunPicPost] = useState(false)



    const getHousesArg ={
        start : '0',
        count : '10',
        timeSort : '1',
        priceSort : '',
        pingSort : '',
        isDelete : 'false',
        minPrice : '0',
        maxPrice : '9999999',
        minPing : '0',
        maxPing : '999999',
        minRoom : '0',
        maxRoom : '999999',
        salesCity : '',
        salesArea : '',
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
        
        let reqUrl = `${housesListUrl}?start=${getHousesArg.start}&&count=${getHousesArg.count}&&isDelete=${getHousesArg.isDelete}&&minPrice=${getHousesArg.minPrice}&&maxPrice=${getHousesArg.maxPrice}&&minPing=${getHousesArg.minPing}&&maxPing=${getHousesArg.maxPing}&&minRoom=${getHousesArg.minRoom}&&maxRoom=${getHousesArg.maxRoom}`
        
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
        ).then( (response) => console.log(response))
        .catch( (error) => message.error(`${error}`, 2))
    }
    

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function changeCity(city) {
        console.log(`selected city  ${city}`);
        // element.options.length = 0
        // element.value = typeOfRentalOptions
        // areaOptions = priceOptions
        // document.getElementById('citySelect').value = '基隆市'
    }

    const cityOptions = [{ value: '基隆市' }, { value: '台北市' }, { value: '新北市' }, { value: '桃園縣' }, { value: '新竹市' }, { value: '新竹縣' }, { value: '苗栗縣' }, { value: '台中市' }, { value: '彰化縣' }, { value: '南投縣' }, { value: '雲林縣' }, { value: '嘉義市' }, { value: '嘉義縣' }, { value: '台南市' }, { value: '高雄市' }, { value: '屏東縣' }, { value: '台東縣' }, { value: '花蓮縣' }, { value: '宜蘭縣' }, { value: '澎湖縣' }, { value: '金門縣' }, { value: '連江縣' }];
    const areaOptions = [{ value: '基隆市' }, { value: '台北市' }];
    const typeOfRentalOptions = [{ value: '整層住家' }, { value: '獨立套房' }, { value: '分租套房' }, { value: '雅房' }];
    const priceOptions = [{ value: '0-5000' }, { value: '5000-10000' }, { value: '10000-20000' }, { value: '20000-30000' }, { value: '30000-40000' }, { value: '40000 以上' }, { value: '自訂租金範圍' }];
    const roomOptions = [{ value: '1 房' }, { value: '2 房' }, { value: '3 房' }, { value: '4 房以上' }];
    const buildingTypeOptions = [{ value: '公寓' }, { value: '電梯大樓' }, { value: '透天' }];
    const pingOptions = [{ value: '10 坪以下' }, { value: '10 ~ 20 坪' }, { value: '20 ~ 30 坪' }, { value: '30 ~ 40 坪' }, { value: '40 ~ 50 坪' }, { value: '自訂坪數範圍' }];
    const floorOptions = [{ value: '1 層' }, { value: '2 層 ~ 6 層' }, { value: '6 層 ~ 12 層' }, { value: '12 層以上' }, { value: '自訂樓層範圍' }];
    const featureOptions = [{ value: '可養寵物' }, { value: '可吸菸' }, { value: '可開伙' }, { value: '有管理員' }, { value: '有車費' }, { value: '倒垃圾服務' }];




    const topOptions = [
        { label: 'topLeft', value: 'topLeft' },
        { label: 'topCenter', value: 'topCenter' },
        { label: 'topRight', value: 'topRight' },
        { label: 'none', value: 'none' },
      ];
      
      const bottomOptions = [
        { label: 'bottomLeft', value: 'bottomLeft' },
        { label: 'bottomCenter', value: 'bottomCenter' },
        { label: 'bottomRight', value: 'bottomRight' },
        { label: 'none', value: 'none' },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                //   <Tag color={color} key={tag}>
                //     {tag.toUpperCase()}
                //   </Tag>
                <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
                );
              })}
            </span>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

      

    return (

        <div>
           {/* <label style="width:10%">縣市</label> */}
           {/* 縣市:
            <Select placeholder="縣市" options={cityOptions} style={{
                            width: 80,
                        }}>
                
            </Select>
            &nbsp; 區域：
            <Select   allowClear placeholder="區域" onChange={handleChange} style={{
                            width: 100,
                        }}>
                <Option value="pet">文山區</Option>
                <Option value="smoke">大安區</Option>           
            </Select>
            &nbsp; 類型：
            <Select placeholder="類型" style={{
                            width: 100,
                        }}>
                <Option value="typeOfRental1">整層住家</Option>
                <Option value="typeOfRental2">獨立套房</Option>
                <Option value="typeOfRental3">分租套房</Option>
                <Option value="typeOfRental4">雅房</Option>
            </Select>
            <br/><br/>
            &nbsp; 租金：
            <Select placeholder="租金" style={{
                            width: 100,
                        }}>
                <Option value="rentLimit5000">0-5000</Option>
                <Option value="rentLimit10000">5000-10000</Option>
                <Option value="rentLimit20000">10000-20000</Option>
                <Option value="rentLimit30000">20000-30000</Option>
                <Option value="rentLimit40000">30000-40000</Option>
                <Option value="rentNoLimit">40000 以上</Option>
                <Option value="rentCustom">自訂租金範圍</Option>
            </Select>
            &nbsp; 格局：
            <Select placeholder="格局" style={{
                            width: 100,
                        }}>
                <Option value="room1">1 房</Option>
                <Option value="room2">2 房</Option>
                <Option value="room3">3 房</Option>
                <Option value="room4Up">4 房以上</Option>
            </Select>
            &nbsp; 型態：
            <Select placeholder="型態" style={{
                            width: 100,
                        }}>
                <Option value="buildingType1">公寓</Option>
                <Option value="buildingType2">電梯大樓</Option>
                <Option value="buildingType3">透天</Option>
            </Select>
            <br/><br/>
            &nbsp; 坪數：
            <Select placeholder="坪數" style={{
                            width: 100,
                        }}>
                <Option value="pingLimit10">10 坪以下</Option>
                <Option value="pingLimit20">10 ~ 20 坪</Option>
                <Option value="pingLimit30">20 ~ 30 坪</Option>
                <Option value="pingLimit40">30 ~ 40 坪</Option>
                <Option value="pingLimit50">40 ~ 50 坪</Option>
                <Option value="pingCustom">自訂坪數範圍</Option>
            </Select>
            &nbsp; 樓層：
            <Select placeholder="樓層" style={{
                            width: 100,
                        }}>
                <Option value="floorLimit1">1 層</Option>
                <Option value="floorLimit6">2 層 ~ 6 層</Option>
                <Option value="floorLimit12">6 層 ~ 12 層</Option>
                <Option value="floorNoLimit">12 層以上</Option>
                <Option value="floorCustom">自訂樓層範圍</Option>
            </Select>
            &nbsp; 特色：
            <Select  mode="multiple" allowClear placeholder="特色" onChange={handleChange} style={{
                            width: 100,
                        }}>
                <Option value="pet">可養寵物</Option>
                <Option value="smoke">可吸菸</Option>
                <Option value="cook">可開伙</Option>
                <Option value="manager">有管理員</Option>
                <Option value="parking">有車費</Option>
                <Option value="garbage">倒垃圾服務</Option>
                
            </Select>


            <br/><br/> */}


            <Button type="primary" onClick={getHousesList}>
                搜尋
            </Button>
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select id="citySelect" placeholder="縣市" options={cityOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="區域" options={areaOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="類型"  options={typeOfRentalOptions} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
            </Row>

            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="租金" options={priceOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="格局" options={roomOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="型態"  options={buildingTypeOptions} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
            </Row>
            
            <Row>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select placeholder="坪數" options={pingOptions} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select allowClear placeholder="樓層" options={floorOptions} onChange={changeCity} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Select mode="multiple" allowClear placeholder="特色"  options={featureOptions} style={{
                            width: '100%',
                        }}>
                    </Select>
                </Col>
            </Row>
            
            <Table
          columns={columns}
          pagination={{ position: ['topLeft', 'bottomRight'] }}
          dataSource={data}
        />
          

        </div>
    );
};

export default HousesList;
