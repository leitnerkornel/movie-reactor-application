import React, { useState, useEffect, useCallback } from "react";
import Get from "../hook/FetchGet";
import axios from "axios";
import FetchGet from "../hook/FetchGet";
import MovieCard from "./MovieCard";

const SelectionPage = (props) => {
  let URL = props.url + "?api_key=" + props.API_KEY;
  const [isLoading, data] = Get(URL);

  let layout = (
    <div className="row">
      <div
        className="col-2 align-self-start d-flex align-items-stretch"
        style={{ display: "flex", flexFlow: "row wrap" }}
      ></div>
      <div
        className="col-10 align-self-center"
        style={{ display: "flex", flexFlow: "row wrap" }}
      >
        {data ? (
          data.results.map((movie, index) => (
            <div className="card-deck m-1">
              <MovieCard movie={movie} key={movie.id} API_KEY={props.API_KEY} />
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );

  return layout;
};

export default SelectionPage;
