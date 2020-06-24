import React from 'react';
import {API_URL_PICTURE, IMAGE_SIZES} from "../../../Constants";

const MovieActors = (props) => {

    let imageSource = "/images/emptyProfile.jpeg";

    console.log(props.actors);
    return(
        props.actors.map(actor =>
            (<div style={actorCard}>
                <div style={actorName}> {actor.name} </div>
                <div style={actorCharacter}> {actor["character"]} </div>
                <div style={imageContainer}>
                    {actor["profile_path"] === null ?
                <img src={imageSource} alt="" style={emptyProfileImage} />
                :
                <img src={`${API_URL_PICTURE}${IMAGE_SIZES.poster_sizes[0]}${actor["profile_path"]}`} alt="" style={profileImage}/> }
                </div>
            </div>)
        )
    );
}

const actorName = {
    height: "20%",
    fontSize: "100%"
}

const actorCharacter = {
    height: "10%",
    fontSize: "80%"
}

const emptyProfileImage = {
    padding:"1%",
    maxWidth: "60%",
    maxHeight: "80%"
}

const profileImage = {
    padding:"1%",
    maxWidth: "60%",
    maxHeight: "80%"
}

const imageContainer = {
    margin: "auto",
    justifyContent: "space-between"
}

const actorCard = {
    background: "linear-gradient(0deg, #e6b31e 80%, #2e2e2e 20%)",
    width: "15%",
    minHeight: "180px",
    display: "block",
    margin: "2%",
    border: "5px #2e2e2e solid",
    borderRadius: "3px",
    textAlign: "-webkit-center",
    textJustify: "auto",
    color: "white"
}

export default MovieActors;