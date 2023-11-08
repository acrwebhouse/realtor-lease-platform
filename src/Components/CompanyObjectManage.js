import React, {useState, useEffect} from 'react';
import {toast} from "react-toastify";
import HousesList from "./HousesList";
import cookie from 'react-cookies'
import {CompanyAxios} from "./axiosApi";
import {showInternelErrorPageForMobile} from "./CommonUtil";
import {Col, Row, Divider, Table, Select, Button} from "antd";
import {getPersonalInfo,xTokenName} from './Auth'

let transferOptions = []
const priceMin1 = 0;
const priceMax1 = 19999;
const priceMin2 = 20000;
const priceMax2 = 39999;
const priceMin3 = 40000;
const priceMax3 = 99999999;
// const priceMin4 = 40000;
// const priceMax4 = 59999;
// const priceMin5 = 60000;
// const priceMax5 = 99999999;
const columns = [
    {
        title: '名字',
        dataIndex: '名字',
        key: '名字',
        align: 'left'
    },
    // {
    //     title: '總數',
    //     dataIndex: '總數',
    //     key: '總數',
    //     align: 'center'
    // },
    {
        // title: '10000以下',
        title: '2萬以下',
        dataIndex: '20000以下',
        key: '20000以下',
        align: 'center'
    },
    // {
    //     // title: '10000至20000',
    //     title: '1～2萬',
    //     dataIndex: '10000至20000',
    //     key: '10000至20000',
    //     align: 'center'
    // },
    {
        // title: '20000至40000',
        title: '2～4萬',
        dataIndex: '20000至40000',
        key: '20000至40000',
        align: 'center'
    },
    // {
    //     // title: '40000至60000',
    //     title: '4～6萬',
    //     dataIndex: '40000至60000',
    //     key: '40000至60000',
    //     align: 'center'
    // },
    {
        // title: '60000以上',
        title: '4萬以上',
        dataIndex: '40000以上',
        key: '40000以上',
        align: 'center'
    },
];

const columnsTotal = [
    {
        title: '名字',
        dataIndex: '名字',
        width: 100,
        key: '名字',
        align: 'left'
    },
    {
        title: '總數',
        dataIndex: '總數',
        key: '總數',
        align: 'center'
    },

];
const todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getDay()
const dealYearMonth = {
    year: ['前一週', '前兩週'],
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',  ]
};

const CompanyObjectManage = (props) => {
    const [size] = useState("large");
    const [init, setInit] = useState(true)
    const [user, setUser] = useState({})
    const [isShowHousesList, setIsShowHousesList] = useState(false);
    const [enableTransfer, setEnableTransfer] = useState(false)
    const [companyEmployees, setCompanyEmployees] = useState({})
    const [teamHouseCount, setTeamHouseCount] = useState([])
    const [teamHouseTotal, setTeamHouseTotal] = useState([])
    const [years, setYears] = useState();
    const [enableMonth, setEnableMonth] = useState(true)
    const [months, setMonths] = useState();
    const [enableCheckYearMonth, setEnableCheckYearMonth] = useState(false)
    const [defaultDate] = useState({
        firstDate: [],
        endDate: [],
    })

    useEffect(() => {
            if (init) {
                setInit(false)
                setEnableTransfer(true)
                // setYears(() => new Date().getFullYear())
                // setMonths(() => dealYearMonth.month[new Date().getMonth()])
                setYears(dealYearMonth.year[0])
                setMonths('-')
                getCompanyEmployeeInfo()
                checkYearMonth()
                checkLastWeek(todayDate)
                const xToken = cookie.load(xTokenName)
                getPersonalInfo(xToken).then( (userResponse) => {
                    if(userResponse.data.data !== undefined){
                        const user = userResponse.data.data
                        setUser(user)
                        setIsShowHousesList(true)
                    }
                })
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    toast.error(error)
                })
            }
        }, )
    console.log(enableTransfer, user, user.employeesData)
    useEffect(() => {
        if (enableCheckYearMonth) {
            setEnableCheckYearMonth(false)
            getCompanyEmployeeInfo()
            checkYearMonth()
        }
    }, )

    const checkYearMonth = () => {
        let year = new Date().getFullYear()
        for (let i=year; i >= 2022; i--) {
            console.log(i)
            if(dealYearMonth.year.indexOf(i) < 0) {
                dealYearMonth.year.push(i)
            }
        }
    }
    console.log(todayDate)
    console.log(defaultDate.firstDate, defaultDate.endDate)
    const checkLastWeek = (todayDate) => {
        console.log(typeof(todayDate))
        switch (todayDate) {
            case 0 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-13).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7).toLocaleDateString()
                break;
            case 1 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1).toLocaleDateString()
                break;
            case 2 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-8).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-2).toLocaleDateString()
                break;
            case 3 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-9).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-3).toLocaleDateString()
                break;
            case 4 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-10).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-4).toLocaleDateString()
                break;
            case 5 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-11).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-5).toLocaleDateString()
                break;
            case 6 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-12).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-6).toLocaleDateString()
                break;
            default:
                break;


                console.log(defaultDate.firstDate, defaultDate.endDate)
        }


    }
    const checkLastTwoWeek = (todayDate) => {
        console.log(typeof(todayDate))
        switch (todayDate) {
            case 0 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-20).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-14).toLocaleDateString()
                break;
            case 1 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-14).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-8).toLocaleDateString()
                break;
            case 2 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-15).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-9).toLocaleDateString()
                break;
            case 3 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-16).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-10).toLocaleDateString()
                break;
            case 4 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-17).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-11).toLocaleDateString()
                break;
            case 5 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-18).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-12).toLocaleDateString()
                break;
            case 6 :
                defaultDate.firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-19).toLocaleDateString()
                defaultDate.endDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-13).toLocaleDateString()
                break;
            default:
                break;


                console.log(defaultDate.firstDate, defaultDate.endDate)
        }


    }
    console.log(props)
    function getCompanyEmployeeInfo(){
        let reqUrl = `/employees/getPersonalEmployeesInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    console.log(response.data.data[0])
                    for (let i = 0; i< response.data.data.length; i++) {
                        if((!response.data.data[i].isResign) && response.data.data[i].state ===2 ) {
                            getCompanyEmployeesList(response.data.data[i].companyId, response.data.data[i].userData[0].name)
                            getTeamUploadHouseCounts(response.data.data[i].companyId)
                            // resolveCompanyEmployee(response.data.data)
                        }

                    }
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    const getCompanyEmployeesList = (companyId, salesName) => {
        let reqUrl = `employees/getEmployeesListByCompanyId`
        reqUrl += `?companyId=`+ companyId
        console.log(reqUrl)
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    console.log(response.data.data)
                    // resolveCompanyEmployee(response.data.data)
                    setCompanyEmployees(response.data.data)
                    transferOptions.splice(0, transferOptions.length)
                    for (let i = 0; i< response.data.data.length; i++) {
                        if((!response.data.data[i].isResign) && response.data.data[i].state ===2 ) {
                            if(salesName !== response.data.data[i].userData[0].name) {
                                transferOptions.push({value : `${response.data.data[i].userData[0].name}`, label : `${response.data.data[i].userData[0].name}`})
                            }
                        }
                    }
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }
    console.log(transferOptions)
    console.log(companyEmployees)

    const getTeamUploadHouseCounts = (companyId) => {
        const xToken = cookie.load(xTokenName)
        let reqUrl = 'house/getTeamUploadHouseCounts'
        // reqUrl += `?companyId=`+ companyId + `&minPrice1=`+priceMin1+`&minPrice2=`+priceMin2+`&minPrice3=`+priceMin3+`&minPrice4=`+priceMin4+`&minPrice5=`+priceMin5+`&maxPrice1=`+priceMax1+`&maxPrice2=`+priceMax2+`&maxPrice3=`+priceMax3+`&maxPrice4=`+priceMax4+`&maxPrice5=`+priceMax5+`&minCreateTime=`+defaultDate.firstDate+`&maxCreateTime=`+defaultDate.endDate
        reqUrl += `?companyId=`+ companyId + `&minPrice1=`+priceMin1+`&minPrice2=`+priceMin2+`&minPrice3=`+priceMin3+`&maxPrice1=`+priceMax1+`&maxPrice2=`+priceMax2+`&maxPrice3=`+priceMax3+`&minCreateTime=`+defaultDate.firstDate+`&maxCreateTime=`+defaultDate.endDate
        console.log(reqUrl)
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    // console.log(response.data.data)
                    // resolveCompanyEmployee(response.data.data)
                    let temp = []
                    let tempTotal = []
                    for(let i=0; i<response.data.data.length; i++) {
                        if(!response.data.data[i].isResign) {
                            // temp.push(response.data.data[i])
                            temp.push({key: i,
                                '名字':response.data.data[i].name,
                                // '總數':`${response.data.data[i].totalUploadCount} `,
                                '20000以下': `${response.data.data[i].uploadCounts[0]} `,
                                '20000至40000':`${response.data.data[i].uploadCounts[1]} `,
                                // '20000至40000': `${response.data.data[i].uploadCounts[2]} `,
                                // '40000至60000':`${response.data.data[i].uploadCounts[3]} `,
                                '40000以上':`${response.data.data[i].uploadCounts[2]} `,
                            })
                        }
                    }
                    for(let i=0; i<response.data.data.length; i++) {
                        if(!response.data.data[i].isResign) {
                            // temp.push(response.data.data[i])
                            tempTotal.push({key: i,
                                '名字':response.data.data[i].name,
                                '總數':`${response.data.data[i].totalUploadCount} `,
                            })
                        }
                    }
                    console.log(temp)
                    setTeamHouseCount(temp)
                    setTeamHouseTotal(tempTotal)
                }else{
                    toast.error('員工資訊取得失敗')
                }
            })
            .catch( (error) => {
                showInternelErrorPageForMobile()
                toast.error(error)
            })
    }

    const handleYearChange = (value) => {
        switch (value) {
            case '前一週' :
                console.log('123')
                setYears(dealYearMonth.year[dealYearMonth.year.indexOf(value)]);
                checkLastWeek(todayDate)
                setEnableMonth(true)
                setMonths('-')
                getCompanyEmployeeInfo()
                break;
            case '前兩週' :
                setYears(dealYearMonth.year[dealYearMonth.year.indexOf(value)]);
                checkLastTwoWeek(todayDate)
                setEnableMonth(true)
                setMonths('-')
                getCompanyEmployeeInfo()
                break;
            default :
                setYears(dealYearMonth.year[dealYearMonth.year.indexOf(value)]);
                setEnableCheckYearMonth(true)
                console.log(value)
                if(value === new Date().getFullYear()) {
                    setMonths(dealYearMonth.month[new Date().getMonth()])
                    defaultDate.firstDate = new Date(value, new Date().getMonth(), 1).toLocaleDateString()
                    defaultDate.endDate = new Date(value,new Date().getMonth() + 1, 0).toLocaleDateString()
                }else {
                    setMonths(dealYearMonth.month[0])
                    defaultDate.firstDate = new Date(value, dealYearMonth.month.indexOf(dealYearMonth.month[0]), 1).toLocaleDateString()
                    defaultDate.endDate = new Date(value, dealYearMonth.month.indexOf(dealYearMonth.month[0]) + 1, 0).toLocaleDateString()
                }

                setEnableMonth(false)
                break;
        }
    }
    const handleMonthChange = (value) => {
        setMonths(dealYearMonth.month[dealYearMonth.month.indexOf(value)]);
        setEnableCheckYearMonth(true)
        defaultDate.firstDate = new Date(years, `${dealYearMonth.month.indexOf(value)}`, 1).toLocaleDateString()
        defaultDate.endDate = new Date(years, `${dealYearMonth.month.indexOf(value) + 1}`, 0).toLocaleDateString()
    };


    return (
        <div>
           {/*CompanyObjectManage*/}

            {isShowHousesList ? (
                    <div>
                        <HousesList owner={user._id}
                                    roles={user.roles}
                                    companyManager={user.employeesData[0].rank}
                                    enableTransfer={enableTransfer}
                                    companyEmployees={companyEmployees}
                                    transferOptions={transferOptions}
                        />
                        <div>
                            <Row>
                                <Col xs={24} sm={8} md={8} lg={8} xl={6}></Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={12}>
                                    <Divider>物件數量</Divider>
                                    <Select
                                        defaultValue={years}
                                        value={years}
                                        size={size}
                                        style={{width: '49%'}}
                                        onChange={handleYearChange}
                                        options={dealYearMonth.year.map((year) => ({label: year, value: year}))}
                                    />
                                    {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                                    &nbsp;
                                    <Select
                                        style={{width: '49%'}}
                                        value={months}
                                        size={size}
                                        disabled={enableMonth}
                                        onChange={handleMonthChange}
                                        options={dealYearMonth.month.map((month) => ({label: month, value: month}))}
                                    />
                                    <br/>
                                    <br/>
                                    <h1>{defaultDate.firstDate} ~ {defaultDate.endDate}</h1>
                                    <Table columns={columns} dataSource={teamHouseCount} size="small"/>
                                    <h1>總數</h1>
                                    <Table columns={columnsTotal} dataSource={teamHouseTotal} size="small"/>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={6}></Col>
                            </Row>
                        </div>
                    </div>
                    ):null}
        </div>
    );
};

export default CompanyObjectManage;
