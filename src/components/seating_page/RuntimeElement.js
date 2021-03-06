import React from "react";

const RuntimeElement = (props) => {

    return (
        <div style={runtimeStyle}>
            <div className="hazy" style={{fontSize: "1.2em"}}>Runtime</div>
            <div style={{fontSize: "2.5em"}}>{props.runtime} min</div>
            {/*<div className="hazy" style={{fontSize: "0.8em"}}>Runtime</div>*/}
            {/*<div style={{fontSize: "1.2em"}}>{props.runtime} min</div>*/}
        </div>
    )
}

export default RuntimeElement;

const runtimeStyle = {
    position: "absolute",
    top: "42%",
    right: "10%",
    // left: "33%",
    zIndex: "0",
    color: "white",
}