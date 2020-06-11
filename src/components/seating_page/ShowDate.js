import React from "react";

const ShowDate = (props) => {

    return (
        <div style={dateStlye}>
            <div className="hazy" style={{fontSize: "1.2em"}}>Date</div>
            <div style={{fontSize: "2.5em"}}>{props.date}</div>
            {/*<div className="hazy" style={{fontSize: "0.8em"}}>Date</div>*/}
            {/*<div style={{fontSize: "1.2em"}}>{props.date}</div>*/}
        </div>
    )
}

export default ShowDate;

const dateStlye = {
    position: "absolute",
    top: "42%",
    left: "38%",
    // left: "15%",
    zIndex: "0",
    color: "white",
}