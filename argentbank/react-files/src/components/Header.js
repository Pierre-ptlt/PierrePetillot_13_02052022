import "../style/main.css";
import argentBankLogo from "../assets/images/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
	const [isLogged, setIsLogged] = useState(false);
	const handleClick = () => {
		console.log("click");
	};

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
				{isLogged ? (
					<button className="main-nav-item" onClick={handleClick}>
						<i className="fa fa-user-circle"></i> Sign out
					</button>
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
