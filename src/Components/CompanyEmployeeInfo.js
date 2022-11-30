import React, {useEffect, useState} from 'react';
import {
    Divider,
    Row,
    Col,
    message,
    Descriptions
} from "antd";
import cookie from 'react-cookies'
import {CompanyAxios} from './axiosApi'

const CompanyEmployeeInfo = (props) => {
    const [init, setInit] = useState(true);
    const [employeeData, setEmployeeData] = useState(
        {
            name : '',
            gender : true,
            companyData : [{
                name : ''
            }],
            managerData : [],
            bornDate : '',
            phone : '',
            address : '',
            mail : '',
            scope : '',
        }
    );
    useEffect(() => {
        if (init) {
            setInit(false)
             getCompanyEmployeeInfo()
        }
    }, )

    function getCompanyEmployeeInfo(){
        let reqUrl = `/employees/getPersonalEmployeesInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
                reqUrl,{
                    headers:{
                        'x-Token':xToken
                    }
                })
            .then( (response) => {
                if(response.data.status === true){
                    resolveCompanyEmployeet(response.data.data)
                }else{
                    message.error('員工資訊取得失敗', 3)
                }
            })
            .catch( (error) => message.error(error, 3))
    }

    function resolveCompanyEmployeet(list){
        for(let i = 0 ;i<list.length; i++){
            if(list[i]._id === props.employeeId){
                const item = list[i]
                const data = {
                    name : item.userData[0].name,
                    gender : item.userData[0].gender,
                    companyData : item.companyData,
                    managerData : item.managerData,
                    bornDate : item.userData[0].bornDate,
                    phone : item.userData[0].phone,
                    address : item.userData[0].address,
                    mail : item.userData[0].mail,
                    scope : '',
                }
                if(item.userData[0].rolesInfo.sales !== undefined && item.userData[0].rolesInfo.sales.scope !== undefined){
                    let writeScope = ''
                    for(let j = 0 ;j < item.userData[0].rolesInfo.sales.scope.length; j++){
                        writeScope = writeScope + item.userData[0].rolesInfo.sales.scope[j].city + ' ' + item.userData[0].rolesInfo.sales.scope[j].area
                        if( j !== item.userData[0].rolesInfo.sales.scope.length-1){
                            writeScope = writeScope + ','
                        }
                    }
                    data.scope = writeScope
                }
                setEmployeeData(data)
                i = list.length
            }
        }
    }


    return (
        <div>
            <div>
                <Row>
                    <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Divider>員工資訊</Divider>
                        <Descriptions bordered>
                            <Descriptions.Item label="名稱" span={3}>{employeeData.name}</Descriptions.Item>
                            <Descriptions.Item label="性別" span={3}>
                                {employeeData.gender ? '男' : '女'}
                            </Descriptions.Item>
                            <Descriptions.Item label="公司" span={3}>
                                {employeeData.companyData[0].name}
                            </Descriptions.Item>
                            <Descriptions.Item label="主管" span={3}>
                                {employeeData.managerData.length > 0 ? employeeData.managerData[0].name : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="主管郵件" span={3}>
                                {employeeData.managerData.length > 0 ? employeeData.managerData[0].mail : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="生日" span={3}>{employeeData.bornDate}</Descriptions.Item>
                            <Descriptions.Item label="聯絡電話" span={3}>{employeeData.phone}</Descriptions.Item>
                            <Descriptions.Item label="聯絡地址" span={3}>{employeeData.address}</Descriptions.Item>
                            <Descriptions.Item label="電子郵件" span={3}>{employeeData.mail}</Descriptions.Item>
                            <Descriptions.Item label="負責區域" span={3}>
                                        {employeeData.scope}
                            </Descriptions.Item>

                        </Descriptions>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CompanyEmployeeInfo;