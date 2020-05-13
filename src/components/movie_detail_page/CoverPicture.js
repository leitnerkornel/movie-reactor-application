import React from 'react';

const CoverPicture = (props) => {

    if (props.backdrop === null) {
        /* IF NO Backdrop picture, return empty div with lower height. */
        return (
            <div className="col-md-12" style={{height: "20px", backgroundColor: "#e6b31e", padding: "0"}}>
                <div style={{textAlign: "center", padding: "2%", backgroundColor: "#343434"}}>
                </div>
            </div>
        );
    }

    return (
        <div className="col-md-12" style={{height: "400px", backgroundColor: "#e6b31e", padding: "0"}}>
            <div style={{textAlign: "center", padding: "2%", backgroundColor: "#343434"}}>
                <img
                    src={`https://image.tmdb.org/t/p/${props.size}${props.backdrop}`}
                    alt="Backdrop" style={{width: "100%"}}
                />
            </div>
        </div>
    );
}

export default CoverPicture;