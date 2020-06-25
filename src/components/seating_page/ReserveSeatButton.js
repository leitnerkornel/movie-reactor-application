import React, {useContext, useEffect, useState} from "react";
import "./ReserveSeatButton.css";
import axios from "axios";

const ReserveSeatButton = (props) => {
    let freeSeatClass = "fa-square-o";
    let occupiedSeatClass = "fa-square";
    let ownReservedSeatClass = "fa-plus-square";
    let reactorYellow = "#e6b31e";
    let id = props.showId;
    let [modalMessage, setModalMessage] = useState("");
    let successfulPurchaseMessage = `Thank you for reserving seats for '${props.movieTitle}'! 
                                    Your reservation was successful.`;
    let failedPurchaseMessage = `Sorry, we can't fulfill your reservation for '${props.movieTitle}' at the moment.`;

    function reserveSeat(event) {
        let reservedSeats = document.getElementsByClassName(`theater-seat fa ${ownReservedSeatClass}`);
        let seats = [];
        for (let i = 0; i < reservedSeats.length; i++) {
            seats.push(parseInt(reservedSeats.item(i).dataset.id))
        }

        axios.post(`http://localhost:8080/reservation/seats`,
            {id: parseInt(id), seats: seats},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                setModalMessage(response.data ? successfulPurchaseMessage : failedPurchaseMessage)
                let seatToModify = document.getElementsByClassName(`theater-seat fa ${ownReservedSeatClass}`);

                for (let i = seatToModify.length-1; i > -1; i--) {
                    let seat = reservedSeats.item(i);
                    seat.classList.remove(ownReservedSeatClass);
                    seat.classList.add(occupiedSeatClass);
                    seat.style.color = reactorYellow;
                    seat.style.opacity = "0.5";
                }
            });
    }

    return (
        <>
            <div className="modal fade" id="reservationModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {`Reservation for ${props.movieTitle}`}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {modalMessage}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="reserve-button" onClick={reserveSeat} data-toggle="modal" data-target="#reservationModal">
                <div className="hazy">Reserve selected</div>
            </div>
        </>
    )
}

export default ReserveSeatButton;
