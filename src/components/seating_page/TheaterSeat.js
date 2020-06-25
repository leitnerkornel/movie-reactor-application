import React from "react";

const TheaterSeat = (props) => {

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
               data-row={props.row}
               data-column={props.column}
               data-id={props.id}
               data-toggle="tooltip"
               title={`Seat ${props.column} in row ${props.row}`}
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
