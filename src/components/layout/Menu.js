import React, { Component } from "react";
import { pushRotate as BurgerMenu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  showSettings(event) {
    event.preventDefault();
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu() {
    this.setState((state) => ({ menuOpen: !state.menuOpen }));
  }

  render() {
    return (
      <BurgerMenu
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        customBurgerIcon={
          <img
            src={window.location.origin + "/reactor-logo.svg"}
            style={{ zIndex: "1" }}
          />
        }
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
      >
        <Link
          id="home"
          className="menu-item"
          to="/"
          style={{ color: "red" }}
          onClick={() => this.closeMenu()}
        >
          Top Rated
        </Link>
        <div onClick={() => this.closeMenu()}>
          <Link
            id="now-playing"
            className="menu-item"
            to="/now_playing"
            style={{ color: "red" }}
          >
            Now playing
          </Link>
        </div>
        <Link
          id="popular"
          className="menu-item"
          to="/popular"
          style={{ color: "red" }}
          onClick={() => this.closeMenu()}
        >
          Popular
        </Link>
        <Link
          id="upcoming"
          className="menu-item"
          to="/upcoming"
          style={{ color: "red" }}
          onClick={() => this.closeMenu()}
        >
          Upcoming
        </Link>
        <Link
          id="watchlist"
          className="menu-item"
          to="/watchlist"
          style={{ color: "red" }}
          onClick={() => this.closeMenu()}
        >
          Watchlist
        </Link>
      </BurgerMenu>
    );
  }
}
