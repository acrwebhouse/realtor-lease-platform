import React, {useEffect, useState} from 'react';
import {
    Divider,
    Row,
    Col,
    Descriptions,
    message
} from "antd";
import {CompanyAxios} from './axiosApi'

const companyState = ['初始狀態', '審核中', '通過審核', '審核失敗', '停權中']
// 初始狀態
// 1 : 審核中
// 2 : 通過審核
// 3:審核失敗
// 4:停權中

const CompanyInfo = (props) => {
    const [init, setInit] = useState(true);
    const [companyData, setCompanyData] = useState(
        {
            name : '',
            owner : '',
            address : '',
            phone : '',
            mail : '',
            unifiedBusinessNo : '',
            createTime : '',
            state : 0,
            houseLimit : 0,
            accountLimit : 0,
        }
    );
    useEffect(() => {
        if (init) {
            setInit(false)
            getCompanyInfo()
        }
    }, )
    function getCompanyInfo(){
        let reqUrl = `/company/getCompanyById?id=${props.companyId}`
        CompanyAxios.get(
                reqUrl,{
                })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    setCompanyData(response.data.data)
                }else{
                    message.error('公司資訊取得失敗', 3)
                }
            })
            .catch( (error) => message.error(error, 3))
    }

    console.log(companyData)
    return (
        <div>
            <div>
                <Row>
                    <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Divider>公司資訊</Divider>
                    <Descriptions bordered>
                        <Descriptions.Item label="名稱" span={3}>{companyData.name}</Descriptions.Item>
                        <Descriptions.Item label="負責人" span={3}>{companyData.owner}</Descriptions.Item>
                        <Descriptions.Item label="地址" span={3}>{companyData.address}</Descriptions.Item>
                        <Descriptions.Item label="聯絡電話" span={3}>{companyData.phone}</Descriptions.Item>
                        <Descriptions.Item label="信箱" span={3}>{companyData.mail}</Descriptions.Item>
                        <Descriptions.Item label="統一編號" span={3}>{companyData.unifiedBusinessNo}</Descriptions.Item>
                        <Descriptions.Item label="申請時間" span={3}>
                            {new Date(companyData.createTime).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}
                        </Descriptions.Item>
                    </Descriptions>
                    </Col>
                </Row>
                <Row>
                    <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Divider>額外資訊</Divider>
                        <Descriptions bordered>
                            <Descriptions.Item label="狀態" span={3}>{companyState[companyData.state]}</Descriptions.Item>
                            <Descriptions.Item label="上件數量" span={3}>{companyData.houseLimit}</Descriptions.Item>
                            <Descriptions.Item label="員工數量" span={3}>{companyData.accountLimit}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CompanyInfo;
