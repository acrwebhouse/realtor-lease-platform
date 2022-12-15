import React, {useEffect, useState} from 'react';
import {
    Table,
    Space,
    Radio,
    Button,
    Image,
    Input,
    Select,
    Divider,
    Row,
    Col,
    DatePicker,
    message,
    Alert,
    Checkbox,
    Result,
    Descriptions
} from "antd";
import cookie from 'react-cookies'
import {HouseAxios, TransactionAxios, UserAxios} from './axiosApi'
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
    useParams
  } from "react-router-dom";
const Transaction_Auth = 'transaction/getTransactionList'
const CompanyTransactionList = (props) => {
    console.log(props)
    const [init, setInit] = useState(true);
    const [transactionsListDetail, setTransactionsListDetail] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [getTransactionArg] = useState({
        skip : '',
        limit : '',
        isDelete : 'false',
        minPrice : '0',
        maxPrice : '9999999',
        startTransactionDate : '',
        endTransactionDate : '',
        area : '',
        typeOfRental : '',
        userId : `${props.currentEmployeeData.userId}`,
        companyId : `${props.currentEmployeeData.companyId}`,
    });

    useEffect(() => {
        if (init) {
            setInit(false)
            getHousesTransactionList()
        }
    }, )

    const getHousesTransactionList = () => {
        const xToken = cookie.load('x-token')
        let reqUrl = `${Transaction_Auth}?start=${getTransactionArg.start}&&isDelete=${getTransactionArg.isDelete}&&minPrice=${getTransactionArg.minPrice}&&maxPrice=${getTransactionArg.maxPrice}&&userId=${getTransactionArg.userId}&&companyId=${getTransactionArg.companyId}`

        UserAxios.get(
            reqUrl,{
                headers:{
                    "content-type": "application/json",
                    "accept": "application/json",
                    'x-Token':xToken
                }
            }
        )
            .then( (response) => {
                console.log(response)
                resolveTransactionsList(response)
            })
            .catch( (error) => message.error(error, 3))
    }

    function resolveTransactionsList(response){
        console.log(moment(response.data.data[0].startRentDate).format('YYYY/MM/DD'))
        let data = []
        if(response.data && response.data.data){

            const items = response.data.data
            setTransactionsListDetail([])
            setTransactionsListDetail(items)
            for(let i = 0 ;i<items.length; i++){

                const item = {
                    key: i,
                    actualPrice: `成交價 : ${items[i].actualPrice}`,
                    serviceCharge: `服務費 : ${items[i].serviceCharge}`,
                    content: [`成交日 : ${moment(items[i].transactionDate).format('YYYY/MM/DD')}`, `起租日 : ${moment(items[i].startRentDate).format('YYYY/MM/DD')}`, `結租日 : ${moment(items[i].endRentDate).format('YYYY/MM/DD')}`],
                }

                data.push(item)
            }
            setTransactions(data)
        }
    }

    console.log(transactions)
    return (
        <div>
            {JSON.stringify(props.currentEmployeeData)}
            {/* CompanyTransactionList page */}
        </div>
    );
};

export default CompanyTransactionList;
