import React, {useEffect, useState} from 'react';
import { Divider, Row, Col, message} from "antd";
import {config} from '../Setting/config'
import {CollectAxios} from './axiosApi'

const collectGetDataUrl = 'collect/getData'

const Collect = (props) => {
    const [init, setInit] = useState(true);
    const [data, setData] = useState({});

    function getData(){
            const reqUrl = `${collectGetDataUrl}`
            CollectAxios.get(
                reqUrl
            )
            .then( (response) => {
                setData(response.data.data)
            })
            .catch( (error) => message.error(error, 3))
    }

    useEffect(() => {
        if (init) {
            setInit(false)
            console.log('init')
            getData()
        }
    }, )

    return (

        <div>
            <br/><br/>
            <Divider>資料採集</Divider>
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
                    瀏覽次數:&nbsp;{data.accessTime}<br/><br/>
                    更新時間:&nbsp;{new Date(data.updateTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}<br/><br/>                                       
                </div>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>                      
        </div>
    );
};

export default Collect;
