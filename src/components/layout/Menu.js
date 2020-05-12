import React, { Component } from "react";
import { elastic as BurgerMenu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <BurgerMenu isOpen={false}>
        <Link id="home" className="menu-item" to="/" style={{ color: "red" }}>
          Top Rated
        </Link>
        <Link
          id="now-playing"
          className="menu-item"
          to="/now_playing"
          style={{ color: "red" }}
        >
          Now playing
        </Link>
        <Link
          id="popular"
          className="menu-item"
          to="/popular"
          style={{ color: "red" }}
        >
          Popular
        </Link>
        <Link
          id="upcoming"
          className="menu-item"
          to="/popular"
          style={{ color: "red" }}
        >
          Upcoming
        </Link>
      </BurgerMenu>
    );
  }
}
