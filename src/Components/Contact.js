import React, {} from 'react';
import { Divider, Row, Col} from "antd";
import {config} from '../Setting/config'

const Contact = (props) => {
    
    return (

        <div>
            <br/><br/>
            <Divider>聯絡方式</Divider>
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
                    聯絡電話:&nbsp;{config.contactPhone}<br/><br/>
                    聯絡信箱:&nbsp;{config.contactMail}<br/><br/>                                       
                </div>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}></Col>  
            </Row>                      
        </div>
    );
};

export default Contact;
