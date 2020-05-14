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
    // window.scrollTo(0, 0)
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
        disableAutoFocus
      >
        <Link
          id="home"
          className="menu-item"
          to="/"
          style={{ color: "#2e2e2e", textDecoration: "none" }}
          onClick={() => this.closeMenu()}
        >
          <div className="menu-button">Top Rated</div>
        </Link>
        <div onClick={() => this.closeMenu()}>
          <Link
            id="now-playing"
            className="menu-item"
            to="/now_playing"
            style={{ color: "red", textDecoration: "none" }}
          >
            <div className="menu-button">Now playing</div>
          </Link>
        </div>
        <Link
          id="popular"
          className="menu-item"
          to="/popular"
          style={{ color: "red", textDecoration: "none" }}
          onClick={() => this.closeMenu()}
        >
          <div className="menu-button">Popular</div>
        </Link>
        <Link
          id="upcoming"
          className="menu-item"
          to="/upcoming"
          style={{ color: "red", textDecoration: "none" }}
          onClick={() => this.closeMenu()}
        >
          <div className="menu-button">Upcoming</div>
        </Link>
        <Link
          id="watchlist"
          className="menu-item"
          to="/watchlist"
          style={{ color: "red", textDecoration: "none" }}
          onClick={() => this.closeMenu()}
        >
          <div className="menu-button">Watchlist</div>
        </Link>
      </BurgerMenu>
    );
  }
}
