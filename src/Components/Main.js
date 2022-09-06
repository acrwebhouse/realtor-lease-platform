import React, {useEffect, useState} from 'react';
import { Button, Menu} from "antd";
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";
import {CollectAxios} from './axiosApi'

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
  PhoneOutlined ,
  InfoCircleOutlined,
  MonitorOutlined ,
  HeartOutlined ,
  LinkOutlined,
} from '@ant-design/icons';

import HousesList from "./HousesList";
import MyHousesList from "./MyHousesList";
import HouseUpload from "./HouseUpload";
import MemberList from "./MemberList";
import MemberInfo from "./MemberInfo";
import LoginSignIn from "./LoginSignIn";
import Contact from "./Contact";
import Collect from "./Collect";
import MatchNeed from "./MatchNeed";
import Link from "./Link";

const collectAccessTimeUrl = 'collect/accessTime'

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
    const [isShowContact, setIsShowContact] = useState(false);
    const [isShowCollect, setIsShowCollect] = useState(false);
    const [isShowMatchNeed, setIsShowMatchNeed] = useState(false);
    const [isShowRelativeLink, setIsShowRelativeLink] = useState(true);
    const [selectMenu, setSelectMenu] = useState(['1']);
    const [init, setInit] = useState(true);

    function turnOffPage(){
        setIsShowHousesList(false)
        setIsShowMyHousesList(false)
        setIsShowUploadHouse(false)
        setIsShowMemberList(false)
        setIsShowMemberInfo(false)
        setIsShowContact(false)
        setIsShowCollect(false)
        setIsShowMatchNeed(false)
        setIsShowRelativeLink(false)
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
            mainMenu.style.width = '256px'
            mainMenu.style.height = 'auto'
            setCollapsed(false)
        }
        
      };

    function collectAccessTime(){
        // setTimeout(() => {
        //     const reqUrl = `${collectAccessTimeUrl}`
        //     CollectAxios.get(
        //         reqUrl
        //     )
        //     .then( (response) => {
        //         console.log('collectAccessTime success')
        //     })
        //     .catch( (error) => console.log('collectAccessTime error'))
        //   }, 5000)
        const reqUrl = `${collectAccessTimeUrl}`
            CollectAxios.get(
                reqUrl
            )
            .then( (response) => {
                console.log('collectAccessTime success')
            })
            .catch( (error) => console.log('collectAccessTime error'))
    }

    useEffect(() => {
        if (init) {
            setInit(false)
            console.log('init')
            collectAccessTime()
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
        setSelectMenu(['1'])
        setIsShowHousesList(true)
    }

    function myHousesList(){
        console.log('myHousesList')
        turnOffPage()
        setSelectMenu(['2'])
        setIsShowMyHousesList(true)
    }
    function uploadHouse(){
        console.log('uploadHouse')
        turnOffPage()
        setSelectMenu(['3'])
        setIsShowUploadHouse(true)
    }
    
    function memberList(){
        console.log('memberList')
        turnOffPage()
        setSelectMenu(['4'])
        setIsShowMemberList(true)
    }

    function memberInfo(){
        console.log('memberInfo')
        turnOffPage()
        setSelectMenu(['5'])
        setIsShowMemberInfo(true)
    }

    function matchNeed(){
        console.log('matchNeed')
        turnOffPage()
        setSelectMenu(['10'])
        setIsShowMatchNeed(true)
    }

    function loginSignIn(){
        console.log('loginSignIn')
        setIsShowLoginSignIn(true)
    }

    function contact(){
        console.log('membercontactInfo')
        turnOffPage()
        setSelectMenu(['8'])
        setIsShowContact(true)
    }

    function collect(){
        console.log('collect')
        turnOffPage()
        setSelectMenu(['9'])
        setIsShowCollect(true)
    }

    const relativeLink = () => {
        console.log('relativeLink')
        turnOffPage()
        setSelectMenu(['11'])
        setIsShowRelativeLink(true)
    }

    function logout(){
        console.log('logout')
        const myHousesListMenu = document.getElementById('myHousesListMenu');
        const uploadHousesMenu = document.getElementById('uploadHousesMenu');
        const memberListMenu = document.getElementById('memberListMenu');
        const memberInfoMenu = document.getElementById('memberInfoMenu');
        const logoutMenu = document.getElementById('logoutMenu');
        const loginSignInMenu = document.getElementById('loginSignInMenu');
        const collectMenu = document.getElementById('collectMenu');
        const matchNeedMenu = document.getElementById('matchNeedMenu');
        const relativeLinkMenu = document.getElementById('relativeLinkMenu')
        loginSignInMenu.style.display = 'flex'
        myHousesListMenu.style.display = 'none'
        uploadHousesMenu.style.display = 'none'
        memberListMenu.style.display = 'none'
        memberInfoMenu.style.display = 'none'
        collectMenu.style.display = 'none'
        logoutMenu.style.display = 'none'
        matchNeedMenu.style.display = 'flex'
        relativeLinkMenu.style.display = 'flex'
        if( isShowHousesList === false && isShowContact !== true){
            turnOffPage()
            setSelectMenu(['1'])
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

    function changeRolesMenu(roles,toHouseList){
        console.log('==roles===',roles)
        const myHousesListMenu = document.getElementById('myHousesListMenu');
        const uploadHousesMenu = document.getElementById('uploadHousesMenu');
        const memberListMenu = document.getElementById('memberListMenu');
        const memberInfoMenu = document.getElementById('memberInfoMenu');
        const logoutMenu = document.getElementById('logoutMenu');
        const loginSignInMenu = document.getElementById('loginSignInMenu');
        const collectMenu = document.getElementById('collectMenu');
        const matchNeedMenu = document.getElementById('matchNeedMenu');
        const relativeLinkMenu = document.getElementById('relativeLinkMenu')
        myHousesListMenu.style.display = 'none'
        uploadHousesMenu.style.display = 'none'
        memberListMenu.style.display = 'none'
        memberInfoMenu.style.display = 'none'
        logoutMenu.style.display = 'none'
        loginSignInMenu.style.display = 'none'
        collectMenu.style.display = 'none'
        matchNeedMenu.style.display = 'flex'
        relativeLinkMenu.style.display = 'flex'
        for(let i =0;i<roles.length;i++){
            if(roles[i]===1){
                myHousesListMenu.style.display = 'flex'
                uploadHousesMenu.style.display = 'flex'
                memberListMenu.style.display = 'flex'
                memberInfoMenu.style.display = 'flex'
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
                collectMenu.style.display = 'flex'
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
            if(toHouseList === true && isShowContact !== true){
                setSelectMenu(['1'])
            }
        } else{
            myHousesListMenu.style.display = 'none'
            uploadHousesMenu.style.display = 'none'
            memberListMenu.style.display = 'none'
            memberInfoMenu.style.display = 'flex'
            relativeLinkMenu.style.display = 'flex'
            logoutMenu.style.display = 'flex'
            loginSignInMenu.style.display = 'none'
            collectMenu.style.display = 'none'
            loginSignInIsOpen(false)
        }
    }


    return (
        <div>
        <div style={{ width: 51,'position':'absolute','zIndex':10 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginTop: 1,border: 0 , height:'40px'}}>
          <MenuUnfoldOutlined style={{display : showMenuUnfoldOutlined }}></MenuUnfoldOutlined>
          <MenuFoldOutlined style={{display : showMenuFoldOutlined }}></MenuFoldOutlined>
        </Button>
        <Menu
          id="mainMenu"
          selectedKeys = {selectMenu}
          defaultOpenKeys={['sub1']}
          mode="inline"
          // mode="vertical"
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
          <Menu.Item key='10' id="matchNeedMenu" style={{'height':'50px','display':'flex'}} icon={<HeartOutlined />} onClick={matchNeed}>
            媒合系統
          </Menu.Item>
          <Menu.Item key='9' id="collectMenu" style={{'height':'50px','display':'none'}} icon={<MonitorOutlined />} onClick={collect}>
          資料採集
          </Menu.Item>
          <Menu.SubMenu
                key='11'
                title={<span>更多</span>}
                icon={<InfoCircleOutlined />}
          >
              <Menu.Item key='12' id="relativeLinkMenu" onClick={relativeLink} style={{'height':'50px','display':'flex'}} icon={<LinkOutlined />}>
                   <span> 相關連結</span>
              </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='8' id="contactMenu" style={{'height':'50px'}} icon={<PhoneOutlined />} onClick={contact}>
            聯絡客服
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
        isShowMatchNeed?(<MatchNeed></MatchNeed>):null           
    }



    {
        isShowMemberList?(<MemberList></MemberList>):null           
    }

    {
        isShowMemberInfo?(<MemberInfo changeRolesMenu={changeRolesMenu}></MemberInfo>):null           
    }

    {
        isShowCollect?(<Collect></Collect>):null           
    }
    {
        isShowRelativeLink?(<Link></Link>):null
    }
    {
        isShowContact?(<Contact></Contact>):null           
    }

        <div id="loginSignIn" style={{'position':'absolute','zIndex':20 ,'width':'100%','height':'100%','display':'none'}}>
            <LoginSignIn isShow={isShowLoginSignIn} loginSignInIsOpen={loginSignInIsOpen} changeRolesMenu={changeRolesMenu} ></LoginSignIn>
        </div>
        </div>
        
    );
};

export default Main;
