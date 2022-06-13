import store from "../store";
import { logoutAction } from "../store";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";

function Logout() {
	const dispatch = useDispatch();
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutAction());
		localStorage.clear();
		window.location.href = "/";
		console.log(store.getState());
	};

	return (
		<div className="logout-wrapper">
			<div className="logout-pack">
				<FiLogOut className="logout-icon" />
				<button className="logout-button" onClick={handleLogout}>
					Sign out
				</button>
			</div>
		</div>
	);
}

export default Logout;
