import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {CompanyAxios} from './axiosApi'
import moment from 'moment';

import {
    useParams
  } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showInternelErrorPageForMobile} from './CommonUtil'

const CompanyList = (props) => {
    let { id } = useParams();
    const [size] = useState("large");
    const [companyList, setCompanyList] = useState([]);
    const companyListUrl = 'company/getCompanyList'
    const applyEmployeesUrl = '/employees/applyEmployees'
    const [init, setInit] = useState(true);

    useEffect(() => {
        if (init) {
            setInit(false)
            getCompanyList()
        }
    }, )

    let data = [
        {
          key: '1',
          name: '科技公司',
          owner :'負責人',
          unifiedBusinessNo: '2345678',
          phone: '0912636123',
          mail: "acr.webffhousve@gmail.com",
          address : '台北市',
        }
      ];

    const [getCompanyListArg] = useState({
        start : '0',
        count : '9999999',
        unifiedBusinessNo : '',
        name : '',  
    });

    const getCompanyList = () => {
        let reqUrl = `${companyListUrl}?start=${getCompanyListArg.start}&&count=${getCompanyListArg.count}`
        const textQueryName= document.getElementById('textQueryName');
        const textQueryUnifiedBusinessNo= document.getElementById('textQueryUnifiedBusinessNo');
        
        if(textQueryName){
            const value = textQueryName.value
            if(value !== '' && value !== undefined && value !== null){
                reqUrl = `${reqUrl}&&name=${value}`
            }
        }

        if(textQueryUnifiedBusinessNo){
            const value = textQueryUnifiedBusinessNo.value
            if(value !== '' && value !== undefined && value !== null){
                reqUrl = `${reqUrl}&&unifiedBusinessNo=${value}`
            }
        }

        reqUrl = `${reqUrl}&&state=2`

        CompanyAxios.get(
                reqUrl,{}
            )
            .then( (response) => {
                //concole.log(response)
                resolveCompantList(response)
                // resolveMemberList(response)
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    function resolveCompantList(response){
        data = []
        if(response.data && response.data.data){
            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){
                const item = {
                    key: i,
                    name: items[i].name,
                    content: [`統一編號 : ${items[i].unifiedBusinessNo}`,`地址 : ${items[i].address}`,`負責人 : ${items[i].owner}`,`電話 : ${items[i].phone}`,`信箱 : ${items[i].mail}`,items[i]._id,items[i].name],
                    }
                data.push(item)
            }
            setCompanyList(data)
        }
    }

    function apply(companyId){
        const xToken = cookie.load('x-token')
        const data = {
            companyId
        }
        CompanyAxios.post(applyEmployeesUrl, data, {
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "x-token" : xToken,
            }
        }).then( (response) => {
            if(response.data.status === true){
                toast.success('申請中');
                props.showApplyingUI();
            }else{
                toast.error('申請失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }

    const columns = [
        // {
        //   title: '名稱',
        //   dataIndex: 'name',
        //   key: 'name',
        // //   width:'100px',
        //   render: (name) => {
        //     return <div style={{
        //         'textAlign': 'center',
        //     }}>
        //       {name}
        //     </div>
        //     },
        // },
          {
            title: '公司資訊',
            dataIndex: 'content',
            key: 'content',
            render: (content) => {
              return <div style={{
                //   'textAlign': 'center',
              }}>
                  <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                      <div style={{
                        'color': '#0000ff',
                        'fontSize':'20px'
                     }}>{content[6]}</div>
                      {content[0]}
                      <br/>
                      {content[1]}
                      <br/>
                      {content[2]}
                      <br/>
                      {content[3]}
                      <br/>
                      {content[4]}

                <div >
                </div>
              </div>
              </div>
              },
              
          },
          {
            title: '',
            dataIndex: 'content',
            key: 'content',
            //  width:'50px',
            render: (content) => {
              return <div style={{
                  'textAlign': 'center',
              }}>
                  <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                    <Button type="primary" onClick={() => apply(content[5])} style={{width: '80px' }}>
                        申請加入
                    </Button>
                <div >
                </div>
              </div>
              </div>
              },
              
          },
      ];

    return (
        <div>
            {/*<ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>*/}
            <Row>
                <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Button type="primary" onClick={getCompanyList} style={{
                    // <Button type="primary" onClick={''} style={{
                            width: '100%',
                            height: '40px',
                            backgroundColor:'#008000',
                        }}>
                        搜尋
                    </Button>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Input id="textQueryName" placeholder="公司名稱"  style={{
                            width: '100%',
                            height: '40px',
                        }}>
                    </Input>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Input id="textQueryUnifiedBusinessNo" placeholder="統一編號"  style={{
                            width: '100%',
                            height: '40px',
                        }}>
                    </Input>
                </Col>
                <Col xs={24} sm={3} md={3} lg={5} xl={6}></Col>
            </Row>

            <br></br><br></br><br></br>
        <Row>
            <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
            <Table
                columns={columns}
                pagination={{ position: ['topLeft', 'bottomRight'] }}
                dataSource={companyList}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                    }, // click row
                };}}
            />
            </Col>
            <Col  xs={24} sm={3} md={3} lg={5} xl={6}></Col>
        </Row>
        </div>
    );
};

export default CompanyList;
