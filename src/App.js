import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import Menu from "./components/layout/Menu";

import SelectionPage from "./components/pages/SelectionPage";
import MovieDetailPage from "./components/movie_detail_page/MovieDetailPage";
import SchedulePage from "./components/pages/schedule_page/SchedulePage";

import {WatchlistProvider} from "./components/context/WatchlistContext";
import Watchlist from "./components/pages/Watchlist";
import SeatLayout from "./components/pages/SeatLayout";

import "./App.css";

function App() {


  document.title = "Movie Reactor";
  return (
      <div id="outer-container">
        <Router>
          <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
          <WatchlistProvider>
            <main id="page-wrap">
              <ThemeProvider theme={theme}>
                <div
                    className="container-fluid"
                    style={{maxWidth: "3000px", padding: "0"}}
                >
                  <Route
                      exact
                      path="/"
                      render={() => (
                          <div style={cardStyle}>
                            <SelectionPage
                                selection={"top_rated"}
                                title={"Top rated movies"}
                            />
                          </div>
                      )}
                  />
                  <Route
                      exact
                      path="/top_rated"
                      render={() => (
                          <div style={cardStyle}>
                            <SelectionPage
                                selection={"top_rated"}
                                title={"Top rated movies"}
                            />
                          </div>
                      )}
                  />
                  <Route
                      exact
                      path="/now_playing"
                      render={() => (
                          <div style={cardStyle}>
                            <SelectionPage
                                selection={"now_playing"}
                                title={"Movies now playing"}
                            />
                          </div>
                      )}
                  />
                  <Route
                      exact
                      path="/popular"
                      render={() => (
                          <div style={cardStyle}>
                            <SelectionPage
                                selection={"popular"}
                                title={"Popular movies"}
                            />
                          </div>
                      )}
                  />
                  <Route
                      exact
                      path="/upcoming"
                      render={() => (
                          <div style={cardStyle}>
                            <SelectionPage
                                selection={"upcoming"}
                                title={"Upcoming movies"}
                            />
                          </div>
                      )}
                  />
                  <Route path="/movie/:id" children={<MovieDetailPage/>}/>
                  <Route path="/schedule" children={<SchedulePage/>}/>
                  <Route
                      exact
                      path="/watchlist"
                      render={() => (
                          <div style={cardStyle}>
                            <Watchlist title={"Your Watchlist"}/>
                          </div>
                      )}
                  />
                    <Route path="/reserve/:id" children={<SeatLayout/>} />
                </div>
              </ThemeProvider>
            </main>
          </WatchlistProvider>
        </Router>
      </div>
  );
}

const theme = {
  background: "none",
  textAlign: "center",
  padding: "10px",
  fontSize: "1.3rem",
  borderRadius: "15px",
  fontFamily: " Helvetica, Arial, sans-serif",
};

const cardStyle = {
  display: "flex",
  flexFlow: "row wrap",
};

export default App;