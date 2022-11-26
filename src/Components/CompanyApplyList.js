import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {CompanyAxios} from './axiosApi'
import {
    useParams
  } from "react-router-dom";



const CompanyApplyList = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [companyApplyList , setCompanyApplyList] = useState([]);
    const getCompanyApplyListUrl = '/employees/getEmployeesListByCompanyId'

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

    useEffect(() => {
        if (init) {
            // if(props.currentEmployeeData !==null && props.currentEmployeeData !==undefined && JSON.stringify(props.currentEmployeeData) !=='{}'){
            //     setIsShowCompanyApplyState(true)
            // }else{
            //     setIsShowCompanyList(true)
            // }
            getCompanyApplyList()
            setInit(false)
        }
    }, )

    const [getCompanyApplyListArg] = useState({
        start : '0',
        count : '9999999',
        states : '1',
    });

    function getCompanyApplyList(){
        const xToken = cookie.load('x-token')
        let reqUrl = `${getCompanyApplyListUrl}?companyId=${props.currentEmployeeData.companyId}&&start=${getCompanyApplyListArg.start}&&count=${getCompanyApplyListArg.count}&&states=${getCompanyApplyListArg.states}`
        CompanyAxios.get(
                reqUrl,{
                    headers:{
                        'x-Token':xToken
                    }
                })
            .then( (response) => {
                console.log('===getCompanyApplyList=====')
                console.log(response)
                if(response.data.status === true){
                    // setCompanyApplyList(response.data.data)
                    resolveCompantList(response)
                }else{
                    message.error('抓取公司審核列表失敗', 3)
                }
            })
            .catch( (error) => message.error(error, 3))
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
            setCompanyApplyList(data)
        }
    }

    function applyResult(isPass,applyId){

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
            title: '申請人員',
            dataIndex: 'content',
            key: 'content',
            render: (content) => {
              return <div style={{
                  'textAlign': 'center',
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
                    <Button type="primary" onClick={() => applyResult(true,'')} style={{width: '80px' }}>
                        同意
                    </Button>
                    <Button type="primary" danger onClick={() => applyResult(false,'')} style={{width: '80px' }}>
                        拒絕
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
            <Divider>審核列表</Divider>
            <Row>
            <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
            <Table
                columns={columns}
                pagination={{ position: ['topLeft', 'bottomRight'] }}
                dataSource={companyApplyList}
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

export default CompanyApplyList;
