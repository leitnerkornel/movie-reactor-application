import React from "react";

const ShowTime = (props) => {

    return (
        <div style={timeStlye}>
            <div className="hazy" style={{fontSize: "1.2em"}}>Show time</div>
            <div style={{fontSize: "2.5em"}}>{props.time}</div>
            {/*<div className="hazy" style={{fontSize: "0.8em"}}>Show time</div>*/}
            {/*<div style={{fontSize: "1.2em"}}>{props.time}</div>*/}
        </div>
    )
}

export default ShowTime;

const timeStlye = {
    position: "absolute",
    top: "42%",
    left: "57%",
    // left: "25%",
    zIndex: "0",
    color: "white",
}
