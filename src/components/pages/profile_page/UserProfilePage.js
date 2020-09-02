import React, {useEffect, useState} from 'react';
import HorizontalLine from "../movie_detail_page/FirstRow";
import "./UserProfilePage.css";
import axios from "axios";

import {uuid} from "uuidv4";
import {API_ALL_RESERVATION_URL, API_KEY, API_URL_MOVIE, GET_CONFIG, POST_CONFIG} from "../../../Constants";
import {checkStatus, formatDateWithDecimals, formatTime, parseJSON} from "../../../Utils";
import {Link} from "react-router-dom";

const UserProfilePage = () => {
  let womanPicture = "woman_profile.jpg";
  let manPicture = "man_profile.png";
  let adminPicture = "admin_profile.png";

  const userProfilePictures = {};
  userProfilePictures["MAN"] = manPicture;
  userProfilePictures["WOMAN"] = womanPicture;
  userProfilePictures["GENERAL"] = adminPicture;

  const [reservations, setReservations] = useState([]);
  const [movieDbIds, setMovieDbIds] = useState([]);
  const [playedMovies, setPlayedMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
        .get(`${API_ALL_RESERVATION_URL}`, GET_CONFIG) // TODO: check endpoint
        .then(res => {
          setMovieDbIds([...new Set(res.data.map(item => item["movieDbId"]))]);
          setReservations(res.data);
        })

  }, [])

  useEffect(() => {
    const urls = movieDbIds.map(movieId => `${API_URL_MOVIE}${movieId}?api_key=${API_KEY}`);

    Promise.all(urls.map(url =>
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch(error => console.log('There was a problem!', error))
    ))
        .then(data => {
          data.map((movie) => {
            let movieObj = {};
            movieObj[movie["id"]] = movie["title"];
            setPlayedMovies(prevState => [...prevState,
              movieObj])
          })
        })
        .then(() => {
          reservations.map((reservation) => {
            reservation.push("Title");
          })
        })
  }, [movieDbIds]);

  const getMovieTitle = (movies, searchedId) => {
    for (const movie of movies) {
      for (const [key, value] of Object.entries(movie)) {
        if (parseInt(key) === searchedId) {
          return value;
        }
      }
    }
  }

  const deleteReservedSeat = (event, showId, seatId) => {
    let currentItem = event.target.parentElement.parentElement;
    let seatsForDelete = {};
    seatsForDelete.id = parseInt(showId);
    seatsForDelete.seats = [parseInt(seatId)];
    axios
        .delete(`http://localhost:8080/reservation/delete`, { // TODO: check endpoint
          headers: POST_CONFIG,
          data: seatsForDelete
        })
        .then(response => {
          if (response.data === true) {
            deleteIndicator(currentItem, "");
          } else {
            deleteIndicator(currentItem, "un")
          }
        });
  }

  const deleteIndicator = (element, status) => {
    element.innerHTML = `<div class=${status+"successful-delete"}>
            <strong>Reservation ${status}successfully deleted!</strong></div>`;
    setTimeout(() => {
      element.style.display = "none";
    }, 3000)
  };

  const displayReservations = () => {
    let reservationContainer = [];
    for (let reservation of reservations) {
      reservationContainer.push(<div key={uuid()} className="reservation-item-container">
        <div title={`Seat Id: ${reservation.id}\nShow Id: ${reservation.showId}`}
             className="reservation-seat-picture-container">
          <img className="reservation-seat-img" src={`/images/movie_seat_64.png`} alt="Movie seat"/>
        </div>
        <div className="reservation-data">{formatDateWithDecimals(reservation["startingDate"])}</div>
        <div className="reservation-data">{reservation["startingTime"]}</div>
        <div className="reservation-data seat-info">{`Row: ${reservation["rowNumber"]}`}</div>
        <div className="reservation-data seat-info">{`Seat: ${reservation["seatNumber"]}`}</div>
        <div className="reservation-movie-title"><Link to={`/movie/${reservation["movieDbId"]}`}
                                                       className="movie-link">{getMovieTitle(playedMovies, reservation["movieDbId"])}</Link>
        </div>
        <div className="reservation-delete-button-container">
          <img className="delete-button-img" onClick={(event) => {
            deleteReservedSeat(event, reservation["showId"], reservation["id"])
          }} src={`/images/delete_button_64.png`} alt="Delete reservation button"/>
        </div>
      </div>)
    }
    return <div className="reservations-rows-container">{reservationContainer}</div>
  }

  return (
      <div className={"media"}>
        <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
        </div>
        <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
          {/* The center container div. There is a grid in it. */}
          <div className="container-fluid" style={{padding: "0"}}>
            <HorizontalLine/>
            <div className="row no-gutters" style={{backgroundColor: "green"}}>
              <div className="picture-name-container">
                <div className="picture-container">
                  <div className="profile-picture">
                    <div className="profile-picture-frame">
                      <img className="picture" src={`/images/${userProfilePictures[localStorage.getItem("gender")]}`} alt="Profile"/>
                    </div>
                  </div>
                </div>
                <div className="details-container">
                  <div className="username-container">
                    <div className="username-container-div">
                      <h1 className="user-name-title">{localStorage.getItem("username")}</h1>
                    </div>
                  </div>
                  {/*Empty div (currently a placeholder) for further user info, like: email, birthday, male, etc...*/}
                  <div className="user-details-container"/>
                </div>
              </div>
            </div>
            {/*Can remove or change color if it isn't fit into the look*/}
            <HorizontalLine/>
            <div className="row no-gutters" style={{padding: "0"}}>
              <div className="col-md-12 reservations-title-column">
                <div className="reservations">
                  <div className="reservations-title-container">
                    <div className="reservation-value">
                      {"Reservations".toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 reservations-container-column">
                <div className="reservations-container">
                  {displayReservations()}
                  <div className="reservations-rows-container">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 align-self-end" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}/>
      </div>
  );
};

const mainColumnStyle = {
  display: "flex",
  flexFlow: "row wrap",
  height: "1200px",
  padding: "0"
}

export default UserProfilePage;
