import React, {useEffect, useState} from 'react';
import { Button, Menu} from "antd";
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";
import {LoginRegisterAxios,CollectAxios} from './axiosApi'
import { UserAxios} from './axiosApi'
import Icon,{
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
  MailOutlined ,
} from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

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
import ReserveHouse from "./ReserveHouse";

import CompanyApply from "./CompanyApply";
import CompanyApplyList from "./CompanyApplyList";
import CompanyEmployeeInfo from "./CompanyEmployeeInfo";
import CompanyHouseList from "./CompanyHouseList";
import CompanyInfo from "./CompanyInfo";
import CompanyEmployeesList from "./CompanyEmployeesList";
import CompanyTransactionList from "./CompanyTransactionList";
import CompanyObjectManage from "./CompanyObjectManage";
import {getCurrentEmployee} from './CompanyCommon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useParams,
    useLocation
  } from "react-router-dom";
import {showInternelErrorPageForMobile} from './CommonUtil'

const collectAccessTimeUrl = 'collect/accessTime'

const Main = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [showMenuFoldOutlined, setShowMenuFoldOutlined] = useState('none');
    const [showMenuUnfoldOutlined, setShowMenuUnfoldOutlined] = useState('flex');
    const [isShowLoginSignIn, setIsShowLoginSignIn] = useState(false);
    const [isShowHousesList, setIsShowHousesList] = useState(false);
    const [isShowMyHousesList, setIsShowMyHousesList] = useState(false);
    const [isShowUploadHouse, setIsShowUploadHouse] = useState(false);
    const [isShowMemberList, setIsShowMemberList] = useState(false);
    const [isShowMemberInfo, setIsShowMemberInfo] = useState(false);
    const [isShowContact, setIsShowContact] = useState(false);
    const [isShowCollect, setIsShowCollect] = useState(false);
    const [isShowMatchNeed, setIsShowMatchNeed] = useState(false);
    const [isShowRelativeLink, setIsShowRelativeLink] = useState(false);

    const [isShowCompanyApply, setIsShowCompanyApply] = useState(false);
    const [isShowCompanyApplyList, setIsShowCompanyApplyList] = useState(false);
    const [isShowCompanyEmployeeInfo, setIsShowCompanyEmployeeInfo] = useState(false);
    const [isShowCompanyHouseList, setIsShowCompanyHouseList] = useState(false);
    const [isShowCompanyInfo, setIsShowCompanyInfo] = useState(false);
    const [isShowCompanyEmployeesList, setIsShowCompanyEmployeesList] = useState(false);
    const [isShowCompanyObjectManage, setIsShowCompanyObjectManage] = useState(false);
    
    const [isShowReserveHouse, setIsShowReserveHouse] = useState(false);
    const [isShowCompanyTransactionList, setIsShowCompanyTransactionList] = useState(false);
    const [isShowCompanyApplyListMenu, setIsShowCompanyApplyListMenu] = useState(false);
    const [isShowCompanyHouseListMenu, setIsShowCompanyHouseListMenu] = useState(false);
    const [isShowCompanyObjectManageMenu, setIsShowCompanyObjectManageMenu] = useState(false);
    const [selectMenu, setSelectMenu] = useState(['1']);
    const [init, setInit] = useState(true);
    const [user, setUser] = useState({});
    const { page ,info} = useParams();
    const [isShowReserveHouseDetail, setIsShowReserveHouseDetail] = useState(false);
    const [reserveHouseDetailId, setReserveHouseDetailId] = useState('');

    const [currentEmployeeData, setCurrentEmployeeData] = useState({});
    const [isQuickToPage, setIsQuickToPage] = useState(false);
    const { search } = useLocation();
    let isSales = false

    const surveysAuditSvg = () => (
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 386 511.9">
          <path d="M152.94 18.55v18.39c0 6.47-5.9 9.69-11.66 9.69h-34.15v38.08h171.74V46.63h-34.15c-5.76 0-11.66-3.22-11.66-9.69V18.55h-80.12zM53.48 196.9l2.2-11.73c4.84 1.09 9.18 1.64 13.05 1.64 3.85 0 6.96-.15 9.33-.43v-6.41l-7.09-.57c-6.36-.5-10.81-1.91-13.2-4.16-2.39-2.25-3.58-5.58-3.58-9.99 0-6.07 1.45-13.09 4.37-15.37 2.91-2.27 7.87-3.41 14.85-3.41 6.98 0 13.29.59 18.91 1.78l-1.97 11.38c-4.89-.72-8.8-1.07-11.74-1.07-2.94 0-5.44.12-7.48.35v6.34l5.67.5c6.88.59 11.63 2.1 14.26 4.44 2.62 2.35 3.94 5.61 3.94 9.78 0 2.98-.48 8.39-1.34 10.43-.87 2.03-1.96 3.62-3.19 4.69-1.24 1.07-3.01 1.91-5.24 2.45-2.23.55-4.24.92-5.95 1.03-1.71.12-3.98.18-6.81.18-6.84 0-13.16-.62-18.99-1.85zm63.2-49.36v39.05h5.59c2 0 3.37-.22 4.1-.67.74-.45 1.1-1.49 1.1-3.1v-35.28h15.76v30.66c0 3.98-.31 7.31-.86 9.74-.56 2.45-1.66 4.55-3.24 6.26-1.58 1.71-3.75 2.91-6.46 3.55-2.7.65-6.27 1-10.63 1-4.36 0-7.92-.35-10.6-1-2.67-.64-4.87-1.87-6.42-3.55-1.54-1.69-2.65-3.79-3.23-6.26-.58-2.46-.86-5.71-.86-9.74v-30.66h15.75zm77.39 50.14h-17.34l-6.46-16.91h-3.39v16.91h-15.75v-50.14h24.81c11.3 0 16.94 7.2 16.94 17.59 0 7.11-2.44 11.8-7.33 14.08l8.52 18.47zm-27.19-38.77v10.91h3.63c1.89 0 3.28-.17 4.13-.53.86-.35 1.3-1.17 1.3-2.46v-4.93c0-1.28-.44-2.1-1.3-2.46-.85-.35-2.27-.53-4.13-.53h-3.63zm60.76-11.37h16.62l-12.21 50.14h-23l-12.21-50.14h16.62l6.69 33.93h.72l6.77-33.93zm53.28 30.51h-15.76v8.26h19.3v11.37H249.4v-50.14h34.67l-1.97 11.37h-16.94v8.83h15.76v10.31zm24.9-30.51 4.33 21.34h.55l4.42-21.34h17.4l-14.17 38.05v12.09h-15.76v-12.09l-14.18-38.05h17.41zM91.3 320.31a5.683 5.683 0 0 1 8.09-.02c2.23 2.25 2.24 5.9.02 8.17l-9.77 9.9 9.78 9.92c2.2 2.24 2.17 5.87-.07 8.11-2.24 2.24-5.85 2.24-8.06-.01l-9.71-9.84-9.73 9.86a5.671 5.671 0 0 1-8.08.02c-2.24-2.24-2.25-5.9-.02-8.16l9.76-9.91-9.77-9.91c-2.21-2.25-2.18-5.88.06-8.12 2.25-2.23 5.85-2.23 8.06.01l9.71 9.85 9.73-9.87zm224.2 102.51c4.58 0 8.42-3.69 8.42-8.42 0-4.58-3.7-8.43-8.42-8.43H144.18c-4.73 0-8.43 3.85-8.43 8.43 0 4.73 3.85 8.42 8.43 8.42H315.5zm0-154.11c4.58 0 8.42-3.69 8.42-8.42 0-4.59-3.7-8.43-8.42-8.43H144.18c-4.73 0-8.43 3.84-8.43 8.43 0 4.73 3.85 8.42 8.43 8.42H315.5zm0 77.85c4.58 0 8.42-3.71 8.42-8.44 0-4.58-3.7-8.42-8.42-8.42H144.18c-4.73 0-8.43 3.84-8.43 8.42 0 4.73 3.85 8.44 8.43 8.44H315.5zM64.13 414.01c-2.29-3.42-1.38-8.06 2.05-10.35a7.446 7.446 0 0 1 10.34 2.05l4.07 6.04 16.13-19.63a7.45 7.45 0 0 1 10.5-1.02 7.446 7.446 0 0 1 1.02 10.49l-22.31 27.15c-.49.64-1.09 1.21-1.79 1.68-3.42 2.3-8.06 1.38-10.35-2.05l-9.66-14.36zm0-145.77a7.47 7.47 0 0 1 2.05-10.36 7.455 7.455 0 0 1 10.34 2.05l4.07 6.04 16.13-19.63c2.62-3.18 7.32-3.64 10.5-1.02a7.446 7.446 0 0 1 1.02 10.49l-22.31 27.16c-.49.64-1.09 1.2-1.79 1.67-3.42 2.3-8.06 1.38-10.35-2.04l-9.66-14.36zm38.41-164.65c-7.57 0-13.96-6.37-13.96-13.95V70.92H20.52c-1.14 0-2.13 1.04-2.13 2.14v418.15c0 1.18.98 2.13 2.13 2.13h344.96c1.14 0 2.13-.95 2.13-2.13V73.06c0-1.1-.99-2.14-2.13-2.14h-68.06v18.72c0 7.58-6.38 13.95-13.95 13.95H102.54zM20.69 511.9C9.3 511.9 0 502.6 0 491.21V73.06c0-11.41 9.28-20.69 20.69-20.69h68.06V42.19c0-7.67 6.28-13.95 13.95-13.95h31.85V15.43c0-8.33 7.1-15.43 15.43-15.43h86.04c8.33 0 15.43 7.1 15.43 15.43v12.81h31.85c7.67 0 13.96 6.28 13.96 13.95v10.18h68.05c11.41 0 20.69 9.28 20.69 20.69v418.15c0 11.39-9.3 20.69-20.69 20.69H20.69z" />
        </svg>
      );
    
    const SurveysAuditIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={surveysAuditSvg} {...props} />
    );

    const searchCompanySvg = () => (
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 488.15">
          <path d="M304.73 467.72H175.81V16.29h248.2v238.4c5.54.53 10.97 1.39 16.29 2.56V14.31C440.3 6.44 433.85 0 426 0H173.83c-7.88 0-14.31 6.45-14.31 14.31v121.94H11.98C5.41 136.25 0 141.67 0 148.24v327.62c0 4.51 3.65 8.15 8.15 8.15l310.99-.07-2.1-2.05c-4.42-4.43-8.54-9.16-12.31-14.17zm106.66-180.79c55.55 0 100.61 45.06 100.61 100.61 0 55.56-45.06 100.61-100.61 100.61S310.78 443.1 310.78 387.54c0-55.55 45.06-100.61 100.61-100.61zm7.04 46.16c-6.27 0-12.29 1.28-17.8 3.55a47.026 47.026 0 0 0-15.17 10.12c-4.29 4.3-7.77 9.43-10.12 15.13a46.643 46.643 0 0 0-3.55 17.86c0 4.6.68 9.08 1.95 13.32 1.04 3.5 2.49 6.83 4.28 9.95l-19.43 21.5c-1.25 1.37-1.17 3.52.21 4.77l12.92 11.8a3.35 3.35 0 0 0 4.76-.21l18.6-20.77c3.09 1.78 6.39 3.25 9.85 4.29l.11.02c4.26 1.28 8.77 1.97 13.39 1.97 6.27 0 12.3-1.28 17.81-3.55a46.945 46.945 0 0 0 15.17-10.11c4.3-4.3 7.77-9.44 10.13-15.14a46.723 46.723 0 0 0 3.54-17.84c0-6.26-1.27-12.3-3.54-17.81a47.053 47.053 0 0 0-10.13-15.17 46.466 46.466 0 0 0-15.12-10.13 46.643 46.643 0 0 0-17.86-3.55zm-20.6 26.04c2.68-2.67 5.9-4.85 9.48-6.33l.17-.07c3.35-1.37 7.05-2.12 10.95-2.12 3.97 0 7.75.79 11.14 2.18 3.57 1.49 6.79 3.67 9.47 6.34 5.26 5.28 8.54 12.57 8.54 20.62 0 3.97-.8 7.74-2.19 11.13a29.29 29.29 0 0 1-6.34 9.47c-2.7 2.69-5.93 4.88-9.47 6.34a29.17 29.17 0 0 1-11.15 2.2c-3.96 0-7.74-.79-11.13-2.2a29.237 29.237 0 0 1-9.47-6.34c-2.67-2.68-4.87-5.91-6.34-9.47-1.4-3.39-2.2-7.17-2.2-11.13 0-3.96.8-7.74 2.2-11.14l.07-.17c1.46-3.48 3.62-6.64 6.27-9.31zM16.29 467.72V152.54h143.23v315.18H16.29zm332.62-198.1h-29.19l-.12.01h-.02l-.12.02h-.02l-.12.02h-.01l-.12.04h-.02l-.11.03h-.02l-.11.05h-.02l-.11.05h-.02c-1 .43-1.7 1.61-1.7 2.57v20.75c9.34-9.33 20.06-17.29 31.83-23.54zm-30.13-93.41c-1 .43-1.7 1.61-1.7 2.57v45.26c0 .97.7 2.15 1.7 2.58h.02l.11.05h.02l.11.04h.02l.11.03h.02l.12.04h.01l.12.02h.02l.12.02h.02l.12.01h.02l.12.01h53.6c1.54 0 2.8-1.26 2.8-2.8v-14.93l.02-.03v-30.3c0-1.2-.78-2.23-1.86-2.62l-.11-.04h-.02l-.11-.04h-.02l-.11-.03h-.02l-.12-.03h-.02l-.12-.02h-.16l-.12-.01h-53.63l-.12.01h-.16l-.12.02h-.02l-.12.03h-.01l-.12.03h-.02l-.11.04h-.02l-.11.04h-.02l-.11.05h-.02zm-40.87 187.04h-53.6c-1.32 0-2.78 1.46-2.78 2.79v45.26c0 1.33 1.25 2.8 2.78 2.8h53.6c1.03 0 1.93-.56 2.41-1.38a134.668 134.668 0 0 1-.35-48.4c-.58-.65-1.42-1.07-2.06-1.07zm0-93.63h-53.6c-1.32 0-2.78 1.46-2.78 2.79v45.26c0 1.33 1.25 2.79 2.78 2.79h53.6c1.54 0 2.8-1.24 2.8-2.79v-45.26c0-1.54-1.68-2.79-2.8-2.79zm0-93.63h-53.6c-1.32 0-2.78 1.47-2.78 2.79v45.26c0 1.33 1.25 2.8 2.78 2.8h53.6c1.54 0 2.8-1.26 2.8-2.8v-45.26c0-1.53-1.68-2.79-2.8-2.79zM120.05 321.17H55.48c-.71 0-1.36.55-1.36.99v26.53c0 .44.68.99 1.36.99h64.57c.69 0 1.37-.44 1.37-.99v-26.53c0-.54-.68-.99-1.37-.99zm267.5-269.44H212.26c-3.56 0-6.51 3-6.51 6.52v69.26c0 3.52 2.97 6.52 6.51 6.52h175.29c3.55 0 6.52-2.94 6.52-6.52V58.25c0-3.58-2.98-6.52-6.52-6.52zm-267.5 211.39H55.48c-.71 0-1.36.55-1.36.99v26.53c0 .44.68.99 1.36.99h64.57c.69 0 1.37-.45 1.37-.99v-26.53c0-.55-.68-.99-1.37-.99zm0-58.05H55.48c-.71 0-1.36.54-1.36.98v26.54c0 .44.68.98 1.36.98h64.57c.69 0 1.37-.44 1.37-.98v-26.54c0-.54-.68-.98-1.37-.98z" />
        </svg>
      );
    
    const SearchCompanyIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={searchCompanySvg} {...props} />
    );

    const companyEnterpriseSvg = () => (
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 122.88 115.49">
          <path d="M36,68.78c0,0.8-0.65,1.44-1.44,1.44c-0.8,0-1.44-0.65-1.44-1.44V33.51H2.88v71.08h4.99c0.8,0,1.44,0.65,1.44,1.44 c0,0.8-0.65,1.44-1.44,1.44H1.44c-0.8,0-1.44-0.65-1.44-1.44V32.74c0-0.58,0.24-1.11,0.62-1.5c0.38-0.38,0.91-0.62,1.5-0.62h31 V2.53c0-0.69,0.28-1.33,0.74-1.78V0.74C34.32,0.28,34.95,0,35.65,0H87c0.7,0,1.33,0.28,1.79,0.74l0.11,0.12 c0.39,0.45,0.64,1.03,0.64,1.67v28.09h31.22c0.58,0,1.11,0.24,1.49,0.62l0.01,0.01c0.38,0.38,0.62,0.91,0.62,1.49v73.29 c0,0.8-0.65,1.44-1.44,1.44h-9.14c-0.8,0-1.44-0.65-1.44-1.44c0-0.8,0.65-1.44,1.44-1.44H120V33.51H89.53v34.85 c0,0.8-0.65,1.44-1.44,1.44c-0.8,0-1.44-0.65-1.44-1.44V2.88H36V68.78L36,68.78z M97.15,68.54h15.9c0.13,0,0.24,0.08,0.24,0.17v4.7 c0,0.1-0.11,0.18-0.24,0.18h-15.9c-0.13,0-0.24-0.08-0.24-0.18v-4.7C96.91,68.62,97.02,68.54,97.15,68.54L97.15,68.54z M9.71,68.54 h15.9c0.13,0,0.24,0.08,0.24,0.17v4.7c0,0.1-0.11,0.18-0.24,0.18H9.71c-0.13,0-0.24-0.08-0.24-0.18v-4.7 C9.47,68.62,9.58,68.54,9.71,68.54L9.71,68.54z M42.46,8.47H80.2c0.63,0,1.15,0.52,1.15,1.15v12.31c0,0.63-0.52,1.15-1.15,1.15 H42.46c-0.63,0-1.15-0.52-1.15-1.15V9.62C41.3,8.99,41.82,8.47,42.46,8.47L42.46,8.47z M97.4,105.02c-1.05-2.11-2.38-3.9-3.94-5.58 c2.92,1.13,5.91,2.25,8.12,3.64c4.02,2.52,4.32,5.57,4.65,9.95H86.3c0-0.03,0-0.07,0-0.1l-0.37-3.13l1.43,1.24l7-6.09L97.4,105.02 L97.4,105.02L97.4,105.02z M26.08,100.08l2.53,7.44l1.27-4.42l-0.62-0.68c-0.28-0.41-0.34-0.77-0.19-1.08 c0.34-0.67,1.04-0.54,1.69-0.54c0.68,0,1.53-0.13,1.74,0.73c0.07,0.29-0.02,0.59-0.22,0.9l-0.62,0.68l1.27,4.42l2.29-7.44 c0.33,0.3,0.8,0.55,1.34,0.77c-0.19,0.4-0.36,0.81-0.51,1.25c-0.39,1.13-0.64,2.38-0.75,3.77l0.01,0c0,0.03,0,0.07-0.01,0.1 l-0.55,7.06H16.44c-1.1-0.08-1.66-0.65-1.75-1.63l0.38-3.9c0.11-1.39,0.5-2.48,1.13-3.32c0.42-0.55,0.94-0.96,1.51-1.28 C19.53,101.86,24.43,101.57,26.08,100.08L26.08,100.08L26.08,100.08z M24.84,89.53c-0.25,0.02-0.43,0.08-0.57,0.16 c-0.08,0.05-0.13,0.12-0.17,0.2c-0.04,0.09-0.06,0.21-0.06,0.34c0.01,0.41,0.23,0.96,0.66,1.59l0.01,0.01l1.41,2.25 c0.56,0.9,1.16,1.81,1.88,2.48c0.69,0.63,1.54,1.06,2.65,1.07c1.21,0,2.09-0.44,2.81-1.11c0.75-0.7,1.35-1.68,1.94-2.65l1.59-2.62 c0.32-0.73,0.42-1.17,0.32-1.38c-0.06-0.13-0.33-0.16-0.76-0.13c-0.28,0.06-0.56,0.01-0.87-0.15l0.79-2.38 c-2.91-0.04-4.91-0.54-7.26-2.05c-0.77-0.49-1.01-1.06-1.78-1.01c-0.59,0.11-1.08,0.38-1.47,0.8c-0.38,0.4-0.66,0.95-0.84,1.66 l0.47,2.86C25.34,89.62,25.09,89.63,24.84,89.53L24.84,89.53L24.84,89.53z M37.45,88.82c0.34,0.1,0.59,0.3,0.75,0.6 c0.24,0.49,0.15,1.21-0.3,2.23l0,0c-0.01,0.02-0.02,0.04-0.03,0.06l-1.61,2.65c-0.62,1.03-1.26,2.06-2.11,2.86 c-0.89,0.83-1.98,1.38-3.48,1.38c-1.4,0-2.45-0.54-3.31-1.33c-0.83-0.76-1.46-1.73-2.05-2.68l-1.41-2.25 c-0.53-0.79-0.8-1.51-0.82-2.1c-0.01-0.29,0.04-0.55,0.15-0.78c0.11-0.24,0.29-0.45,0.52-0.6c0.11-0.08,0.24-0.14,0.39-0.19 c-0.09-1.2-0.12-2.69-0.06-3.95c0.03-0.31,0.09-0.61,0.17-0.92c0.36-1.29,1.27-2.33,2.39-3.04c0.4-0.25,0.83-0.46,1.29-0.63 c2.72-0.98,6.32-0.45,8.25,1.64c0.79,0.85,1.28,1.98,1.38,3.47L37.45,88.82L37.45,88.82L37.45,88.82z M51.68,78.86 c-0.32,0.04-0.56,0.12-0.74,0.23c-0.12,0.08-0.2,0.18-0.25,0.29c-0.06,0.14-0.09,0.31-0.09,0.5c0.02,0.61,0.35,1.43,0.98,2.37 l0.01,0.02l0,0l2.11,3.36c0.84,1.34,1.72,2.7,2.81,3.7c1.04,0.95,2.29,1.59,3.95,1.59c1.8,0,3.12-0.66,4.18-1.66 c1.12-1.05,2.02-2.5,2.89-3.95l2.37-3.9c0.48-1.09,0.62-1.75,0.47-2.05c-0.1-0.2-0.51-0.25-1.21-0.18c-0.05,0-0.11,0-0.16,0 c-0.29,0-0.6-0.07-0.95-0.23l1.07-3.56c-4.35-0.05-7.32-0.81-10.84-3.06c-1.16-0.74-1.5-1.58-2.66-1.5 c-0.87,0.17-1.61,0.56-2.19,1.19c-0.56,0.6-0.98,1.42-1.26,2.48l0.75,4.31C52.49,79.01,52.07,79.03,51.68,78.86L51.68,78.86 L51.68,78.86z M53.64,94.59l3.78,11.11l1.9-6.59l-0.93-1.02c-0.42-0.61-0.51-1.15-0.28-1.61c0.5-1,1.55-0.81,2.52-0.81 c1.02,0,2.28-0.19,2.6,1.08c0.11,0.43-0.03,0.87-0.33,1.34l-0.93,1.02l1.9,6.59l3.42-11.11c2.47,2.22,8.82,2.67,11.54,4.18 c0.74,0.41,1.41,0.92,1.98,1.57c0.01-0.07,0.03-0.15,0.07-0.21c0.3-0.59,0.92-0.48,1.5-0.48c0.61,0,1.36-0.11,1.55,0.65 c0.06,0.25-0.02,0.52-0.19,0.8l-0.55,0.61l1.13,3.92l-1.45,1.15l0.48,6.29c-0.14,1.47-0.97,2.31-2.61,2.44H40.2 c-1.64-0.13-2.47-0.97-2.61-2.44l0.57-7.41c0.16-2.07,0.74-3.71,1.69-4.96c0.62-0.82,1.4-1.43,2.26-1.91 C44.82,97.26,51.17,96.81,53.64,94.59L53.64,94.59L53.64,94.59z M70.6,77.79c0.51,0.15,0.89,0.44,1.12,0.9 c0.36,0.73,0.22,1.8-0.45,3.33l0,0c-0.01,0.03-0.03,0.06-0.04,0.09l-2.41,3.96c-0.93,1.54-1.88,3.07-3.15,4.26 c-1.33,1.24-2.96,2.07-5.19,2.06c-2.09,0-3.66-0.8-4.95-1.98c-1.24-1.13-2.17-2.58-3.07-4l-2.11-3.36 c-0.79-1.17-1.19-2.25-1.22-3.14c-0.01-0.43,0.06-0.82,0.22-1.16c0.17-0.36,0.43-0.67,0.78-0.9c0.17-0.12,0.37-0.21,0.58-0.29 c-0.13-1.8-0.17-4.02-0.09-5.89c0.05-0.46,0.13-0.91,0.26-1.37c0.54-1.93,1.89-3.48,3.57-4.54c0.59-0.38,1.24-0.69,1.92-0.93 c4.05-1.47,9.43-0.67,12.31,2.45c1.17,1.27,1.91,2.95,2.07,5.17L70.6,77.79L70.6,77.79L70.6,77.79z M77.93,96.13l1.86-0.05 l1.55-0.04c-1.8-5.55-1.2-10.65,3.14-14.99c0.74,2.38,2.39,4.35,5.2,5.8c1.34,1,2.64,2.2,3.9,3.59c0.22-0.92-0.63-2.03-1.66-3.18 c0.95,0.47,1.83,1.13,2.45,2.4c0.72,1.47,0.71,2.71,0.47,4.31c-0.11,0.74-0.29,1.44-0.55,2.07h2.57c2.71-5.8,0.99-14.41-4.55-18.06 c-1.7-1.12-2.92-1.08-4.92-1.08c-2.28,0-3.45,0.07-5.41,1.37c-2.88,1.91-4.66,5.21-5.4,9.79C76.43,90.35,76.33,94.3,77.93,96.13 L77.93,96.13L77.93,96.13z M97.15,58.27h15.9c0.13,0,0.24,0.08,0.24,0.18v4.7c0,0.1-0.11,0.18-0.24,0.18h-15.9 c-0.13,0-0.24-0.08-0.24-0.18v-4.7C96.91,58.35,97.02,58.27,97.15,58.27L97.15,58.27z M97.15,47.99h15.9 c0.13,0,0.24,0.08,0.24,0.18v4.7c0,0.1-0.11,0.18-0.24,0.18h-15.9c-0.13,0-0.24-0.08-0.24-0.18v-4.7 C96.91,48.07,97.02,47.99,97.15,47.99L97.15,47.99z M9.71,58.27h15.9c0.13,0,0.24,0.08,0.24,0.18v4.7c0,0.1-0.11,0.18-0.24,0.18 H9.71c-0.13,0-0.24-0.08-0.24-0.18v-4.7C9.47,58.35,9.58,58.27,9.71,58.27L9.71,58.27z M9.71,47.99h15.9 c0.13,0,0.24,0.08,0.24,0.18v4.7c0,0.1-0.11,0.18-0.24,0.18H9.71c-0.13,0-0.24-0.08-0.24-0.18v-4.7 C9.47,48.07,9.58,47.99,9.71,47.99L9.71,47.99z M71.67,49.08h8.49c0.13,0,0.24,0.11,0.24,0.24v8.49c0,0.13-0.11,0.24-0.24,0.24 h-8.49c-0.13,0-0.24-0.11-0.24-0.24v-8.49C71.43,49.19,71.54,49.08,71.67,49.08L71.67,49.08z M57.08,49.08h8.49 c0.13,0,0.24,0.11,0.24,0.24v8.49c0,0.13-0.11,0.24-0.24,0.24h-8.49c-0.13,0-0.24-0.11-0.24-0.24v-8.49 C56.84,49.19,56.95,49.08,57.08,49.08L57.08,49.08z M42.49,49.08h8.49c0.13,0,0.24,0.11,0.24,0.24v8.49c0,0.13-0.11,0.24-0.24,0.24 h-8.49c-0.13,0-0.24-0.11-0.24-0.24v-8.49C42.25,49.19,42.36,49.08,42.49,49.08L42.49,49.08z M71.67,32.61h8.49 c0.13,0,0.24,0.11,0.24,0.24v8.49c0,0.13-0.11,0.24-0.24,0.24h-8.49c-0.13,0-0.24-0.11-0.24-0.24v-8.49 C71.43,32.71,71.54,32.61,71.67,32.61L71.67,32.61z M57.08,32.61h8.49c0.13,0,0.24,0.11,0.24,0.24v8.49c0,0.13-0.11,0.24-0.24,0.24 h-8.49c-0.13,0-0.24-0.11-0.24-0.24v-8.49C56.84,32.71,56.95,32.61,57.08,32.61L57.08,32.61z M42.49,32.61h8.49 c0.13,0,0.24,0.11,0.24,0.24v8.49c0,0.13-0.11,0.24-0.24,0.24h-8.49c-0.13,0-0.24-0.11-0.24-0.24v-8.49 C42.25,32.71,42.36,32.61,42.49,32.61L42.49,32.61z" />
        </svg>
      );
    
    const CompanyEnterpriseIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={companyEnterpriseSvg} {...props} />
    );
    
    const propertySvg  = () => (
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 122.88 115.52">
          <path d="M119.2,111.86V3.66H57.86V41l-3.65-2.9V2.68A2.89,2.89,0,0,1,55.05.87h0A2.92,2.92,0,0,1,57.13,0h62.8A2.92,2.92,0,0,1,122,.86l.13.14a2.9,2.9,0,0,1,.74,1.94V31.15h0v80.71H104V87.1a1.67,1.67,0,0,0-1.67-1.67H90.44v30.09h32.44v-3.66ZM7.74,115.51V79.74a6.18,6.18,0,0,1-4.27.2A5.08,5.08,0,0,1,1.12,78.3,5.2,5.2,0,0,1,0,75.64a6.72,6.72,0,0,1,1.61-5h0a1.67,1.67,0,0,1,.23-.23l38.38-30a1.38,1.38,0,0,1,1.81-.07l38.47,29.9h0l.17.15a6.34,6.34,0,0,1,1.79,5.84,5.39,5.39,0,0,1-3.4,3.82,5.9,5.9,0,0,1-4.57-.3v35.59H70.77V78.18c0-.68-26.39-21.54-29.3-23.81-3.09,2.35-30,23-30,23.91v37.24ZM41.33,79.2A14.75,14.75,0,0,1,56,93.89v15.65H26.64V93.89A14.73,14.73,0,0,1,41.33,79.2Zm1.27,2.62V93.93H53.46v0A12.17,12.17,0,0,0,42.6,81.82Zm0,14.66V107H53.46V96.48ZM40.05,107V96.48H29.2V107Zm0-13.06V81.82A12.18,12.18,0,0,0,29.2,93.89v0ZM23.94,112.32H58.71v2.55H23.94v-2.55ZM66.68,12.87h9.85a.29.29,0,0,1,.28.28v11.4a.28.28,0,0,1-.28.27H66.68a.27.27,0,0,1-.28-.27V13.15a.28.28,0,0,1,.28-.28Zm33.86,0h9.85a.29.29,0,0,1,.28.28v11.4a.28.28,0,0,1-.28.27h-9.85a.28.28,0,0,1-.28-.27V13.15a.29.29,0,0,1,.28-.28Zm-16.93,0h9.85a.29.29,0,0,1,.28.28v11.4a.28.28,0,0,1-.28.27H83.61a.27.27,0,0,1-.28-.27V13.15a.28.28,0,0,1,.28-.28ZM66.68,35.76h9.85a.28.28,0,0,1,.28.27v11.4a.29.29,0,0,1-.28.28H66.68a.28.28,0,0,1-.28-.28V36a.27.27,0,0,1,.28-.27Zm33.86,0h9.85a.28.28,0,0,1,.28.27v11.4a.29.29,0,0,1-.28.28h-9.85a.29.29,0,0,1-.28-.28V36a.28.28,0,0,1,.28-.27Zm-16.93,0h9.85a.28.28,0,0,1,.28.27v11.4a.29.29,0,0,1-.28.28H83.61a.28.28,0,0,1-.28-.28V36a.27.27,0,0,1,.28-.27Zm16.93,22.88h9.85a.29.29,0,0,1,.28.28V70.31a.29.29,0,0,1-.28.28h-9.85a.29.29,0,0,1-.28-.28V58.92a.29.29,0,0,1,.28-.28Zm-16.93,0h9.85a.29.29,0,0,1,.28.28V70.31a.29.29,0,0,1-.28.28h-3V66.82l-7.11-5.64V58.92a.28.28,0,0,1,.28-.28Z" />
        </svg>
      );
    
    const PropertyIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={propertySvg} {...props} />
    );
    const objectManageSvg  = () => (
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 4h1v1H5V4zm2 1h1V4H7v1zm15-3v8h-1V7H3v3h8v1H3v3h8v1H2V2h20zm-1 1H3v3h18V3zM5 8v1h1V8H5zm2 0v1h1V8H7zm-2 4v1h1v-1H5zm2 0v1h1v-1H7zm2-7h1V4H9v1zm0 3v1h1V8H9zm0 4v1h1v-1H9zm13 0h-4.086l.293-.293L17.5 11 16 12.5l1.5 1.5.707-.707-.293-.293H22v8h-1v1h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1zm-2.38 9.5l-2.12 2.12L15.88 22H14c-.55 0-1-.45-1-1v-2h-1v-3h1v-2.09c-.58-.21-1-.76-1-1.41 0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5c0 .65-.42 1.2-1 1.41V16h1v3h-1v2h1.88l1.62-1.62 2.12 2.12zM13 13h1v-1h-1v1zm1 5v-1h-1v1h1zm3.5 4.21l.71-.71-.71-.71-.71.71.71.71z"/><path fill="none" d="M0 0h24v24H0z"/>
        </svg>
      );
    
    const ObjectManageIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={objectManageSvg} {...props} />
    );


    const changeUserMenu = (xToken) => {
        const userListUrl = 'user/getPersonalInfo'
        let reqUrl = `${userListUrl}`
        UserAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            }
        )
        .then( (response) => {
            console.log(response)
            if(response.data.data.bornDate === undefined || response.data.data.bornDate === null ){
                response.data.data.bornDate = ''
            }
            setUser(response.data.data)
            if(response.data.data !== undefined){
                const roles = response.data.data.roles
                const exeUser = response.data.data
                const employeeData = getCurrentEmployeeData(exeUser)
                setCurrentEmployeeData(employeeData)
                changeRolesMenu(roles)
                changeEmployeeMenu(employeeData)
                if(isQuickToPage === false){
                    quickToPage()
                }else{
                    housesList()
                }
                
            }
            
        })
        .catch( (error) => {
            showInternelErrorPageForMobile()
            toast.error(error)
        })
    }

    function checkEmployeeStateAndChangeMenu(callback){
        getCurrentEmployee((result,data)=>{
            const currentCompanyId = data.companyId
            const currentEmployeeState = data.state
            const currentEmployeeRank = data.rank
            const oldCompanyId = currentEmployeeData.companyId
            const oldEmployeeState = currentEmployeeData.state
            const oldEmployeeRank = currentEmployeeData.rank
            if(result === true){
                // console.log('=====currentCompanyId====',currentCompanyId)
                // console.log('=====oldCompanyId====',oldCompanyId)
                // console.log('====currentEmployeeState=====',currentEmployeeState)
                // console.log('=====oldEmployeeState====',oldEmployeeState)
                // console.log('====currentEmployeeRank=====',currentEmployeeRank)
                // console.log('====oldEmployeeRank=====',oldEmployeeRank)
                if(currentCompanyId === oldCompanyId && currentEmployeeState === oldEmployeeState && currentEmployeeRank === oldEmployeeRank){
                    callback(true)
                }else{
                    const xToken = cookie.load('x-token')
                    changeUserMenu(xToken)
                    callback(false)
                }
            }else{
                const xToken = cookie.load('x-token')
                changeUserMenu(xToken)
                callback(false)
            }

        })
    }

    function changeEmployeeMenu(employee){
        const companyGroupMenu = document.getElementById('companyGroupMenu');
        const companyApplyMenu = document.getElementById('companyApplyMenu');
        if(employee.rank === 0 || isSales === true){
            if(employee.state === 2 || employee.state === 4){
                companyGroupMenu.style.display = null;
                if(employee.rank === 0){
                    setIsShowCompanyApplyListMenu(true)//beacuse cant get menu id
                }else{
                    setIsShowCompanyApplyListMenu(false)//beacuse cant get menu id
                }
                if(employee.state === 4){
                    setIsShowCompanyHouseListMenu(false)
                }else{
                    setIsShowCompanyHouseListMenu(true)
                }
                setIsShowCompanyObjectManageMenu(true)
            }else{
                companyGroupMenu.style.display = 'none'
                companyApplyMenu.style.display = 'flex'
            }
        }else {
            companyGroupMenu.style.display = 'none'
            companyApplyMenu.style.display = 'none'
        }
    }

    function getCurrentEmployeeData(user){
        const currentCompanyId = user.companyId
        let result = {}
        for(let i = 0 ;i<user.employeesData.length; i++){
            if(user.employeesData[i].companyId === currentCompanyId){
                result = user.employeesData[i]
                i = user.employeesData.length
            }
        }
        return result
    }

    function cleanReserveHouseParam(){
        setIsShowReserveHouseDetail(false)
        setReserveHouseDetailId('')
    }

    function turnOffPage(){
        setIsShowHousesList(false)
        setIsShowMyHousesList(false)
        setIsShowUploadHouse(false)
        setIsShowReserveHouse(false)
        setIsShowMemberList(false)
        setIsShowMemberInfo(false)
        setIsShowContact(false)
        setIsShowCollect(false)
        setIsShowMatchNeed(false)
        setIsShowRelativeLink(false)
        setIsShowCompanyApply(false);
        setIsShowCompanyApplyList(false);
        setIsShowCompanyEmployeeInfo(false);
        setIsShowCompanyHouseList(false);
        setIsShowCompanyInfo(false);
        setIsShowCompanyEmployeesList(false)
        setIsShowCompanyTransactionList(false)
        setIsShowCompanyObjectManage(false)
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
        const reqUrl = `${collectAccessTimeUrl}`
            CollectAxios.get(
                reqUrl
            )
            .then( (response) => {
                console.log('collectAccessTime success')
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    function autoLogin(accountOrMail , password){
        const LOGIN_Auth = "/auth/login/"
        const LoginData = {
            accountOrMail,
            password
        }
        LoginRegisterAxios.post(LOGIN_Auth, LoginData)
                .then((response) => {
                    console.log(response.data)
                    if((response.data.status === false || response.data.status === null) && response.data.data.includes('accout , mail or password invalid')) {
                        toast.error(`帳號或密碼錯誤`)
                    }else if(response.data.status === false && response.data.data.includes("user not verify")) {
                        toast.error(`此帳號尚未驗證完畢，請先完成帳號驗證程序。`)
                    }else{
                        changeUserMenu(response.data.data.token,true)
                        let d = new Date();
                        d.setTime(d.getTime() + (86400*30*1000)); //one month
                        cookie.save('x-token',response.data.data.token,{path:'/', expires: d})
                        toast.success(`登入成功，歡迎回來 ${LoginData['accountOrMail']}`)
                    }

                })
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    toast.error(error)
                })
    }

    useEffect(() => {
        if (init) {
            setInit(false)
            const params = new URLSearchParams(search);
            const accountOrMail = params.get('accountOrMail');
            const password = params.get('password');
            if(page === undefined || page === null){
                setIsShowHousesList(true)
            }
            collectAccessTime()
            const xToken = cookie.load('x-token')


            if(xToken!== null && xToken!== undefined){
                const decodedToken = jwt_decode(xToken);
                console.log(decodedToken)
                changeUserMenu(xToken)
                let d = new Date();
                d.setTime(d.getTime() + (86400*30*1000)); //one month
                cookie.save('x-token',xToken,{path:'/', expires: d})
            }
            else if(accountOrMail !== undefined  && accountOrMail !== null&&password !== undefined && password !== null){
                autoLogin(accountOrMail , password)
            }
        }
    }, )

    function quickToPage(){
        setIsQuickToPage(true)
        switch(page){
            case '21' :
                if(info !== '' && info !== undefined){
                    setIsShowReserveHouseDetail(true)
                    setReserveHouseDetailId(info)
                }
                reserveHouse()
                break;
            default:
        }
    }

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
        setSelectMenu(['12'])
        setIsShowRelativeLink(true)
    }

    const companyApply = () =>{
        console.log('companyApply')
        turnOffPage()
        setSelectMenu(['13'])
        setIsShowCompanyApply(true)
    }

    const companyApplyList = () =>{
        console.log('companyApplyList')
        turnOffPage()
        setSelectMenu(['15'])
        setIsShowCompanyApplyList(true)
    }

    const companyEmployeeInfo = () =>{
        console.log('companyEmployeeInfo')
        turnOffPage()
        setSelectMenu(['16'])
        setIsShowCompanyEmployeeInfo(true)
    }

    const companyHouseList = () =>{
        console.log('companyHouseList')
        turnOffPage()
        setSelectMenu(['17'])
        setIsShowCompanyHouseList(true)
    }

    const companyInfo = () =>{
        console.log('companyInfo')
        turnOffPage()
        setSelectMenu(['18'])
        setIsShowCompanyInfo(true)
    }

    const companyEmployeesList = () =>{
        console.log('companyEmployeesList')
        turnOffPage()
        setSelectMenu(['20'])
        setIsShowCompanyEmployeesList(true)
    }

    const companyObjectManage = () =>{
        console.log('companyObjectManage')
        turnOffPage()
        setSelectMenu(['23'])
        setIsShowCompanyObjectManage(true)
    }

    function reserveHouse(){
        console.log('reserveHouse')
        turnOffPage()
        setSelectMenu(['21'])
        setIsShowReserveHouse(true)
    }
    
    function companyTransactionList(){
        console.log('companyTransactionList')
        turnOffPage()
        setSelectMenu(['22'])
        setIsShowCompanyTransactionList(true)
    }

    function logout(){
        console.log('logout')
        const myHousesListMenu = document.getElementById('myHousesListMenu');
        const uploadHousesMenu = document.getElementById('uploadHousesMenu');
        const reserveHouseMenu = document.getElementById('reserveHouseMenu');
        const memberListMenu = document.getElementById('memberListMenu');
        const memberInfoMenu = document.getElementById('memberInfoMenu');
        const logoutMenu = document.getElementById('logoutMenu');
        const loginSignInMenu = document.getElementById('loginSignInMenu');
        const collectMenu = document.getElementById('collectMenu');
        const matchNeedMenu = document.getElementById('matchNeedMenu');
        // const relativeLinkMenu = document.getElementById('relativeLinkMenu');
        const companyApplyMenu = document.getElementById('companyApplyMenu');
        const companyGroupMenu = document.getElementById('companyGroupMenu');
        
        loginSignInMenu.style.display = 'flex'
        myHousesListMenu.style.display = 'none'
        uploadHousesMenu.style.display = 'none'
        reserveHouseMenu.style.display = 'none'
        memberListMenu.style.display = 'none'
        memberInfoMenu.style.display = 'none'
        collectMenu.style.display = 'none'
        logoutMenu.style.display = 'none'
        // relativeLinkMenu.style.display = 'none'
        companyGroupMenu.style.display = 'none'
        companyApplyMenu.style.display = 'none'
        // matchNeedMenu.style.display = 'flex'
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
        const myHousesListMenu = document.getElementById('myHousesListMenu');
        const uploadHousesMenu = document.getElementById('uploadHousesMenu');
        const reserveHouseMenu = document.getElementById('reserveHouseMenu');
        const memberListMenu = document.getElementById('memberListMenu');
        const memberInfoMenu = document.getElementById('memberInfoMenu');
        const logoutMenu = document.getElementById('logoutMenu');
        const loginSignInMenu = document.getElementById('loginSignInMenu');
        const collectMenu = document.getElementById('collectMenu');
        const matchNeedMenu = document.getElementById('matchNeedMenu');
        const relativeLinkMenu = document.getElementById('relativeLinkMenu')
        const relativeLinkContent = document.getElementById('relativeLinkContent')
        myHousesListMenu.style.display = 'none'
        uploadHousesMenu.style.display = 'none'
        reserveHouseMenu.style.display = 'none'
        memberListMenu.style.display = 'none'
        memberInfoMenu.style.display = 'none'
        logoutMenu.style.display = 'none'
        loginSignInMenu.style.display = 'none'
        collectMenu.style.display = 'none'
        // matchNeedMenu.style.display = 'flex'
        isSales = false
        for(let i =0;i<roles.length;i++){
            // admin
            if(roles[i]===1){
                memberListMenu.style.display = 'flex'
                memberInfoMenu.style.display = 'flex'
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
                collectMenu.style.display = 'flex'
            }
            // user
            if(roles[i]===3){
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
                memberInfoMenu.style.display = 'flex'
                reserveHouseMenu.style.display = 'flex'
            }
            // host
            if(roles[i]===2){
                myHousesListMenu.style.display = 'flex'
                uploadHousesMenu.style.display = 'flex'
                reserveHouseMenu.style.display = 'flex'
                logoutMenu.style.display = 'flex'
                loginSignInMenu.style.display = 'none'
                memberInfoMenu.style.display = 'flex'
            }
            // sales
            if(roles[i]===4){
                isSales = true
                myHousesListMenu.style.display = 'flex'
                uploadHousesMenu.style.display = 'flex'
                reserveHouseMenu.style.display = 'flex'
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
            // relativeLinkMenu.style.display = 'flex'
            logoutMenu.style.display = 'flex'
            loginSignInMenu.style.display = 'none'
            collectMenu.style.display = 'none'
            loginSignInIsOpen(false)
        }
    }


    return (
        <div>
        <ToastContainer autoClose={2000} position="top-center"/>
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
          <Menu.Item key='21' id="reserveHouseMenu" style={{'height':'50px','display':'none'}} icon={<MailOutlined />} onClick={reserveHouse}>
            預約列表
          </Menu.Item>
          <Menu.Item key='4' id="memberListMenu" style={{'height':'50px','display':'none'}} icon={<TeamOutlined />} onClick={memberList}>
            會員列表
          </Menu.Item>
          <Menu.Item key='5' id="memberInfoMenu" style={{'height':'50px','display':'none'}} icon={<UserOutlined />} onClick={memberInfo}>
            會員中心
          </Menu.Item>
          {/*<Menu.Item key='10' id="matchNeedMenu" style={{'height':'50px','display':'flex'}} icon={<HeartOutlined />} onClick={matchNeed}>*/}
          {/*  媒合系統*/}
          {/*</Menu.Item>*/}
          <Menu.Item key='9' id="collectMenu" style={{'height':'50px','display':'none'}} icon={<MonitorOutlined />} onClick={collect}>
          資料採集
          </Menu.Item>
          {/*<Menu.SubMenu*/}
          {/*      id="relativeLinkMenu"*/}
          {/*      key='11'*/}
          {/*      title={"更多"}*/}
          {/*      icon={<InfoCircleOutlined />}*/}
          {/*>*/}
          {/*    <Menu.Item key='12' id="relativeLinkContent" onClick={relativeLink} style={{'height':'50px','display':'flex'}} icon={<LinkOutlined />}>*/}
          {/*          相關連結*/}
          {/*    </Menu.Item>*/}
          {/*</Menu.SubMenu>*/}
          {/* <Menu.Item key='12' id="relativeLinkMenu" onClick={relativeLink} style={{'height':'50px','display':'flex'}} icon={<LinkOutlined />}>
                    相關連結
              </Menu.Item> */} {/*no use*/}

          <Menu.Item key='13' id="companyApplyMenu" style={{'height':'50px','display':'none'}} icon={<SearchCompanyIcon />} onClick={companyApply}>
            加入公司
          </Menu.Item>
          <Menu.SubMenu
               id="companyGroupMenu"
               key='14'
               title={"公司"}
               style={{'display':'none'}}
               icon={<PropertyIcon />} >
              <Menu.Item key='18' id="companyInfoMenu" onClick={companyInfo}  style={{'height':'50px','display':'flex'}} icon={<CompanyEnterpriseIcon />}>
                    公司簡介
              </Menu.Item>
              {
                isShowCompanyHouseListMenu?(<Menu.Item key='17' id="companyHouseListMenu" onClick={companyHouseList} style={{'height':'50px','display':'flex'}} icon={<HomeOutlined />}>
                    租屋列表
                </Menu.Item>):null           
              }

              {
                isShowCompanyObjectManageMenu?(<Menu.Item key='23' id="companyObjectManageMenu" onClick={companyObjectManage} style={{'height':'50px','display':'flex'}} icon={<ObjectManageIcon />}>
                      物件管理
                </Menu.Item>):null           
              }

              <Menu.Item key='22' id="companyTransactionListMenu" onClick={companyTransactionList} style={{'height':'50px','display':'flex'}} icon={<HomeOutlined />}>
                    成交紀錄
              </Menu.Item>
              {
                isShowCompanyApplyListMenu?(<Menu.Item key='15' id="companyApplyListMenu" onClick={companyApplyList} style={{'height':'50px','display':'flex'}} icon={<SurveysAuditIcon />}>
                    審核列表
                </Menu.Item>):null           
              }


              <Menu.Item key='20' id="companyEmployeesListMenu" onClick={companyEmployeesList} style={{'height':'50px','display':'flex'}} icon={<TeamOutlined />}>
                    員工列表
              </Menu.Item>
              <Menu.Item key='16' id="companyEmployeeInfoMenu" onClick={companyEmployeeInfo} style={{'height':'50px','display':'flex'}} icon={<UserOutlined />}>
                    員工中心
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
        isShowUploadHouse?(<HouseUpload companyId={currentEmployeeData.companyId} companyState={currentEmployeeData.state}></HouseUpload>):null           
    }

    {
        isShowReserveHouse?(<ReserveHouse isShowReserveHouseDetail={isShowReserveHouseDetail} reserveHouseDetailId={reserveHouseDetailId} cleanReserveHouseParam={cleanReserveHouseParam}></ReserveHouse>):null           
    }

    {
        isShowMatchNeed?(<MatchNeed></MatchNeed>):null           
    }



    {
        isShowMemberList?(<MemberList></MemberList>):null           
    }

    {
        isShowMemberInfo?(<MemberInfo changeUserMenu={changeUserMenu}></MemberInfo>):null           
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


    {
        isShowCompanyApply?(<CompanyApply currentEmployeeData={currentEmployeeData} changeUserMenu={changeUserMenu}></CompanyApply>):null           
    }
    {
        isShowCompanyApplyList?(<CompanyApplyList currentEmployeeData={currentEmployeeData} checkEmployeeStateAndChangeMenu={checkEmployeeStateAndChangeMenu}></CompanyApplyList>):null           
    }
    {
        isShowCompanyEmployeeInfo?(<CompanyEmployeeInfo employeeId={currentEmployeeData._id} checkEmployeeStateAndChangeMenu={checkEmployeeStateAndChangeMenu}></CompanyEmployeeInfo>):null           
    }
    {
        isShowCompanyHouseList?(<CompanyHouseList companyId={currentEmployeeData.companyId} checkEmployeeStateAndChangeMenu={checkEmployeeStateAndChangeMenu}></CompanyHouseList>):null           
    }
    {
        isShowCompanyInfo?(<CompanyInfo companyId={currentEmployeeData.companyId} checkEmployeeStateAndChangeMenu={checkEmployeeStateAndChangeMenu}></CompanyInfo>):null           
    }
    {
        isShowCompanyEmployeesList?(<CompanyEmployeesList currentEmployeeData={currentEmployeeData} checkEmployeeStateAndChangeMenu={checkEmployeeStateAndChangeMenu}></CompanyEmployeesList>):null           
    }
    {
        isShowCompanyTransactionList?(<CompanyTransactionList currentEmployeeData={currentEmployeeData} checkEmployeeStateAndChangeMenu={checkEmployeeStateAndChangeMenu}></CompanyTransactionList>):null           
    }

    {
        isShowCompanyObjectManage?(<CompanyObjectManage></CompanyObjectManage>):null           
    }   

        <div id="loginSignIn" style={{'position':'absolute','zIndex':20 ,'width':'100%','height':'100%','display':'none'}}>
            <LoginSignIn isShow={isShowLoginSignIn} loginSignInIsOpen={loginSignInIsOpen} changeUserMenu={changeUserMenu} ></LoginSignIn>
        </div>
        </div>
        
    );
};

export default Main;
