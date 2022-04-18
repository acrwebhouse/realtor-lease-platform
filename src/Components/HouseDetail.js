import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import {
    useParams
  } from "react-router-dom";
  import {HouseAxios} from './axiosApi'
  const houseListUrl = 'house/getHouse'

const HouseDetail = () => {
    const { id } = useParams();
    const [init, setInit] = useState(true);
    const [house, setHouse] = useState(true);
    const [housePhoto, setHousePhoto] = useState(['','','','','','','','','','']);
    const houseService = 'http://35.201.152.0:5000'
    const [buildingType, setBuildingType] = useState("");

    const fallback ='data:image/png;base64,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'

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
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
      ];

    const getHouse = () => {
        let reqUrl = `${houseListUrl}?id=${id}&&isDelete=false`
        HouseAxios.get(
            reqUrl,{}
        )
        .then( (response) => {
            setHouse(response)
            resolveHouse(response)
            // changeBuildType()
        })
        .catch( (error) => message.error(error, 3))
    }

    function changeBuildType(){
        console.log('==house.config.buildingType====',house.config.buildingType)
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

        }
    }

    function resolveHouse(response){
        let photo = response.data.data.photo
        if(response.data.status){
            setHouse(response.data.data)
            for(let i = 0 ;i<photo.length;i++){
                photo[i] = `${houseService}/resource/${response.data.data._id}/photo/${photo[i]}`
            }
            console.log(photo)
            setHousePhoto(photo)
        }
        
    }

    useEffect(() => {
        if (init) {
            setInit(false)
            getHouse()
            
        }
    }, )
    return (
    
        <div>
            <Divider>基本資料</Divider>
            <Row>
                <Col xs={24} sm={4} md={4} lg={4} xl={4}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                            width: '100%',
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
                        'fontSize':'20px'
                        }}>{`名稱：${house.name}`}</div>
                  
                        <div style={{
                        'color':'#FF0000',
                        'fontSize':'20px'
                        }}>{`價格：${house.price}元 / 月`}</div>
                        {/* <br/> */}
                        {/* {  <div style={{'fontSize':'15px'}}>{`地址：${house.address} ${house.houseNumber.lane}巷 ${house.houseNumber.alley}弄 ${house.houseNumber.number1}號 之 ${house.houseNumber.number2}號`}</div> } */}
   
                        <div style={{'fontSize':'15px'}}>{`空間：${house.ping}坪`}</div> 
                        <div style={{'fontSize':'15px'}}>{`類型：`}</div>
                        <div style={{'fontSize':'15px'}}>{`型態：`}</div>
                        <div style={{'fontSize':'15px'}}>{`樓層：`}</div>
                        <div style={{'fontSize':'15px'}}>{`停車：`}</div>
                        <div style={{'fontSize':'15px'}}>{`特色：`}</div>
                        <div style={{'fontSize':'15px'}}>{`聯絡人：`}</div>
                        <div style={{'fontSize':'15px'}}>{`姓名`}</div>
                        <div style={{'fontSize':'15px'}}>{`電話：`}</div>
                        <div style={{'fontSize':'15px'}}>{`信箱：`}</div>
                        <br/>
                    </div>           
                </Col>
                <Col xs={24} sm={4} md={4} lg={4} xl={4}></Col> 
            </Row>


            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>
                            
                            {/* {JSON.stringify(house)} */}
                <Image.PreviewGroup>

                    {
                        housePhoto.length>0?(<Image width={200} src={housePhoto[0]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>1?(<Image width={200} src={housePhoto[1]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>2?(<Image width={200} src={housePhoto[2]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>3?(<Image width={200} src={housePhoto[3]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>4?(<Image width={200} src={housePhoto[4]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>5?(<Image width={200} src={housePhoto[5]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>6?(<Image width={200} src={housePhoto[6]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>7?(<Image width={200} src={housePhoto[7]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>8?(<Image width={200} src={housePhoto[8]} fallback={fallback} />):null                  
                    }

                    {
                        housePhoto.length>9?(<Image width={200} src={housePhoto[9]} fallback={fallback} />):null                  
                    }
                    
                </Image.PreviewGroup>
                            
                </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row>

            <Divider>交通資訊</Divider>

            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>
                            
                            <Table
                columns={columns}
                // pagination={{ position: ['topLeft', 'bottomRight'] }}
                dataSource={dataSource}
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
            <Divider>教育資訊</Divider>

        </div>
    );
};

export default HouseDetail;
