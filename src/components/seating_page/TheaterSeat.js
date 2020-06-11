import React from "react";

const TheaterSeat = (props) => {

    return (
        <div
            // className="card" style={{color: "Background"}}
        >
            <i className="fa fa-square-o" aria-hidden="true" style={seatStyle}/>
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
