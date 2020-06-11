import React from "react";

const TheaterSeat = (props) => {

    let row = props.row+1;
    let column = props.column+1

    let freeSeatClass = "fa-square-o";
    let occupiedSeatClass = "fa-square";
    let ownReserveSeatClass = "fa-plus-square";

    function addReserveSeatListener(event) {
        if (event.target.classList.contains(freeSeatClass) || event.target.classList.contains(ownReserveSeatClass)) {
            event.target.classList.toggle(freeSeatClass);
            event.target.classList.toggle(ownReserveSeatClass);
        }
    }


    return (
        <div>
            <i className="theater-seat fa fa-square-o" aria-hidden="true"
               data-row={row}
               data-column={column}
               data-toggle="tooltip"
               title={`Seat ${column} in row ${row}`}
               style={seatStyle}
                onClick={addReserveSeatListener}
            />
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
