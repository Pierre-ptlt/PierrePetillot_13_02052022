import "../style/main.css";
import argentBankLogo from "../assets/images/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";

function Header() {
	const isLogged = useSelector((state) => state.isLoggedIn);
	const isLogged2 = localStorage.getItem("isLogged");
	const name = useSelector((state) => state.firstName);
	const name2 = localStorage.getItem("firstName");

	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="./">
				<img
					className="main-nav-logo-image"
					src={argentBankLogo}
					alt="Argent Bank Logo"
				/>
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div>
				{isLogged || isLogged2 ? (
					<div className="logged-wrapper">
						<Link to="/profile" className="profile-link">
							<i className="fa fa-user-circle"></i>
							{name ? name : name2}
						</Link>
						<Logout />
					</div>
				) : (
					<Link className="main-nav-item" to="/login">
						<i className="fa fa-user-circle"></i>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Header;
