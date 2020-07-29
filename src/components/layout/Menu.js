import React, {Component} from "react";
import {pushRotate as BurgerMenu} from "react-burger-menu";
import {Link} from "react-router-dom";
import Collapsible from 'react-collapsible';

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
        this.setState({menuOpen: state.isOpen});
    }

    closeMenu() {
        this.setState({menuOpen: false});
    }

    toggleMenu() {
        this.setState((state) => ({menuOpen: !state.menuOpen}));
    }

    render() {
        return (
            <BurgerMenu
                pageWrapId={"page-wrap"}
                outerContainerId={"outer-container"}
                customBurgerIcon={
                    <img
                        src={window.location.origin + "/reactor-logo.svg"}
                        style={{zIndex: "1"}}
                        alt="Menu logo"/>
                }
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
                disableAutoFocus
                // style={{top: 100 + (window.innerHeight / 1000) * window.pageYOffset}} // TODO: try to move menu position
                // style={{marginTop: 100 + window.pageYOffset}}
            >
                {localStorage.getItem("user") ? // TODO: check item name!
                    (<Collapsible trigger={`WELCOME ${localStorage.getItem("user-name")}`}
                                  className="menu-collapsible"
                                  openedClassName="menu-collapsible-open"
                                  overflowWhenOpen="initial"
                    >
                        <Link
                            id="reservations"
                            key="reservations"
                            className="menu-item"
                            to="/reservation" // TODO: check endpoint!
                            style={{color: "red", textDecoration: "none"}}
                            onClick={() => this.closeMenu()}
                        >
                            <div className="menu-button">Reservations</div>
                        </Link>
                        <Link
                            id="watchlist"
                            key="watchlist"
                            className="menu-item"
                            to="/watchlist"
                            style={{color: "red", textDecoration: "none"}}
                            onClick={() => this.closeMenu()}
                        >
                            <div className="menu-button">Watchlist</div>
                        </Link>
                        <Link
                            id="logout"
                            key="logout"
                            className="menu-item"
                            to="/logout"
                            style={{color: "red", textDecoration: "none"}}
                            onClick={() => this.closeMenu()}
                        >
                            <div className="menu-button">Watchlist</div>
                        </Link>
                    </Collapsible>)
                    :
                    (<Collapsible
                        trigger="ACCOUNT"

                        className="menu-collapsible"
                        openedClassName="menu-collapsible-open"
                        overflowWhenOpen="initial"
                    >
                        <Link
                            id="login"
                            key="register"
                            className="menu-item"
                            to="/auth/login"
                            style={{color: "red", textDecoration: "none"}}
                            onClick={() => this.closeMenu()}
                        >
                            <div className="menu-button">Login</div>
                        </Link>
                        <Link
                            id="register"
                            key="register"
                            className="menu-item"
                            to="/auth/register"
                            style={{color: "red", textDecoration: "none"}}
                            onClick={() => this.closeMenu()}
                        >
                            <div className="menu-button">Register</div>
                        </Link>
                    </Collapsible>)
                }
                <Collapsible trigger="RECOMMENDED MOVIES"
                             className="menu-collapsible"
                             openedClassName="menu-collapsible-open"
                             overflowWhenOpen="initial"
                >
                    <Link
                        id="home"
                        className="menu-item"
                        to="/"
                        style={{color: "#2e2e2e", textDecoration: "none"}}
                        onClick={() => this.closeMenu()}
                    >
                        <div className="menu-button">Top Rated</div>
                    </Link>
                    <div onClick={() => this.closeMenu()}>
                        <Link
                            id="now-playing"
                            className="menu-item"
                            to="/now_playing"
                            style={{color: "red", textDecoration: "none"}}
                        >
                            <div className="menu-button">Now playing</div>
                        </Link>
                    </div>
                    <Link
                        id="popular"
                        className="menu-item"
                        to="/popular"
                        style={{color: "red", textDecoration: "none"}}
                        onClick={() => this.closeMenu()}
                    >
                        <div className="menu-button">Popular</div>
                    </Link>
                    <Link
                        id="upcoming"
                        className="menu-item"
                        to="/upcoming"
                        style={{color: "red", textDecoration: "none"}}
                        onClick={() => this.closeMenu()}
                    >
                        <div className="menu-button">Upcoming</div>
                    </Link>
                </Collapsible>
                <Collapsible trigger="THEATER"
                             className="menu-collapsible"
                             openedClassName="menu-collapsible-open"
                             overflowWhenOpen="initial"
                >
                    <Link
                        id="cinema"
                        className="menu-item"
                        to="/schedule"
                        style={{color: "red", textDecoration: "none"}}
                        onClick={() => this.closeMenu()}
                    >
                        <div className="menu-button">Cinema</div>
                    </Link>
                </Collapsible>
            </BurgerMenu>
        );
    }
}
