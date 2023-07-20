import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import moment from 'moment';
import {CompanyAxios} from './axiosApi'
import {
    useParams
  } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {showInternelErrorPageForMobile} from './CommonUtil'

const CompanyApplyList = (props) => {
    let { id } = useParams();
    const [init, setInit] = useState(true);
    const [companyApplyList , setCompanyApplyList] = useState([]);
    const getCompanyApplyListUrl = '/employees/getEmployeesListByCompanyId'
    const editEmployees = '/employees/editEmployees'

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
                if(response.data.status === true){
                    // setCompanyApplyList(response.data.data)
                    resolveCompanyApplyList(response)
                }else{
                    toast.error('抓取公司審核列表失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile();
                toast.error(error)
            })
    }

    function resolveCompanyApplyList(response){
        data = []
        if(response.data && response.data.data){
            const items = response.data.data
            for(let i = 0 ;i<items.length; i++){
                const item = {
                    key: i,
                    name: items[i]._id,
                    // content: [`統一編號 : ${items[i].unifiedBusinessNo}`,`地址 : ${items[i].address}`,`負責人 : ${items[i].owner}`,`電話 : ${items[i].phone}`,`信箱 : ${items[i].mail}`,items[i]._id,items[i].name],
                    content : []
                    }
                if(items[i].userData.length > 0){
                    item.content = [items[i]._id,`姓名 : ${items[i].userData[0].name}`]
                    if(items[i].userData[0].gender === true){
                        item.content.push('性別 : 男')
                    } else if(items[i].userData[0].gender === false){
                        item.content.push('性別 : 女')
                    } else {
                        item.content.push('性別 : 男')
                    }

                    item.content.push(`帳號 : ${items[i].userData[0].account}`)
                    item.content.push(`電話 : ${items[i].userData[0].phone}`)
                    item.content.push(`信箱 : ${items[i].userData[0].mail}`)
                    item.content.push(items[i])

                }
                data.push(item)
            }
            console.log('===data====',data)
            setCompanyApplyList(data)
        }
    }

    function applyResult(isPass,employee){
        const body = {
            'id': employee._id,
            'companyId': employee.companyId,
            'userId': employee.userId,
            'rank': employee.rank,
            'managerId': employee.managerId,
            'state': employee.state,
            'isResign': employee.isResign
          }
        if(isPass === true){
            body.state = 2
            body.isResign = false
        }else{
            body.state = 3
        }

        const xToken = cookie.load('x-token')
        let reqUrl = `${editEmployees}`
        CompanyAxios.put(reqUrl, body, {
            headers:{
                'x-Token':xToken
            }
        }).then((response) => {
            console.log(response)
            if(response.data.status === true){
                getCompanyApplyList()
            }else{
                toast.error('審核失敗')
            }
        }).catch( (error) => {
            showInternelErrorPageForMobile();
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
            title: '申請人員',
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
                     }}>{content[1]}</div>
                      {content[2]}
                      <br/>
                      {content[3]}
                      <br/>
                      {content[4]}
                      <br/>
                      {content[5]}

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
                    <Button type="primary" onClick={() => applyResult(true,content[6])} style={{width: '80px' }}>
                        同意
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" danger onClick={() => applyResult(false,content[6])} style={{width: '80px' }}>
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
            <ToastContainer autoClose={2000} position="top-center" style={{top: '48%'}}/>
            <Row>
            <Col  xs={24} sm={3} md={3} lg={4} xl={6}></Col>
            <Col  xs={24} sm={18} md={18} lg={15} xl={12}>
            <Divider>審核列表</Divider>
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
