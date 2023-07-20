import React, {useEffect, useState} from 'react';
import HousesList from "./HousesList";
import cookie from 'react-cookies'
import {getPersonalInfo,xTokenName} from './Auth'
import {showInternelErrorPageForMobile} from './CommonUtil'

const MyHousesList = () => {
    const xToken = cookie.load(xTokenName)
    const [init, setInit] = useState(true);
    const [isShowHousesList, setIsShowHousesList] = useState(false);
    const [user, setUser] = useState(true);

    

    useEffect(() => {
        if (init) {
            setInit(false)
            console.log('init')
            getPersonalInfo(xToken).then( (userResponse) => {
                if(userResponse.data.data !== undefined){
                     setUser(userResponse.data.data)
                     setIsShowHousesList(true)
                }
                })
                .catch( (error) => {
                    showInternelErrorPageForMobile()
                    // toast.error(error)
                })
        }
    }, )

    return ( 
        <div>
            {
                isShowHousesList?(<HousesList owner={user._id} roles={user.roles}></HousesList>):null           
            }
        </div>
    );
};

export default MyHousesList;
