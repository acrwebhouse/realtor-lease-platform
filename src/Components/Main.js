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
import LoginSignIn from "./LoginSignIn";

const { SubMenu } = Menu;

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [showMenuFoldOutlined, setShowMenuFoldOutlined] = useState('flex');
    const [showMenuUnfoldOutlined, setShowMenuUnfoldOutlined] = useState('none');
    const [isShowLoginSignIn, setIsShowLoginSignIn] = useState(false);

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

    function housesList(){
        console.log('housesList')
        const webPage = document.getElementById('webPage');
        webPage.src = '/housesList'
        loginSignInIsOpen(false)
    }

    function myHousesList(){
        console.log('myHousesList')
        const webPage = document.getElementById('webPage');
        webPage.src = '/MyHousesList'
    }

    function memberList(){
        console.log('memberList')
        const webPage = document.getElementById('webPage');
        webPage.src = '/MemberList'
    }

    function memberInfo(){
        console.log('memberInfo')
        const webPage = document.getElementById('webPage');
        webPage.src = '/MemberInfo'
    }

    function loginSignIn(){
        console.log('loginSignIn')
        setIsShowLoginSignIn(true)
    }

    function logout(){
        console.log('logout')
    }

    function loginSignInIsOpen(status){
        console.log('====loginSignInIsOpen=====')
        const loginSignIn = document.getElementById('loginSignIn');
        console.log('====loginSignIn=loginSignIn====',loginSignIn)
        if(status === true){
            console.log('====loginSignInIsOpen=111====')
            loginSignIn.style.display = 'flex'
            setIsShowLoginSignIn(true)
        }else{
            console.log('====loginSignInIsOpen==222∂===')
            loginSignIn.style.display = 'none'
            setIsShowLoginSignIn(false)
            
        }
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
          <Menu.Item key="1" icon={<HomeOutlined /> } onClick={housesList}>
            租屋列表
          </Menu.Item>
          <Menu.Item key="2" icon={<HomeFilled /> } onClick={myHousesList}>
            我的租屋
          </Menu.Item>
          <Menu.Item key="3" icon={<CloudUploadOutlined />}>
            上傳租屋
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />} onClick={memberList}>
            人員列表
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />} onClick={memberInfo}>
            會員中心
          </Menu.Item>
          <Menu.Item key="6" icon={<LoginOutlined /> } onClick={loginSignIn}>
            註冊 / 登入
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />} onClick={logout}>
            登出
          </Menu.Item>
        </Menu>
        
      </div>
      {/* <HousesList ref={childRef} style={{'position':'absolute','zIndex':1 }}/> */}
      {/* <HousesList2 ref={childRef} /> */}
      <iframe
        style={{'position':'absolute','zIndex':1 ,'border':0,'width':'100%','height':'100%'}}
        src='/HousesList'
        id='webPage'
        //onLoad={this.sendToken}
    />
        <div id="loginSignIn" style={{'position':'absolute','zIndex':20 ,'width':'100%','height':'100%','display':'none'}}>
            <LoginSignIn isShow={isShowLoginSignIn} loginSignInIsOpen={loginSignInIsOpen} ></LoginSignIn>
        </div>
        </div>
        
    );
};

export default Main;
