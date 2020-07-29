import {useHistory} from "react-router-dom";

 const LogOut = () => {

    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        redirect();
    };

    const redirect = () => {
        history.push("/");
    };

    return (<React.Fragment>{logout()}</React.Fragment>);

}

export default LogOut;