import React, {useEffect, useState} from 'react';
import { Button, Menu} from "antd";
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";

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
import HouseUpload from "./HouseUpload";

import MemberList from "./MemberList";
import MemberInfo from "./MemberInfo";
import LoginSignIn from "./LoginSignIn";

const Main = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [showMenuFoldOutlined, setShowMenuFoldOutlined] = useState('none');
    const [showMenuUnfoldOutlined, setShowMenuUnfoldOutlined] = useState('flex');
    const [isShowLoginSignIn, setIsShowLoginSignIn] = useState(false);
    const [isShowHousesList, setIsShowHousesList] = useState(true);
    const [isShowMyHousesList, setIsShowMyHousesList] = useState(false);
    const [isShowUploadHouse, setIsShowUploadHouse] = useState(false);
    const [isShowMemberList, setIsShowMemberList] = useState(false);
    const [isShowMemberInfo, setIsShowMemberInfo] = useState(false);
    const [init, setInit] = useState(true);

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
            mainMenu.style.height = '10px'
            setCollapsed(true)
        }else{
            setShowMenuUnfoldOutlined('none')
            setShowMenuFoldOutlined('flex')
            mainMenu.style.width = '100%'
            mainMenu.style.height = 'auto'
            setCollapsed(false)
        }
        
      };

    useEffect(() => {
        if (init) {
            setInit(false)
            console.log('init')
            const xToken = cookie.load('x-token')
            if(xToken!== null && xToken!== undefined){
                const decodedToken = jwt_decode(xToken);
                console.log(decodedToken)
                const roles = decodedToken.roles
                changeRolesMenu(roles)
            }
            
        }
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
        if( isShowHousesList === false ){
            turnOffPage()
            setIsShowHousesList(true)
        }
        cookie.remove('x-token')
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
        <Button type="primary" onClick={toggleCollapsed} style={{ marginTop: 1,border: 0 , height:'40px'}}>
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
          style={{width : '0%',height : '10px' }}
        >
          <Menu.Item key='1' id="housesListMenu" style={{'height':'50px'}} icon={<HomeOutlined /> } onClick={housesList}>
            租屋列表
          </Menu.Item>
          <Menu.Item key='2' id="myHousesListMenu" style={{'height':'50px','display':'none'}} icon={<HomeFilled /> } onClick={myHousesList}>
            我的租屋
          </Menu.Item>
          <Menu.Item key='3' id="uploadHousesMenu" style={{'height':'50px','display':'none'}} icon={<CloudUploadOutlined />} onClick={uploadHouse}>
            上傳租屋
          </Menu.Item>
          <Menu.Item key='4' id="memberListMenu" style={{'height':'50px','display':'none'}} icon={<TeamOutlined />} onClick={memberList}>
            會員列表
          </Menu.Item>
          <Menu.Item key='5' id="memberInfoMenu" style={{'height':'50px','display':'none'}} icon={<UserOutlined />} onClick={memberInfo}>
            會員中心
          </Menu.Item>
          <Menu.Item key='6' id="loginSignInMenu" style={{'height':'50px'}} icon={<LoginOutlined /> } onClick={loginSignIn}>
            註冊 / 登入
          </Menu.Item>
          <Menu.Item key='7' id="logoutMenu" style={{'height':'50px','display':'none'}} icon={<LogoutOutlined />} onClick={logout}>
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
        isShowUploadHouse?(<HouseUpload></HouseUpload>):null           
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
