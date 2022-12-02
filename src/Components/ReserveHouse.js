import React, {useEffect, useState} from 'react';
import ReserveHouseDetail from "./ReserveHouseDetail";
import ReserveHouseList from "./ReserveHouseList";


const ReserveHouse = (props) => {
    const [init, setInit] = useState(true);
    const [isShowReserveHouseList, setIsShowReserveHouseList] = useState(false);
    const [isShowReserveHouseDetail, setIsShowReserveHouseDetail] = useState(false);
    const [reserveHouseDetailId, setReserveHouseDetailId] = useState('');

    function showReserveHouseDetailUI(reserveHouseId){
        setReserveHouseDetailId(reserveHouseId)
        setIsShowReserveHouseList(false)
        setIsShowReserveHouseDetail(true)
    }

    function showReserveHouseListUI(){
        setIsShowReserveHouseList(true)
        setIsShowReserveHouseDetail(false)
    }

    useEffect(() => {
        if (init) {
            setIsShowReserveHouseList(true)
            setIsShowReserveHouseDetail(false)
            setInit(false)
        }
    }, )

    return (
        <div>
            {
                isShowReserveHouseList?(<ReserveHouseList showReserveHouseDetailUI={showReserveHouseDetailUI}></ReserveHouseList>):null                        
            }
            {
                isShowReserveHouseDetail?(<ReserveHouseDetail reserveHouseDetailId={reserveHouseDetailId} showReserveHouseListUI={showReserveHouseListUI} currentEmployeeData={props.currentEmployeeData}></ReserveHouseDetail>):null             
            }
        </div>
    );
};

export default ReserveHouse;
