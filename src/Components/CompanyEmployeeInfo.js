import React, {useEffect, useState} from 'react';
import {
    Divider,
    Row,
    Col,
    Descriptions
} from "antd";
import cookie from 'react-cookies'
import {CompanyAxios} from './axiosApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

const employeeState = ['初始狀態', '審核中', '正式員工', '審核失敗', '停權中']
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
            scope : [{
                city : '',
                area : ''
            }],
        }
    );
    useEffect(() => {
        if (init) {
            setInit(false)
            getCompanyEmployeeInfo()
        }
    }, )
    console.log(props)
    function getCompanyEmployeeInfo(){
        let reqUrl = `/employees/getPersonalEmployeesInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    console.log(response.data.data)
                    resolveCompanyEmployee(response.data.data)
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    function resolveCompanyEmployee(list){
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
                    rank : item.rank,
                    state : item.state,
                    scope : [{
                        city : '',
                        area : ''
                    }],
                }
                if(item.userData[0].rolesInfo.sales !== undefined && item.userData[0].rolesInfo.sales.scope !== undefined){
                    let writeScopeCity = ''
                    let writeScopeArea = ''
                    for(let j = 0 ;j < item.userData[0].rolesInfo.sales.scope.length; j++){
                        writeScopeCity = item.userData[0].rolesInfo.sales.scope[j].city
                        writeScopeArea = writeScopeArea + item.userData[0].rolesInfo.sales.scope[j].area
                        if( j !== item.userData[0].rolesInfo.sales.scope.length-1){
                            writeScopeArea = writeScopeArea + ','
                        }
                    }
                    data.scope.city = writeScopeCity
                    data.scope.area = writeScopeArea
                }
                setEmployeeData(data)
                i = list.length
            }
        }
    }

    console.log(employeeData)

    return (
        <div>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
            <div>
                <Row>
                    <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Divider>員工資訊</Divider>
                        <Descriptions bordered>
                            <Descriptions.Item label="名稱" span={3}>{employeeData.name}</Descriptions.Item>
                            <Descriptions.Item label="等級" span={3}>{employeeData.rank > 0 ? employeeData.rank : '管理者'}</Descriptions.Item>
                            <Descriptions.Item label="性別" span={3}>
                                {employeeData.gender ? '男' : '女'}
                            </Descriptions.Item>
                            <Descriptions.Item label="公司" span={3}>
                                {employeeData.companyData[0].name}
                            </Descriptions.Item>
                            <Descriptions.Item label="主管" span={3}>
                                {employeeData.managerData.length > 0 ? employeeData.managerData[0].name : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="主管信箱" span={3}>
                                {employeeData.managerData.length > 0 ? employeeData.managerData[0].mail : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="員工狀態" span={3}>{employeeState[employeeData.state]}</Descriptions.Item>
                            <Descriptions.Item label="生日" span={3}>{employeeData.bornDate}</Descriptions.Item>
                            <Descriptions.Item label="聯絡電話" span={3}>{employeeData.phone}</Descriptions.Item>
                            <Descriptions.Item label="聯絡地址" span={3}>{employeeData.address}</Descriptions.Item>
                            <Descriptions.Item label="信箱" span={3}>{employeeData.mail}</Descriptions.Item>
                            <Descriptions.Item label="負責城市" span={3}>
                                {employeeData.scope.city}
                            </Descriptions.Item>
                            <Descriptions.Item label="負責區域" span={3}>
                                {employeeData.scope.area}
                            </Descriptions.Item>

                        </Descriptions>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CompanyEmployeeInfo;