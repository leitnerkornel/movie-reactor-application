import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const checkResponse = (response) => {
        if (response.data.correct) {
            localStorage.setItem("token", response.data.token)
            redirect();
        } else {
            setMessage(response.data.msg);
        }
    };

    const redirect = () => {
        history.push("/auth/login");
    };

    const sendRequest = (event) => {
        event.preventDefault();
        let params = {"username": username, "password": password, "firstname": firstname, "lastname": lastname, "email": email, "gender":gender};
        axios.post("http://localhost:8080/auth/register", params).then(response => checkResponse(response))
    };

    return (
        <div style={login}>
            <form style={form} onSubmit={sendRequest}>
                    <input style={input} type="text" placeholder="firstname" onChange={event => setFirstname(event.target.value)} required/>
                    <input style={input} type="text" placeholder="lastname" onChange={event => setLastname(event.target.value)} required/>
                    <input style={input} type="text" placeholder="gender" onChange={event => setGender(event.target.value)} required/>
                    <input style={input} type="text" placeholder="email" onChange={event => setEmail(event.target.value)} required/>
                    <input style={input} type="text" placeholder="username" onChange={event => setUsername(event.target.value)} required/>
                    <input style={input} type="password" placeholder="password" onChange={event => setPassword(event.target.value)} required/>
                    <input type="submit" value="Register" style={button}/>
                { (message !== "") ?
                    <div className="errorMessage" style={{messageStyle}}>{message}</div> : <div className="errorMessage" style={{messageStyle}}> </div>}
            </form>
        </div>
    )

}

const login = {
    width: "460px",
    padding: "8% 0 0",
    margin: "auto"
}

const form = {
    position: "relative",
    zIndex: "1",
    background: "#2e2e2e",
    maxWidth: "360px",
    margin: "0 auto 100px",
    padding: "45px",
    textAlign: "center",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
}

const messageStyle = {
    color: "white",
    fontFamily: "\"Roboto\", sans-serif"
}

const input = {
    fontFamily: "\"Roboto\", sans-serif",
    outline: "0",
    background: "lightgrey",
    width: "100%",
    border: "0",
    margin: "0 0 15px",
    padding: "15px",
    boxSizing: "border-box",
    fontSize: "14px",
}

const button = {
    fontFamily: "\"Roboto\", sans-serif",
    textTransform: "uppercase",
    outline: "0",
    background: "#e6b31e",
    width: "100%",
    border: "0",
    padding: "15px",
    color: "#3d3c37",
    fontSize: "14px",
    cursor: "pointer"
}

export default RegisterPage;