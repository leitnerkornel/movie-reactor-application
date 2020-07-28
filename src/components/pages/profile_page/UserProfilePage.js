import React, {useEffect, useState} from 'react';
import HorizontalLine from "../movie_detail_page/FirstRow";
import "./UserProfilePage.css";
import axios from "axios";

import {uuid} from "uuidv4";
import {Link} from "react-router-dom";
import {API_ALL_RESERVATION_URL, API_KEY, API_URL_MOVIE, API_URL_PICTURE, IMAGE_SIZES} from "../../../Constants";
import {checkStatus, parseJSON} from "../../../Utils";


const UserProfilePage = () => {
  let womanPicture = "woman_profile.jpg";
  let manPicture = "man_profile.png";
  let adminPicture = "admin_profile.png";

  const [reservations, setReservations] = useState([]);
  const [movieDbIds, setMovieDbIds] = useState([]);
  const [playedMovies, setPlayedMovies] = useState([]);

  console.log(reservations);
  console.log(movieDbIds);
  console.log(playedMovies);


  useEffect(() => {
    window.scrollTo(0, 0);
    axios
        .get(`${API_ALL_RESERVATION_URL}`)
        .then(res => {
          console.log(res.data);
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
          data.map((movie) => (
              setPlayedMovies(prevState => [...prevState,
                {
                  movieDbId: movie["id"],
                  movieTitle: movie["title"]
                }])
          ))
        })
  }, [movieDbIds]);

  function displayReservations() {
    let reservationContainer = [];
    for (let reservation of reservations) {
      reservationContainer.push(<div className="reservation-item-container">
        <div>{reservation["startingDate"]}</div>
        <div>{reservation["startingTime"]}</div>
        <div>{reservation["movieDbId"]}</div>
      </div>)
    }
    return <div>{reservationContainer}</div>
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
                      <img className="picture" src={`/images/${adminPicture}`} alt="Profile"/>
                    </div>
                  </div>
                </div>
                <div className="details-container">
                  <div className="username-container">
                    <div className="username-container-div">
                      <h1 className="user-name-title">Username</h1>
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
