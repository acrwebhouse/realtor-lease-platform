import React, {useEffect, useState,createRef} from 'react';
import {Table, Tag, Radio, Button, Image, Menu, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
import { defaultIconPrefixCls } from 'antd/lib/config-provider';

import {
  CloudUploadOutlined,
  HomeFilled ,
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
    const [showMenuUnfoldOutlined, setShowMenuUnfoldOutlined] = useState('none');
    const childRef = createRef();

    function toggleCollapsed() {
        // console.log(HousesList.cityOptions)
        // HousesList.test()
        console.log(HousesList)
        // console.log(childRef)
        // console.log(childRef.current)
        // childRef.current.addCount()
        // childRef.current.test()
        const mainMenu = document.getElementById('mainMenu');
        
        if( collapsed === false)
        {
            setShowMenuUnfoldOutlined('flex')
            setShowMenuFoldOutlined('none')
            mainMenu.style.width = '0%'
            setCollapsed(true)
        }else{
            setShowMenuUnfoldOutlined('none')
            setShowMenuFoldOutlined('flex')
            mainMenu.style.width = '100%'
            setCollapsed(false)
        }
        
      };

    useEffect(() => {
       
    }, )

    function rentHousesList(){
        console.log('rentHousesList')
    }

    return (
        <div>
            
        <div style={{ width: 256,'position':'absolute','zIndex':10 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          <MenuUnfoldOutlined style={{display : showMenuUnfoldOutlined }}></MenuUnfoldOutlined>
          <MenuFoldOutlined style={{display : showMenuFoldOutlined }}></MenuFoldOutlined>
        </Button>
        <Menu
          id="mainMenu"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<HomeOutlined /> } onClick={rentHousesList}>
            租屋列表
          </Menu.Item>
          <Menu.Item key="2" icon={<HomeFilled /> } onClick={rentHousesList}>
            我的租屋
          </Menu.Item>
          <Menu.Item key="3" icon={<CloudUploadOutlined />}>
            上傳租屋
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            人員列表
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            會員中心
          </Menu.Item>
          <Menu.Item key="6" icon={<LoginOutlined />}>
            註冊 / 登入
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />}>
            登出
          </Menu.Item>
        </Menu>
        
      </div>
      <HousesList ref={childRef} style={{'position':'absolute','zIndex':1 }}/>
      {/* <HousesList2 ref={childRef} /> */}
        </div>
        
    );
};

export default Main;
