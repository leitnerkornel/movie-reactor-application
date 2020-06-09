import React from 'react';

const Tagline = (props) => {
    return (
        <div className="col-md-12 d-flex justify-content-center align-content-center flex-wrap"
             style={divStyle}>
            <p style={pStyle}>{props.tagline}</p>
        </div>
    );
}

const divStyle = {
    height: "100px", backgroundColor: "#2e2e2e"
}

const pStyle = {
    fontStyle: "italic",
    fontSize: "20px",
    color: "white",
    textAlign: "center"
}

export default Tagline;