import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox, Result} from "antd";
import cookie from 'react-cookies'
import {UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";

  

const CompanyList = (props) => {
    let { id } = useParams();
    const [size] = useState("large");
    const [memberList, setMemberList] = useState([]);

    const columns = [
        {
          title: '名稱',
          dataIndex: 'name',
          key: 'name',
          width:'100px',
          render: (name) => {
            return <div style={{
                'textAlign': 'center',
            }}>
              {name}
            </div>
            },
        },
          {
            title: '內容',
            dataIndex: 'content',
            key: 'content',
            //  width:'100px',
            render: (content) => {
              return <div style={{
                  'textAlign': 'center',
              }}>
                  <div style={{
                  'display': 'inline-block',
                  'textAlign': 'left',
                  }}>
                      {content[0]}
                      <br/>
                      {content[1]}
                      <br/>
                      {content[2]}
                      <br/>
                      {content[3]}
                      <br/>
                      {content[4]}
                      <br/>
                      {content[5]}
                      <br/>
                      {content[6]}
                      <br/>
                      {content[7]}
                      <br/>
                <div >
                    {/* <Button type="primary" onClick={() => queryUser(content[8])} style={{width: '70px' }}>
                        查看
                    </Button>
                    &nbsp; */}
                    {/* <Button type="primary" onClick={() => removeUser(content[8])} danger style={{width: '70px'}}>
                        刪除
                    </Button> */}
                    </div>
              </div>
              </div>
              },
          },
      ];

    return (
        <div>
            <Row>
                <Col xs={24} sm={3} md={3} lg={4} xl={6}></Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    {/* <Button type="primary" onClick={getUserList} style={{ */}
                    <Button type="primary" onClick={''} style={{
                            width: '100%',
                            height: '40px',
                            backgroundColor:'#008000',
                        }}>
                        搜尋
                    </Button>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Input id="textQuery" placeholder="公司名稱"  style={{
                            width: '100%',
                            height: '40px',
                        }}>
                    </Input>
                </Col>
                <Col xs={24} sm={6} md={6} lg={5} xl={4}>
                    <Input id="textQuery" placeholder="統一編號"  style={{
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
                dataSource={memberList}
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
