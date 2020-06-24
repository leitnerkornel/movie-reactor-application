import React, {useEffect, useState} from 'react';
import HorizontalLine from "../movie_detail_page/FirstRow";
import {API_KEY, API_URL_PERSON} from "../../../Constants";

import axios from "axios";
import "./ActorDetailPage.css";
import {getIdFromUrl} from "../../../Utils";

const ActorDetailPage = () => {
  const actorId = getIdFromUrl();

  const [birthDay, setBirthDay] = useState("");
  const [deathDay, setDeathDay] = useState("");
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [imdbId, setImdbId] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [casts, setCasts] = useState([]);

  console.log(casts);

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
          console.log(res.data["cast"]);
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
  }, [])


  return (
      <div className={"media"}>
        <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
        </div>
        <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
          {/* The center container div. There is a grid in it. */}
          <div className="container-fluid" style={{padding: "0"}}>
            <HorizontalLine/>
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
