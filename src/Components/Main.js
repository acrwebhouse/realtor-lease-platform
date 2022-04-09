import React, {useEffect, useState,createRef} from 'react';
import { Button, Menu} from "antd";
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
import MyHousesList from "./MyHousesList";
import UploadHouse from "./UploadHouse";
import MemberList from "./MemberList";
import MemberInfo from "./MemberInfo";
import LoginSignIn from "./LoginSignIn";

let token = ''


const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [showMenuFoldOutlined, setShowMenuFoldOutlined] = useState('flex');
    const [showMenuUnfoldOutlined, setShowMenuUnfoldOutlined] = useState('none');
    const [isShowLoginSignIn, setIsShowLoginSignIn] = useState(false);
    const [isShowHousesList, setIsShowHousesList] = useState(true);
    const [isShowMyHousesList, setIsShowMyHousesList] = useState(false);
    const [isShowUploadHouse, setIsShowUploadHouse] = useState(false);
    const [isShowMemberList, setIsShowMemberList] = useState(false);
    const [isShowMemberInfo, setIsShowMemberInfo] = useState(false);

    function turnOffPage(){
        setIsShowHousesList(false)
        setIsShowMyHousesList(false)
        setIsShowUploadHouse(false)
        setIsShowMemberList(false)
        setIsShowMemberInfo(false)
    }

    function toggleCollapsed() {
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
        turnOffPage()
        setIsShowHousesList(true)
    }

    function myHousesList(){
        console.log('myHousesList')
        turnOffPage()
        setIsShowMyHousesList(true)
    }
    function uploadHouse(){
        console.log('uploadHouse')
        turnOffPage()
        setIsShowUploadHouse(true)
    }
    
    function memberList(){
        console.log('memberList')
        turnOffPage()
        setIsShowMemberList(true)
    }

    function memberInfo(){
        console.log('memberInfo')
        turnOffPage()
        setIsShowMemberInfo(true)
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
        } 
    }


    return (
        <div>
        <div style={{ width: 256,'position':'absolute','zIndex':10 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginTop: 1,marginBottom: 16 , backgroundColor:'#0080FF'}}>
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
          <Menu.Item key='1' id="housesListMenu" icon={<HomeOutlined /> } onClick={housesList}>
            租屋列表
          </Menu.Item>
          <Menu.Item key='2' id="myHousesListMenu" style={{'display':'none'}} icon={<HomeFilled /> } onClick={myHousesList}>
            我的租屋
          </Menu.Item>
          <Menu.Item key='3' id="uploadHousesMenu" style={{'display':'none'}} icon={<CloudUploadOutlined />} onClick={uploadHouse}>
            上傳租屋
          </Menu.Item>
          <Menu.Item key='4' id="memberListMenu" style={{'display':'none'}} icon={<TeamOutlined />} onClick={memberList}>
            人員列表
          </Menu.Item>
          <Menu.Item key='5' id="memberInfoMenu" style={{'display':'none'}} icon={<UserOutlined />} onClick={memberInfo}>
            會員中心
          </Menu.Item>
          <Menu.Item key='6' id="loginSignInMenu" icon={<LoginOutlined /> } onClick={loginSignIn}>
            註冊 / 登入
          </Menu.Item>
          <Menu.Item key='7' id="logoutMenu" style={{'display':'none'}} icon={<LogoutOutlined />} onClick={logout}>
            登出
          </Menu.Item>
        </Menu>
        
      </div>
    
    {
        isShowHousesList?(<HousesList></HousesList>):null           
    }

    {
        isShowMyHousesList?(<MyHousesList></MyHousesList>):null           
    }

    {
        isShowUploadHouse?(<UploadHouse></UploadHouse>):null           
    }

    {
        isShowMemberList?(<MemberList></MemberList>):null           
    }

    {
        isShowMemberInfo?(<MemberInfo></MemberInfo>):null           
    }

        <div id="loginSignIn" style={{'position':'absolute','zIndex':20 ,'width':'100%','height':'100%','display':'none'}}>
            <LoginSignIn isShow={isShowLoginSignIn} loginSignInIsOpen={loginSignInIsOpen} changeRolesMenu={changeRolesMenu} ></LoginSignIn>
        </div>
        </div>
        
    );
};

export default Main;
