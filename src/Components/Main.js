import React, {useEffect, useState,createRef} from 'react';
import {Table, Tag, Radio, Button, Image, Menu, Select, Divider, Row, Col, Span, message, Alert, Space} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {HouseListAxios} from './axiosApi'
import { defaultIconPrefixCls } from 'antd/lib/config-provider';
import cookie from 'react-cookies'

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
import LoginSignIn from "./LoginSignIn";

let token = ''


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
    }

    function myHousesList(){
        console.log('myHousesList')
        const webPage = document.getElementById('webPage');
        webPage.src = '/MyHousesList'
    }
    function uploadHouse(){
        console.log('uploadHouse')
        const webPage = document.getElementById('webPage');
        webPage.src = '/UploadHouse'
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
        const myHousesListMenu = document.getElementById('myHousesListMenu');
        const uploadHousesMenu = document.getElementById('uploadHousesMenu');
        const memberListMenu = document.getElementById('memberListMenu');
        const memberInfoMenu = document.getElementById('memberInfoMenu');
        const logoutMenu = document.getElementById('logoutMenu');
        const loginSignInMenu = document.getElementById('loginSignInMenu');
        loginSignInMenu.style.display = 'flex'
        myHousesListMenu.style.display = 'none'
        uploadHousesMenu.style.display = 'none'
        memberListMenu.style.display = 'none'
        memberInfoMenu.style.display = 'none'
        logoutMenu.style.display = 'none'
        const webPage = document.getElementById('webPage');
        webPage.src = '/housesList'
    }

    function loginSignInIsOpen(status){
        const loginSignIn = document.getElementById('loginSignIn');
        if(status === true){
            loginSignIn.style.display = 'flex'
            setIsShowLoginSignIn(true)
        }else{
            loginSignIn.style.display = 'none'
            setIsShowLoginSignIn(false)
        }
    }

    function changeRolesMenu(roles){
        const myHousesListMenu = document.getElementById('myHousesListMenu');
        const uploadHousesMenu = document.getElementById('uploadHousesMenu');
        const memberListMenu = document.getElementById('memberListMenu');
        const memberInfoMenu = document.getElementById('memberInfoMenu');
        const logoutMenu = document.getElementById('logoutMenu');
        const loginSignInMenu = document.getElementById('loginSignInMenu');
        token = cookie.load('x-token')
        console.log('==token===',token)
        for(let i =0;i<roles.length;i++){
            if(roles[i]===1){
                myHousesListMenu.style.display = 'flex'
                uploadHousesMenu.style.display = 'flex'
                memberListMenu.style.display = 'flex'
                memberInfoMenu.style.display = 'flex'
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
            }
            if(roles[i]===3){
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
                memberInfoMenu.style.display = 'flex'
            }
            if(roles[i]===2){
                myHousesListMenu.style.display = 'flex'
                uploadHousesMenu.style.display = 'flex'
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
                memberInfoMenu.style.display = 'flex'
            }
            if(roles[i]===4){
                myHousesListMenu.style.display = 'flex'
                uploadHousesMenu.style.display = 'flex'
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
                memberInfoMenu.style.display = 'flex'
            }
        }
        if(roles.length > 0){
            loginSignInIsOpen(false)
            const webPage = document.getElementById('webPage');
            webPage.src = '/housesList'
        } 
    }


    return (
        <div>
        <div style={{ width: 256,'position':'absolute','zIndex':10 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginTop: 1,marginBottom: 16 }}>
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
          <Menu.Item id="housesListMenu" icon={<HomeOutlined /> } onClick={housesList}>
            租屋列表
          </Menu.Item>
          <Menu.Item id="myHousesListMenu" style={{'display':'none'}} icon={<HomeFilled /> } onClick={myHousesList}>
            我的租屋
          </Menu.Item>
          <Menu.Item id="uploadHousesMenu" style={{'display':'none'}} icon={<CloudUploadOutlined />} onClick={uploadHouse}>
            上傳租屋
          </Menu.Item>
          <Menu.Item id="memberListMenu" style={{'display':'none'}} icon={<TeamOutlined />} onClick={memberList}>
            人員列表
          </Menu.Item>
          <Menu.Item id="memberInfoMenu" style={{'display':'none'}} icon={<UserOutlined />} onClick={memberInfo}>
            會員中心
          </Menu.Item>
          <Menu.Item id="loginSignInMenu" icon={<LoginOutlined /> } onClick={loginSignIn}>
            註冊 / 登入
          </Menu.Item>
          <Menu.Item id="logoutMenu" style={{'display':'none'}} icon={<LogoutOutlined />} onClick={logout}>
            登出
          </Menu.Item>
        </Menu>
        
      </div>
      <iframe
        style={{'position':'absolute','zIndex':1 ,'border':0,'width':'100%','height':'100%'}}
        src='/HousesList'
        id='webPage'
        //onLoad={this.sendToken}
    />
        <div id="loginSignIn" style={{'position':'absolute','zIndex':20 ,'width':'100%','height':'100%','display':'none'}}>
            <LoginSignIn isShow={isShowLoginSignIn} loginSignInIsOpen={loginSignInIsOpen} changeRolesMenu={changeRolesMenu} ></LoginSignIn>
        </div>
        </div>
        
    );
};

export default Main;
