import React, {useEffect, useState} from 'react';
import { Divider, Row, Col} from "antd";
import {config} from '../Setting/config'
import {CollectAxios} from './axiosApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

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
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
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
            <ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>
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
