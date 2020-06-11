import React from "react";

const Legends = (props) => {
    let freeSeatClass = "fa fa-square-o";
    let occupiedSeatClass = "fa fa-square";
    let ownReserveSeatClass = "fa fa-plus-square";


    return (
        <>
            <div style={takenSeatStyle}>
                <i className={occupiedSeatClass} aria-hidden="true" style={{fontSize: "1em"}}/>
                <div className="hazy" style={{fontSize: ".4em"}}>Taken</div>
            </div>
            <div style={freeSeatStyle}>
                <i className={freeSeatClass} aria-hidden="true" style={{fontSize: "1em"}}/>
                <div className="hazy" style={{fontSize: ".4em"}}>Free</div>
            </div>
            <div style={reserveSeatStyle}>
                <i className={ownReserveSeatClass} aria-hidden="true" style={{fontSize: "1em"}}/>
                <div className="hazy" style={{fontSize: ".4em"}}>Choose</div>
            </div>
        </>
    )
}

export default Legends;

const takenSeatStyle = {
    position: "absolute",
    bottom: "3%",
    left: "40%",
    transform: "translate(-50%, -50%) scale(3)",
    zIndex: "1",
    color: "white"
}

const freeSeatStyle = {
    position: "absolute",
    bottom: "3%",
    left: "49.5%",
    transform: "translate(-50%, -50%) scale(3)",
    zIndex: "1",
    color: "white"
}

const reserveSeatStyle = {
    position: "absolute",
    bottom: "3%",
    left: "60.5%",
    transform: "translate(-50%, -50%) scale(3)",
    zIndex: "1",
    color: "white"
}