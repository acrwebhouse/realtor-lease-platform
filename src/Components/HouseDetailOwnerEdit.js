import React, {useEffect, useState} from 'react';
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";
import {
    useParams
  } from "react-router-dom";
import HouseDetail from "./HouseDetail";

const HouseDetailOwnerEdit = (prop) => {
    const { id,owner } = useParams();
    const [init, setInit] = useState(true);
    const [isShow, setIsShow ] = useState(false);
    

    useEffect(() => {
        if (init) {
            const xToken = cookie.load('x-token')
            if(xToken){
                const decodedToken = jwt_decode(xToken);
                console.log(decodedToken)
                if(decodedToken.id === owner){
                    setIsShow(true);
                    console.log('map!')
                }else{
                    alert('您不是負責人無法編輯')
                }
            }else{
                alert('請先登入')
            }
            setInit(false)
            
            
        }
    }, )
    return (
       <div>
           {
            //    isShow?(<HouseDetail isOwner = {true} setId = {id}></HouseDetail>):null
            // isShow?({owner}):null
           } 
           123
       </div>
    );
};

export default HouseDetailOwnerEdit;
