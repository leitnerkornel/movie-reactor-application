import React from "react";

const TheaterSeat = (props) => {

    return (
        <div>
            <i className="seat fa fa-square-o" aria-hidden="true" data-row={props.row+1} data-column={props.column+1} style={seatStyle}/>
            <p/>
        </div>
    )
}

export default TheaterSeat;

const seatStyle = {
    transform: "scale(5)",
    padding: "2em",
    textShadow: "0px 0px 3px #e6b31e",
    color: "white"
}
