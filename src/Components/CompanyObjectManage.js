import React, {useState, useEffect} from 'react';
import {toast} from "react-toastify";
import HousesList from "./HousesList";
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";
import {CompanyAxios} from "./axiosApi";
import {showInternelErrorPageForMobile} from "./CommonUtil";
import {Col, Row, Divider, Table, Select} from "antd";

let transferOptions = []
const priceMin1 = 0;
const priceMax1 = 9999;
const priceMin2 = 10000;
const priceMax2 = 19999;
const priceMin3 = 20000;
const priceMax3 = 39999;
const priceMin4 = 40000;
const priceMax4 = 59999;
const priceMin5 = 60000;
const priceMax5 = 9999999999999;
const columns = [
    {
        title: '名字',
        dataIndex: '名字',
        key: '名字',
        align: 'left'
    },
    {
        title: '總數',
        dataIndex: '總數',
        key: '總數',
        align: 'center'
    },
    {
        title: '10000以下',
        dataIndex: '10000以下',
        key: '10000以下',
        align: 'center'
    },
    {
        title: '10000至20000',
        dataIndex: '10000至20000',
        key: '10000至20000',
        align: 'center'
    },
    {
        title: '20000至40000',
        dataIndex: '20000至40000',
        key: '20000至40000',
        align: 'center'
    },
    {
        title: '40000至60000',
        dataIndex: '40000至60000',
        key: '40000至60000',
        align: 'center'
    },
    {
        title: '60000以上',
        dataIndex: '60000以上',
        key: '60000以上',
        align: 'center'
    },
];
const todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getDay()
const dealYearMonth = {
    year: [],
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',  ]
};

const CompanyObjectManage = (props) => {
    const xToken = cookie.load('x-token')
    const decodedToken = jwt_decode(xToken);
    const [size] = useState("large");
    const [init, setInit] = useState(true)
    const [enableTransfer, setEnableTransfer] = useState(false)
    const [companyEmployees, setCompanyEmployees] = useState({})
    const [teamHouseCount, setTeamHouseCount] = useState([])
    const [years, setYears] = useState();
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
                setYears(() => new Date().getFullYear())
                setMonths(() => dealYearMonth.month[new Date().getMonth()])
                getCompanyEmployeeInfo()
                checkYearMonth()
                checkDate(todayDate)
            }
        }, )

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
    const checkDate = (todayDate) => {
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

    console.log(props)
    function getCompanyEmployeeInfo(){
        let reqUrl = `/employees/getPersonalEmployeesInfo`
        const xToken = cookie.load('x-token')
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    console.log(response.data.data[0].companyId)
                    getCompanyEmployeesList(response.data.data[0].companyId, response.data.data[0].userData[0].name)
                    getTeamUploadHouseCounts(response.data.data[0].companyId)
                    // resolveCompanyEmployee(response.data.data)
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
                    'x-Token':xToken
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
        let reqUrl = 'house/getTeamUploadHouseCounts'
        reqUrl += `?companyId=`+ companyId + `&minPrice1=`+priceMin1+`&minPrice2=`+priceMin2+`&minPrice3=`+priceMin3+`&minPrice4=`+priceMin4+`&minPrice5=`+priceMin5+`&maxPrice1=`+priceMax1+`&maxPrice2=`+priceMax2+`&maxPrice3=`+priceMax3+`&maxPrice4=`+priceMax4+`&maxPrice5=`+priceMax5+`&minCreateTime=`+defaultDate.firstDate+`&maxCreateTime=`+defaultDate.endDate
        console.log(reqUrl)
        CompanyAxios.get(
            reqUrl,{
                headers:{
                    'x-Token':xToken
                }
            })
            .then( (response) => {
                console.log(response)
                if(response.data.status === true){
                    // console.log(response.data.data)
                    // resolveCompanyEmployee(response.data.data)
                    let temp = []
                    for(let i=0; i<response.data.data.length; i++) {
                        if(!response.data.data[i].isResign) {
                            // temp.push(response.data.data[i])
                            temp.push({key: i,
                                '名字':response.data.data[i].name,
                                '總數':`${response.data.data[i].totalUploadCount}  個`,
                                '10000以下': `${response.data.data[i].uploadCounts[0]} 個`,
                                '10000至20000':`${response.data.data[i].uploadCounts[1]} 個`,
                                '20000至40000': `${response.data.data[i].uploadCounts[2]} 個`,
                                '40000至60000':`${response.data.data[i].uploadCounts[3]} 個`,
                                '60000以上':`${response.data.data[i].uploadCounts[4]} 個`,
                            })
                        }
                    }
                    console.log(temp)
                    setTeamHouseCount(temp)
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
        setYears(dealYearMonth.year[dealYearMonth.year.indexOf(value)]);
        setEnableCheckYearMonth(true)
        defaultDate.firstDate = value+`/`+ `${dealYearMonth.month.indexOf(months) + 1}`+`/1`
        defaultDate.endDate = value+`/`+ `${dealYearMonth.month.indexOf(months) + 1}`+`/31`
        // console.log(value+`/`+ `${dealYearMonth.month.indexOf(months) + 1}`+`/1`)
        // console.log(dealYearMonth.month.indexOf(months))
    }

    const handleMonthChange = (value) => {
        setMonths(dealYearMonth.month[dealYearMonth.month.indexOf(value)]);
        setEnableCheckYearMonth(true)
        defaultDate.firstDate = years+`/`+ `${dealYearMonth.month.indexOf(value) + 1}`+`/1`
        defaultDate.endDate = years+`/`+ `${dealYearMonth.month.indexOf(value) + 1}`+`/31`
    };

    return (
        <div>
           {/*CompanyObjectManage*/}

            <HousesList owner={decodedToken.id}
                        roles={decodedToken.roles}
                        enableTranfer={enableTransfer}
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
                           style={{ width: '49%' }}
                           onChange={handleYearChange}
                           options={dealYearMonth.year.map((year) => ({ label: year, value: year }))}
                        />
                        {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        &nbsp;
                        <Select
                           style={{ width: '49%' }}
                           value={months}
                           size={size}
                           onChange={handleMonthChange}
                           options={dealYearMonth.month.map((month) => ({ label: month, value: month }))}
                        />
                        <br/>
                        <br/>
                        <Table columns={columns} dataSource={teamHouseCount} size="small"/>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={6}></Col>
                </Row>
            </div>
        </div>
    );
};

export default CompanyObjectManage;
