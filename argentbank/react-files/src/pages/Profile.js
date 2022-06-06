import "../style/main.css";
import store from "../store";

function Profile() {
	console.log(store.getState());
	return <div>profil</div>;
}

export default Profile;
