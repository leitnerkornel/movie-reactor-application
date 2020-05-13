import React from 'react';

const CoverPicture = (props) => {
    return (
        <div className="col-md-12" style={{height: "500px", backgroundColor: "#e6b31e", padding: "0"}}>
            {/* Container for the BACKDROP (Cover) picture. Needs to change the size for the original content. */}
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