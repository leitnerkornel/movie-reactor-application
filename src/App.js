import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/layout/Menu";
import SelectionPage from "./components/pages/SelectionPage";
import MovieDetailPage from "./components/movie_detail_page/MovieDetailPage";
import { WatchlistProvider } from "./components/context/WatchlistContext";

import logo from "./logo.svg";
import "./App.css";
import Watchlist from "./components/pages/Watchlist";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const theme = {
    background: "none",
    textAlign: "center",
    padding: "10px",
    fontSize: "1.3rem",
    borderRadius: "15px",
    fontFamily: " Helvetica, Arial, sans-serif",
  };

  document.title = "Movie Reactor";
  return (
    <WatchlistProvider>
      <div id="outer-container">
        <Router>
          <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
          <main id="page-wrap">
            <ThemeProvider theme={theme}>
              <div className="container" style={{ maxWidth: "3000px" , padding: "0"}}>
                <div className="row"></div>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <div style={cardStyle}>
                      <SelectionPage
                        url={"https://api.themoviedb.org/3/movie/top_rated"}
                        API_KEY={API_KEY}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/top_rated"
                  render={(props) => (
                    <div style={cardStyle}>
                      <SelectionPage
                        url={"https://api.themoviedb.org/3/movie/top_rated"}
                        API_KEY={API_KEY}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/now_playing"
                  render={(props) => (
                    <div style={cardStyle}>
                      <SelectionPage
                        url={"https://api.themoviedb.org/3/movie/now_playing"}
                        API_KEY={API_KEY}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/popular"
                  render={(props) => (
                    <div style={cardStyle}>
                      <SelectionPage
                        url={"https://api.themoviedb.org/3/movie/popular"}
                        API_KEY={API_KEY}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/upcoming"
                  render={(props) => (
                    <div style={cardStyle}>
                      <SelectionPage
                        url={"https://api.themoviedb.org/3/movie/upcoming"}
                        API_KEY={API_KEY}
                      />
                    </div>
                  )}
                />
                <Route path="/movie/:id" children={<MovieDetailPage />} />
                <Route
                  exact
                  path="/watchlist"
                  render={(props) => (
                    <div style={cardStyle}>
                      <Watchlist API_KEY={API_KEY} />
                    </div>
                  )}
                />
              </div>
            </ThemeProvider>
          </main>
        </Router>
      </div>{" "}
    </WatchlistProvider>
  );
}

const cardStyle = {
  display: "flex",
  flexFlow: "row wrap",
};

export default App;
