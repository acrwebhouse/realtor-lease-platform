import React, {useEffect, useState} from 'react';
import {Table, Button, Image, Divider, Row, Col, message, Alert, Space} from "antd";
import {
    useParams
  } from "react-router-dom";
import {HouseAxios} from './axiosApi'
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";

const houseListUrl = 'house/getHouse'
const removeHouseUrl = 'house/removeHouse'

const HouseImage = (prop) => {
    const [imageWidth, setImageWidth] = useState(null);
    const [imageHeight, setImageHeight] = useState(null);
    const [init, setInit] = useState(true);
    useEffect(() => {
        if(init){
        const img = document.getElementById('img');
        console.log(img.clientWidth)
        console.log(img.clientHeight)
        let width = img.clientWidth
        let height = img.clientHeight
        console.log(width,height)
        if(width <= height){
            setImageHeight(null)
            setImageWidth(prop.size+'px')
            const scale = prop.size/width
            const offset = ((height*scale)-prop.size)/2
            img.style.top = -offset+'px'
            setInit(false)
        }else{
            const scale = prop.size/height
            const offset = ((width*scale)-prop.size)/2
            setImageHeight(prop.size+'px')
            setImageWidth(width*scale)
            img.style.left = -offset+'px'
            setInit(false)
        }
        }
    }, )
    return (
        <div style={{width:prop.size+'px',height:prop.size+'px',position: 'relative',overflow:'hidden' } }>
             <Image id='img' width={imageWidth} height={imageHeight}  src={prop.image}  />    
        </div>
    );
};

export default HouseImage;
