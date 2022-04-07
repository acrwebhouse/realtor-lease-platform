import React from 'react';
import HousesList from "./HousesList";
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";


const MyHousesList = () => {
    const xToken = cookie.load('x-token')
    const decodedToken = jwt_decode(xToken);
    return (
        <div>
            <HousesList owner={decodedToken.id}></HousesList>
        </div>
    );
};

export default MyHousesList;
