import React, {useState, useEffect } from "react";
import Get from "../hook/FetchGet";
import MovieCard from "./MovieCard";

const SelectionPage = (props) => {
  let URL = props.url + "?api_key=" + props.API_KEY;
  const [isLoading, data] = Get(URL);
  // const [menuOpen, setMenuOpen] = useState(false);
  const [barStyle, setBarStyle] = useState(36);

    const [scrollY, setScrollY] = React.useState(window.pageYOffset);

    const getScrollY = () => {
        setScrollY(window.pageYOffset);
        console.log(scrollY)
    };

    useEffect(() => {
        let element = document.querySelector('#outer-container');
        let style = getComputedStyle(element)
        // setMenuOpen(style.perspective !== "none");

        // setMenuOpen(style.overflow === "hidden");
        if (style.overflow === "hidden") {
            setBarStyle(100 + (window.innerHeight/1000)*scrollY);
            // setBarStyle(100 + scrollY + scrollY/4);
        } else {
            setBarStyle(36);
        }

        window.addEventListener("scroll", getScrollY);
        return () => window.removeEventListener("scroll", getScrollY);
    });

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
          {/*<b style={{...pageTitleStyle, top: menuOpen ? 100 + scrollY + scrollY/4 : 36, transitionTimingFunction: "linear" }}>{props.title.toUpperCase()}</b>*/}
          {/*<b style={{...pageTitleStyle, top: menuOpen ? 100 + (window.innerHeight/1000)*scrollY : 36, transitionTimingFunction: "linear" }}>{props.title.toUpperCase()}</b>*/}
          <b style={{...pageTitleStyle, top: barStyle, transitionTimingFunction: "linear" }}>{props.title.toUpperCase()}</b>
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
  // top: "36px",
  backgroundColor: "#e6b31e",
  zIndex: "1",
  textAlign: "left",
  height: "90%",
  fontSize: "1.2em",
  textOrientation: "upright",
  writingMode: "vertical-rl",
};
