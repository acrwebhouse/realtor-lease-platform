import React, {useEffect, useState} from 'react';
import cookie from 'react-cookies'
import {
    useParams
  } from "react-router-dom";
import HouseDetail from "./HouseDetail";
import {getPersonalInfo} from './Auth'

const HouseDetailOwner = (prop) => {
    const { id,owner } = useParams();
    const [init, setInit] = useState(true);
    const [isShow, setIsShow ] = useState(false);
    const [isAdmin, setIsAdmin ] = useState(false);

    useEffect(() => {
        if (init) {
            const xToken = cookie.load('x-token')
            if(xToken){
                getPersonalInfo(xToken).then( (userResponse) => {
                    if(userResponse.data.data !== undefined){
                        const user = userResponse.data.data
                        for(let i = 0 ;i<user.roles.length; i++){
                            if(user.roles[i] === 1){
                                setIsAdmin(true)
                            }
                        }
                        if(user._id === owner){
                            setIsShow(true);
                        }else{
                            alert('您不是負責人無法編輯')
                        }
                    }
                })
                .catch( (error) => {
                })
            }else{
                alert('請先登入')
            }
            setInit(false)
            
            
        }
    }, )
    return (
       <div>
           {
               isShow?(<HouseDetail isOwner = {true} isAdmin = {isAdmin} setId = {id}></HouseDetail>):null
           } 
       </div>
    );
};

export default HouseDetailOwner;
