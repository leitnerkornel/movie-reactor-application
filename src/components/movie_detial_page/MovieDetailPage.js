import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY)

const imageSizes = {
    "backdrop_sizes": ["w300", "w780", "w1280", "original"],
    "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
};


const MovieDetailPage = () => {

    const [backdrop, setBackdrop] = useState('');
    const [poster, setPoster] = useState('');

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/495764?api_key=${API_KEY}`).then((res) => {
            console.log(res.data);
            setBackdrop(res.data.backdrop_path);
            setPoster(res.data.poster_path)
        });
    })

    let content = (
        <div>
            <div className={'backdrop-container'}>
                <img src={`https://image.tmdb.org/t/p/${imageSizes.backdrop_sizes[1]}${backdrop}`}
                     alt="Backdrop"/>
                <div className={'poster-container'}>
                    <img src={`https://image.tmdb.org/t/p/${imageSizes.poster_sizes[2]}${poster}`} alt="Poster"/>
                </div>
            </div>
            This is a Movie Detail
        </div>
    );

    return content;
}

MovieDetailPage.propTypes = {};

export default MovieDetailPage;