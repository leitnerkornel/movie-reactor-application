import React from 'react';
import PropTypes from 'prop-types';


const LinkIMDB = (props) => {
    const IMDB_URL = "https://www.imdb.com/title/"

    return (
        <div className={"imdb-button-container"}>
            <a href={`${IMDB_URL}${props.imdbId}/`} target="_blank" rel="noopener noreferrer">
                <img src={"/images/imdb64.png"} alt="IMDB page"/>
            </a>
        </div>
    );
};

LinkIMDB.propTypes = {
    imdbId: PropTypes.string.isRequired
};

export default LinkIMDB;
