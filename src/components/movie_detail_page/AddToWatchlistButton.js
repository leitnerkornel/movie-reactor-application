import React from 'react';

const AddToWatchlistButton = () => {
    return (
        <div className="col-md-12 d-flex justify-content-center"
             style={columnStyle}>
            <button type="button" className="btn btn-warning"
                    style={buttonStyle}>Add to Watchlist
            </button>
        </div>
    );

}

const columnStyle = {
    height: "300px", backgroundColor: "#2e2e2e", padding: "80px 0"
}

const buttonStyle = {
    fontWeight: "bold"
}

export default AddToWatchlistButton;