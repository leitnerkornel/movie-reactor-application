import React from "react";

const TheaterSeat = (props) => {

    let row = props.row+1;
    let column = props.column+1

    return (
        <div>
            <i className="seat fa fa-square-o" aria-hidden="true"
               data-row={row}
               data-column={column}
               data-toggle="tooltip"
               title={`Seat ${column} in row ${row}`}
               style={seatStyle}/>
            <p/>
        </div>
    )
}

export default TheaterSeat;

const seatStyle = {
    transform: "scale(5)",
    margin: "2em",
    textShadow: "0px 0px 3px #e6b31e",
    color: "white"
}
