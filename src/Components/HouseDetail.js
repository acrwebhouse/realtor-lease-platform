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

    const getHouse = () => {
        let reqUrl = `${houseListUrl}?id=${id}&&isDelete=false`
        HouseAxios.get(
            reqUrl,{}
        )
        .then( (response) => {
            setHouse(response)
        })
        .catch( (error) => message.error(error, 3))
    }

    useEffect(() => {
        if (init) {
            setInit(false)
            getHouse()
        }
    }, )
    return (
    
        <div>
            {console.log('HouseDetail')}
            {console.log(id)}
            {console.log('HouseDetail222')}
            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>{JSON.stringify(house)}</Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row>
        </div>
    );
};

export default HouseDetail;
