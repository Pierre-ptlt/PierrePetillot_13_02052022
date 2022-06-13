import store from "../store";
import { logoutAction } from "../store";
import { useDispatch } from "react-redux";

function Logout() {
	const dispatch = useDispatch();
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutAction());
		localStorage.clear();
		window.location.href = "/";
		console.log(store.getState());
	};

	return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
