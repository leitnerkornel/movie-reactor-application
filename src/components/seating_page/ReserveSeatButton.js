import React from "react";
import "./ReserveSeatButton.css";

const ReserveSeatButton = (props) => {
    let freeSeatClass = "fa fa-square-o";
    let occupiedSeatClass = "fa fa-square";
    let ownReserveSeatClass = "fa fa-plus-square";


    return (
        <div className="reserve-button">
            <div className="hazy">Reserve selected</div>
        </div>
    )
}

export default ReserveSeatButton;
