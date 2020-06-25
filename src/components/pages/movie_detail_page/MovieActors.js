import React from 'react';
import {API_URL_PICTURE, IMAGE_SIZES} from "../../../Constants";
import {limitNameString} from "../../../Utils";

const MovieActors = (props) => {

    let imageSource = "/images/emptyProfilePicture.jpg";

    return (
        props.actors.map(actor =>
            (<div style={actorCard}>
                <div style={actorName}> {limitNameString(actor.name, 35)} </div>
                <div style={actorCharacter}> {limitNameString(actor["character"], 15)} </div>
                <div style={imageContainer}>
                    {actor["profile_path"] === null ?
                        <img src={imageSource} alt="" style={image}/>
                        :
                        <img src={`${API_URL_PICTURE}${IMAGE_SIZES.poster_sizes[0]}${actor["profile_path"]}`} alt=""
                             style={image}/>}
                </div>
            </div>)
        )
    );
}

const actorCard = {
    background: "linear-gradient(0deg, #e6b31e 78%, #2e2e2e 22%)",
    width: "15%",
    height: "33%",
    // minHeight: "285px",
    display: "block",
    margin: "2%",
    border: "5px #2e2e2e solid",
    borderRadius: "3px",
    textAlign: "-webkit-center",
    textJustify: "auto",
    color: "white"
}

const actorName = {
    height: "22%",
    maxHeight: "260px",
    margin: "3%",
    fontSize: "1vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
}

const actorCharacter = {
    height: "10%",
    fontSize: "0.7vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
}

const imageContainer = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
}

const image = {
    width: "80%"
}

export default MovieActors;