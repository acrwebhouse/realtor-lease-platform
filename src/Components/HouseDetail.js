import React, {useEffect, useState} from 'react';
import {Table, Tag, Radio, Button, Image, Input, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import {
    useParams
  } from "react-router-dom";

const HouseDetail = () => {
    const { id } = useParams();
    return (
    
        <div>
            {console.log('HouseDetail')}
            {console.log(id)}
            {console.log('HouseDetail222')}
            <Row>
            <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}style={{
                            textAlign: 'center',
                        }}>{id}</Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>   
            </Row>
        </div>
    );
};

export default HouseDetail;
