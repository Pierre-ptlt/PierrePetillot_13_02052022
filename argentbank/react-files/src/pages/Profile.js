import "../style/main.css";
import store from "../store";
import { useSelector } from "react-redux";

function Profile() {
	let content = localStorage.getItem("email");
	return <div>{content}</div>;
}

export default Profile;
