import React, {useEffect, useState,createRef} from 'react';
import {Table, Tag, Radio, Button, Image, Menu, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
import { defaultIconPrefixCls } from 'antd/lib/config-provider';

import {
  CloudUploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined ,
  UserOutlined ,
  TeamOutlined ,
  LoginOutlined ,
  LogoutOutlined ,
} from '@ant-design/icons';

import HousesList from "./HousesList";
import HousesList2 from "./HousesList2";

const { SubMenu } = Menu;

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [showMenuFoldOutlined, setShowMenuFoldOutlined] = useState('flex');
    const [showMenuUnfoldOutlined, setShowMenuUnfoldOutlined] = useState('nonw');
    const childRef = createRef();

    function toggleCollapsed() {
        // console.log(HousesList.cityOptions)
        // HousesList.test()
        console.log(HousesList)
        // console.log(childRef)
        // console.log(childRef.current)
        // childRef.current.addCount()
        // childRef.current.test()
        if( collapsed === false)
        {
            setShowMenuUnfoldOutlined('flex')
            setShowMenuFoldOutlined('none')
            setCollapsed(true)
        }else{
            setShowMenuUnfoldOutlined('none')
            setShowMenuFoldOutlined('flex')
            setCollapsed(false)
        }
        
      };

    useEffect(() => {
       
    }, )

    

    return (
        <div>
            
            <div style={{ width: 256,'position':'absolute','zIndex':10 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          <MenuUnfoldOutlined style={{display : showMenuUnfoldOutlined }}></MenuUnfoldOutlined>
          <MenuFoldOutlined style={{display : showMenuFoldOutlined }}></MenuFoldOutlined>
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        // inlineCollapsed={false}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            租屋列表
          </Menu.Item>
          <Menu.Item key="2" icon={<CloudUploadOutlined />}>
            上傳租屋
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            人員列表
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            會員中心
          </Menu.Item>
          <Menu.Item key="5" icon={<LoginOutlined />}>
            註冊 / 登入
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            登出
          </Menu.Item>
          
          {/* <Menu.Item  >
           
          </Menu.Item> */}
          {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
        </Menu>
        
      </div>
      <HousesList ref={childRef} style={{'position':'absolute','zIndex':1 }}/>
      {/* <HousesList2 ref={childRef} /> */}
        </div>
        
    );
};

export default Main;
