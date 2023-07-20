import React, {useEffect, useState} from 'react';
import {
    Table,
    Space,
    Radio,
    Button,
    Image,
    Input,
    Select,
    Divider,
    Row,
    Col,
    DatePicker,
    Alert,
    Checkbox,
    Result,
    Descriptions
} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import {CompanyAxios} from './axiosApi'
import {
    useParams
  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

const applyState = ['初始狀態', '審核中', '正式員工', '審核失敗', '取消審核']

const CompanyApplyState = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [employeeApplyData, setEmployeeApplyData] = useState('');
    const cancelApplyEmployeesUrl = '/employees/cancelApplyEmployees'
    // console.log(JSON.stringify(props))
    useEffect(() => {
        if (init) {
            setInit(false)
            getCompanyApplyData()
        }
    }, )
    console.log(employeeApplyData)
    function getCompanyApplyData() {
        let reqUrl = `/user/getPersonalInfo`
        const xToken = cookie.load('x-token')
        UserAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    console.log(response.data.data)
                    resolveCompanyApply(response.data.data)
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    function resolveCompanyApply(list){
        for(let i = 0 ;i<list.employeesData.length; i++){
            // console.log(list)
            if(list.companyId === list.employeesData[i].companyId){
                console.log(list.employeesData[i].companyId)
                const item = list.employeesData[i]
                console.log(item)
                const data = {
                    name : item.companyData[0].name,
                    owner : item.companyData[0].owner,
                    phone : item.companyData[0].phone,
                    address : item.companyData[0].address,
                    state : item.state,
                    time : item.updateTime,
                }
                setEmployeeApplyData(data)
                i = list.employeesData.length
            }
        }
    }

    function cancelApply(){
        const xToken = cookie.load('x-token')
        let reqUrl = `${cancelApplyEmployeesUrl}`
        let body = {
            id: '',
        }
        if(props.currentEmployeeData !== undefined){
            body.id = props.currentEmployeeData._id
        }
        CompanyAxios.put(reqUrl, body, {
            headers:{
                'x-Token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                props.showCompanyListUI()
            }else{
                toast.error('取消失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }

    return (
        <div>
            <ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>
            <div>
                <Row>
                    <Col xs={0} sm={8} md={8} lg={8} xl={8}></Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Divider>公司申請資訊</Divider>
                        <Descriptions bordered>
                            <Descriptions.Item label="名稱" span={3}>{employeeApplyData.name}</Descriptions.Item>
                            <Descriptions.Item label="管理者" span={3}>
                                {employeeApplyData.owner}
                            </Descriptions.Item>
                            <Descriptions.Item label="公司電話" span={3}>
                                {employeeApplyData.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="公司地址" span={3}>
                                {employeeApplyData.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="申請時間" span={3}>
                                {new Date(employeeApplyData.time).toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}
                            </Descriptions.Item>
                            <Descriptions.Item label="申請狀態" span={3}>
                                {applyState[employeeApplyData.state]}
                            </Descriptions.Item>
                        </Descriptions>
                        {applyState[employeeApplyData.state] === '審核失敗' ?
                            <Button type="primary" onClick={() => cancelApply()} style={{width: '100px' }}>
                                重新申請
                            </Button>
                            :
                            <Button type="primary" onClick={() => cancelApply()} style={{width: '100px' }}>
                                取消申請
                            </Button>
                        }
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CompanyApplyState;
