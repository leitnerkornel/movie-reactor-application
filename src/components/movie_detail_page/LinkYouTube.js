import React from 'react';
import PropTypes from "prop-types";

const LinkYouTube = (props) => {
    const YOUTUBE_URL = "https://www.youtube.com/watch?v=";

    return (
        <div className={"youtube-button-container"}>
            <a href={`${YOUTUBE_URL}${props.youtubeTrailer}/`} target="_blank" rel="noopener noreferrer">
                <img src={"/images/youtube64.png"} alt="Youtube video"/>
            </a>
        </div>
    );
};

LinkYouTube.propTypes = {
    youtubeTrailer: PropTypes.string.isRequired
};

export default LinkYouTube;