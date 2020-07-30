export const API_SCHEDULE_URL = "http://localhost:8080/schedule";
export const API_SCHEDULED_MOVIES_URL = "http://localhost:8080/scheduled-movies";
export const API_SHOW_URL = "http://localhost:8080/show/";
export const API_SEAT_ROOM_URL = "http://localhost:8080/seat/room/";
export const API_RESERVED_SEATS_URL = "http://localhost:8080/reserved-seats/show/";
export const API_ROOM_URL = "http://localhost:8080/room/";
export const API_ALL_RESERVATION_URL = "http://localhost:8080/reservation/seats"; // There are GET and POST methods for these.

export const API_URL_MOVIE = "https://api.themoviedb.org/3/movie/"
export const API_URL_PERSON = "https://api.themoviedb.org/3/person/"

export const API_URL_PICTURE = "https://image.tmdb.org/t/p/"

export const IMDB_URL = "https://www.imdb.com/title/";
export const IMDB_ACTOR_URL = "https://www.imdb.com/name/";

export const API_KEY = process.env.REACT_APP_API_KEY;

export const IMAGE_SIZES = {
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const GET_CONFIG = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    username: `${localStorage.getItem("username")}`,
  },
};

export const POST_CONFIG = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin" : "*",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  username: `${localStorage.getItem("username")}`,
};