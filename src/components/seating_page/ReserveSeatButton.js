import React from "react";
import "./ReserveSeatButton.css";
import axios from "axios";

const ReserveSeatButton = (props) => {
    let freeSeatClass = "fa fa-square-o";
    let occupiedSeatClass = "fa fa-square";
    let ownReserveSeatClass = "fa fa-plus-square";
    let id = props.showId;

    function reserveSeat(event) {
        let reservedSeats = document.getElementsByClassName("theater-seat fa fa-plus-square");
        let seats = [];
        for (let i = 0; i < reservedSeats.length; i++) {
            seats.push(parseInt(reservedSeats.item(i).dataset.id))
        }

        axios.post(`http://localhost:8080/reservation/seats`,
            {id: parseInt(id), seats: seats},
            {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
            )
            // TODO: add popup modal and reload page
            .then((response) => console.log(response.data));
    }

    return (
        <div className="reserve-button" onClick={reserveSeat}>
            <div className="hazy">Reserve selected</div>
        </div>
    )
}

export default ReserveSeatButton;
