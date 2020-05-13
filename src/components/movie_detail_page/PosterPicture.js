import React from 'react';

const PosterPicture = (props) => {

    return (
        <div className="row no-gutters">
            <div className="col-md-12" style={{
                height: "250px",
                /*background: "rgba(52,52,52, 0.15)",
                backdropFilter: "blur(20px)",*/
                padding: "0",
                textAlign: "center",
                position: "relative",
            }}>
                <img
                    src={`https://image.tmdb.org/t/p/${props.imageSize}${props.poster}`}
                    alt="Poster" style={{
                    height: "400px",
                    position: "absolute",
                    top: "-190px",
                    left: "90px",
                    zIndex: "1",
                    padding: "10px",
                    backgroundColor: "#343434",
                }}
                />
            </div>
        </div>
    );
}

export default PosterPicture;