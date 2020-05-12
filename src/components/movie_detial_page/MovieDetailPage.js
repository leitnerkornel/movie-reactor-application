import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

// This will came from outside
// 495764
const MOVIE_ID = 111;

const imageSizes = {
    "backdrop_sizes": ["w300", "w780", "w1280", "original"],
    "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
};


const MovieDetailPage = () => {

    const getYearFromDate = (date) => {
        return date.split("-")[0]
    }

    const [backdrop, setBackdrop] = useState('');
    const [poster, setPoster] = useState('');
    const [title, setTitle] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [popularity, setPopularity] = useState('');
    const [voteAvg, setVoteAvg] = useState('');
    const [year, setYear] = useState('');
    const [genres, setGenres] = useState([])
    const [homepage, setHomepage] = useState('')
    const [runtime, setRuntime] = useState('')
    const [budget, setBudget] = useState('')
    const [revenue, setRevenue] = useState('')
    const [originalLanguage, setOriginalLanguage] = useState('')
    const [spokenLanguages, setSpokenLanguages] = useState([])
    const [imdbId, setImdbId] = useState('')
    const [companies, setCompanies] = useState([])
    const [trailer, setTrailer] = useState('')
    const [overview, setOverview] = useState('')

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`).then((res) => {
            console.log(res.data.results[0].key)
            setTrailer(res.data.results[0].key)
        })
        axios.get(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}`).then((res) => {
            console.log(res.data);
            setBackdrop(res.data.backdrop_path);
            setPoster(res.data.poster_path);
            setTitle(res.data.title);
            setOriginalTitle(res.data.original_title);
            setPopularity(res.data.popularity);
            setVoteAvg(res.data.vote_average);
            setYear(getYearFromDate(res.data.release_date));
            setGenres(res.data.genres.map((item) => {
                return item.name
            }));
            setHomepage(res.data.homepage);
            setRuntime(res.data.runtime)
            setBudget(res.data.budget);
            setRevenue(res.data.revenue);
            setOriginalLanguage(res.data.original_language)
            setSpokenLanguages(res.data.spoken_languages.map((item) => {
                return item.name
            }));
            setImdbId(res.data.imdb_id);
            setCompanies(res.data.production_companies.map((item) => {
                return [item.name, item.logo_path]
            }))
            setOverview(res.data.overview);
        });
    }, [])

    let content = (
        <div>This is a Movie Detail Page
            <div className={'backdrop-container'}>
                <img src={`https://image.tmdb.org/t/p/${imageSizes.backdrop_sizes[1]}${backdrop}`}
                     alt="Backdrop"/>
                <div className={'poster-container'}>
                    <img src={`https://image.tmdb.org/t/p/${imageSizes.poster_sizes[2]}${poster}`} alt="Poster"/>
                </div>
                <div>{title}</div>
                <div>{originalTitle}</div>
                <div>{popularity}</div>
                <div>{voteAvg}</div>
                <div>{year}</div>
                <div>{genres}</div>
                <div>{homepage}</div>
                <div>{runtime}</div>
                <div>{budget}</div>
                <div>{revenue}</div>
                <div>{originalLanguage}</div>
                <div>{spokenLanguages}</div>
                <div>{imdbId}</div>
                <div>{companies}</div>
                <div>{trailer}</div>
                <div>{overview}</div>
            </div>
        </div>
    );

    return content;
}

MovieDetailPage.propTypes = {};

export default MovieDetailPage;