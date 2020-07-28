import React from 'react';
import HorizontalLine from "../movie_detail_page/FirstRow";
import "./UserProfilePage.css";
import {uuid} from "uuidv4";
import {Link} from "react-router-dom";
import {API_URL_PICTURE, IMAGE_SIZES} from "../../../Constants";


const UserProfilePage = () => {
  let womanPicture = "woman_profile.jpg";
  let manPicture = "man_profile.png";
  let adminPicture = "admin_profile.png";

  return (
      <div className={"media"}>
        <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
        </div>
        <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
          {/* The center container div. There is a grid in it. */}
          <div className="container-fluid" style={{padding: "0"}}>
            <HorizontalLine/>
            <div className="row no-gutters" style={{backgroundColor: "green"}}>
              <div className="picture-name-container">
                <div className="picture-container">
                  <div className="profile-picture">
                    <div className="profile-picture-frame">
                      <img className="picture" src={`/images/${adminPicture}`} alt="Profile"/>
                    </div>
                  </div>
                </div>
                <div className="details-container">
                  <div className="username-container">
                    <div className="username-container-div">
                      <h1 className="user-name-title">Username</h1>
                    </div>
                  </div>
                  {/*Empty div (currently a placeholder) for further user info, like: email, birthday, male, etc...*/}
                  <div className="user-details-container"/>
                </div>
              </div>
            </div>
            {/*Can remove or change color if it isn't fit into the look*/}
            <HorizontalLine/>
            <div className="row no-gutters" style={{padding: "0"}}>
              <div className="col-md-12 schedule-container-column">
                <div className="schedule-container">

                </div>
              </div>
            </div>
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

export default UserProfilePage;
