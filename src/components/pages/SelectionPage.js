import React, {useState, useEffect, useCallback, useContext} from "react";
import Get from "../hook/FetchGet";
import axios from "axios";
import FetchGet from "../hook/FetchGet";
import MovieCard from "./MovieCard";
import {WatchlistContext} from "../context/WatchlistContext";

const SelectionPage = (props) => {
  let URL = props.url + "?api_key=" + props.API_KEY;
  const [isLoading, data] = Get(URL);

  let layout = (
    <React.Fragment>
      <div className="row" style={{ backgroundColor: "#e6b31e" }}>
        <div
          className="col-2 align-self-start d-flex align-items-stretch"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            backgroundColor: "#e6b31e",
          }}
        >
          <b style={pageTitleStyle}>{props.title.toUpperCase()}</b>
        </div>
        <div
          className="col-10 align-self-end"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            backgroundColor: "#2e2e2e",
            marginTop: "30px",
          }}
        >
          {data ? (
            data.results.map((movie, index) => (
              <div className="card-deck ml-5 mr-3 mt-5">
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  API_KEY={props.API_KEY}
                />
              </div>
            ))
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );

  return layout;
};

export default SelectionPage;

const pageTitleStyle = {
  position: "fixed",
  left: "12%",
  top: "36px",
  backgroundColor: "#e6b31e",
  zIndex: "1",
  textAlign: "left",
  height: "90%",
  fontSize: "1.2em",
  textOrientation: "upright",
  writingMode: "vertical-rl",
};
