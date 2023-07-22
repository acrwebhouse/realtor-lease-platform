import React, {useEffect, useState} from 'react';
import {Table, Space, Radio, Button, Image, Input, Select, Divider, Row, Col, DatePicker, message, Alert, Checkbox} from "antd";
import cookie from 'react-cookies'
import {HouseAxios, UserAxios} from './axiosApi'
import moment from 'moment';
import {config} from "../Setting/config";
import {useParams} from "react-router-dom";

const houseListUrl = 'house/getHouse'

const defaultMapSource = "https://www.google.com/maps/embed/v1/place?key=" +config.GoogleMapKey + "&q="
console.log(defaultMapSource)
const aa= 'https://www.google.com/maps/embed/v1/place?key=AIzaSyB7bluQMbii0q2B5v7o6SABJRgddKW8GYE&q=25.037525,121.5637819999995'

const GoogleMapHouse = (props) => {
    const { id } = useParams();
    const [init, setInit] = useState(true);
    const [house, setHouse ] = useState(null);
    const [MapSource, setMapSource] = useState('')
    const [address] = useState(
        {
            lat : '',
            lon : ""
        }
    )

    const getHouse = () => {
        let reqUrl = `${houseListUrl}?id=${id}&&isDelete=false`
        HouseAxios.get(
            reqUrl,{}
        )
            .then( (response) => {
                // setHouse(response)
                resolveHouse(response)
            })
            .catch( (error) => message.error(error, 3))
    }

    const resolveHouse = (response) => {
        if(response.data.status){
            const data = response.data.data
            setHouse(data)
            address.lat = response.data.data.lat
            address.lon = response.data.data.lon
        }
    }

    useEffect(() => {
        if (init) {
            setInit(false)
            getHouse()
        }
    }, )

    useEffect(()=>{
        if(!init && house) {
            if(address.lat && address.lat.length > 0) {
                setMapSource(defaultMapSource+address.lat+", "+address.lon)
            } else {
                setMapSource(defaultMapSource+house.address)
            }

            console.log(MapSource)
            const main = document.getElementById('main')
            const mainWidth = main.offsetWidth
            main.style.height = mainWidth + 'px'
        }
    }, [init, house])
    // useEffect(()=>{
    //     if(!init && house) {
    //         console.log(house.houseNumber.alley, house.houseNumber.lane)
    //         let houseExtraData = '';
    //         if(house.houseNumber.lane) {
    //             if(house.houseNumber.alley) {
    //                 houseExtraData = house.address+house.houseNumber.lane+'巷' + house.houseNumber.alley+'弄' + house.houseNumber.number1+'號'
    //             } else {
    //                 houseExtraData = house.address+house.houseNumber.lane+'巷' + house.houseNumber.number1+'號'
    //             }
    //         } else {
    //             houseExtraData = house.address+ house.houseNumber.number1+'號'
    //         }
    //         setMapSource(defaultMapSource+houseExtraData)
    //         console.log(MapSource)
    //         console.log(house.address)
    //         console.log(houseExtraData)
    //         const main = document.getElementById('main')
    //         const mainWidth = main.offsetWidth
    //         main.style.height = mainWidth + 'px'
    //     }
    // }, [init, house])

    console.log(house, address, MapSource)
    return (
        <div style={{width: "100%", overflow: "hidden", height: "100%"}}>
            <iframe
                id="main"
                width="600"
                style={{border: "0", marginTop: "-125px"}}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={MapSource}
                // src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyB7bluQMbii0q2B5v7o6SABJRgddKW8GYE&q=25.0564179, 121.5531218'}
            />
        </div>
    );
};

export default GoogleMapHouse;
