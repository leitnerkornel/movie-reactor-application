import React, {useEffect, useState} from 'react';
import HorizontalLine from "../movie_detail_page/FirstRow";
import {API_KEY, API_URL_PERSON, API_URL_PICTURE, IMAGE_SIZES, IMDB_ACTOR_URL} from "../../../Constants";

import axios from "axios";
import "./ActorDetailPage.css";
import {getIdFromUrl, getAgeIfActorAlive, getAgeIfActorDead, formatDateWithDecimals} from "../../../Utils";

const ActorDetailPage = () => {
  const actorId = getIdFromUrl();

  const [birthDay, setBirthDay] = useState("");
  const [deathDay, setDeathDay] = useState(null);
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
        .get(`${API_URL_PERSON}${actorId}?api_key=${API_KEY}`)
        .then(res => {
          setBirthDay(res.data["birthday"])
          setDeathDay(res.data["deathday"])
          setName(res.data["name"])
          setBiography(res.data["biography"])
          setPlaceOfBirth(res.data["place_of_birth"])
          setImdbId(res.data["imdb_id"])
          setPictureUrl(res.data["profile_path"])
        })
    axios
        .get(`${API_URL_PERSON}${actorId}/movie_credits?api_key=${API_KEY}`)
        .then(res => {
          res.data["cast"].map((cast) => (
              setCasts(prevState => [...prevState,
                {
                  character: cast["character"],
                  movieTitle: cast["title"],
                  moviePoster: cast["poster_path"],
                  releaseYear: cast["release_date"]
                }])
          ))
        })
  }, [actorId])

  function displayAge() {
    if (deathDay !== null) {
      return <div className="actor-age-dead">
        <div className="age-title">
          <div className="age-title-text">Age of death</div>
        </div>
        <div className="age-value">
          <div className="age-value-text">
            {String(getAgeIfActorDead(deathDay, birthDay))}
          </div>
        </div>
      </div>;
    } else {
      return <div className="actor-age-alive">
        <div className="age-title">
          <div className="age-title-text">Age</div>
        </div>
        <div className="age-value">
          <div className="age-value-text">
            {String(getAgeIfActorAlive(birthDay))}</div>
        </div>
      </div>;
    }
  }

  function actorBirthAndDeathInformation() {
    if (deathDay !== null) {
      return <div className="actor-birth-death-container">
        <div className="actor-birth-date">
          <div className="actor-birth-date-title">
            <div className="actor-birth-date-title-text">Date of birth</div>
          </div>
          <div className="birth-death-value">
            {formatDateWithDecimals(birthDay)}
          </div>
        </div>
        {displayAge()}
        <div className="actor-death-date">
          <div className="actor-death-date-title">
            <div className="actor-death-date-title-text">Date of death</div>
          </div>
          <div className="birth-death-value">
            {formatDateWithDecimals(deathDay)}
          </div>
        </div>
      </div>
    } else {
      return <div className="actor-birth-death-container">
        <div className="actor-birth-date">
          <div className="actor-birth-date-title">
            <div className="actor-birth-date-title-text">Date of birth</div>
          </div>
          <div className="birth-death-value">
            {formatDateWithDecimals(birthDay)}
          </div>
        </div>
        {displayAge()}
        <div className="actor-death-date"/>
      </div>
    }
  }

  return (
      <div className={"media"}>
        <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
        </div>
        <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
          {/* The center container div. There is a grid in it. */}
          <div className="container-fluid" style={{padding: "0"}}>
            <HorizontalLine/>
            {/*Container for cover pictures*/}
            <div className="row no-gutters" style={{backgroundColor: "#343434"}}>
              <div className="col-md-12 actor-detail-container-column">
                <div className="actor-detail-container">
                  <div className="actor-poster-container">
                    <div className="actor-poster">
                      <img className="actor-poster-img"
                           src={`${API_URL_PICTURE}${IMAGE_SIZES['poster_sizes'][2]}${pictureUrl}`} alt=""/>
                    </div>
                  </div>
                  <div className="actor-information-container">
                    <div className="actor-name-container">
                      <div className="actor-name-placeholder"/>
                      <div className="actor-name">
                        <div className="actor-name-container-div">
                          <h1 style={{margin: "0"}}>{name}</h1>
                        </div>
                      </div>
                    </div>

                    {actorBirthAndDeathInformation()}
                    <div className="actor-birth-place-imdb-container">
                      <div className="actor-birth-place-container">
                        <div className="actor-birth-place-title">
                          <div className="actor-birth-place-title-text">Place of birth</div>
                        </div>
                        <div className="actor-birth-place-value-container">
                          <div className="actor-birth-place-value">{placeOfBirth}</div>
                        </div>
                      </div>
                      <div className="actor-imdb-logo-container">
                        <div className="actor-imdb-logo">
                          <a href={`${IMDB_ACTOR_URL}${imdbId}/`} target="_blank" rel="noopener noreferrer">
                            <img src={"/images/imdb64.png"} alt="IMDB page" style={{margin: "0 12px"}}/>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row no-gutters" style={{padding: "0"}}>
              <div className="col-md-12 biography-container-column">
                <div className="biography-container">
                  {biography}
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

export default ActorDetailPage;