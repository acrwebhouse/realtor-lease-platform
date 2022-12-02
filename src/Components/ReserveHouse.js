import React, {useRef,useEffect, useState} from 'react';
import ReserveHouseDetail from "./ReserveHouseDetail";
import ReserveHouseList from "./ReserveHouseList";


const ReserveHouse = (props) => {
    const [init, setInit] = useState(true);
    const [isShowReserveHouseDetail, setIsShowReserveHouseDetail] = useState(false);
    const [reserveHouseDetailId, setReserveHouseDetailId] = useState('');
    const sub = useRef();

    function showReserveHouseDetailUI(reserveHouseId){
        const reserveHouseListDiv = document.getElementById('reserveHouseListDiv');
        setReserveHouseDetailId(reserveHouseId)
        reserveHouseListDiv.style.display = 'none'
        setIsShowReserveHouseDetail(true)
    }

    function showReserveHouseListUI(){
        sub.current.refreshList();
        const reserveHouseListDiv = document.getElementById('reserveHouseListDiv');
        reserveHouseListDiv.style.display = 'flex'
        setIsShowReserveHouseDetail(false)
    }

    useEffect(() => {
        if (init) {
            setIsShowReserveHouseDetail(false)
            setInit(false)
        }
    }, )

    return (
        <div>
            <div id="reserveHouseListDiv">
                <ReserveHouseList ref={sub} showReserveHouseDetailUI={showReserveHouseDetailUI}></ReserveHouseList>
            </div>
            {
                isShowReserveHouseDetail?(<ReserveHouseDetail reserveHouseDetailId={reserveHouseDetailId} showReserveHouseListUI={showReserveHouseListUI} currentEmployeeData={props.currentEmployeeData}></ReserveHouseDetail>):null             
            }
        </div>
    );
};

export default ReserveHouse;
