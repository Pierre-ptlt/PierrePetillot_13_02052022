import "../style/main.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import store from "../store";
import { loginAction } from "../store";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Login() {
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("isLogged")) {
			navigate("/profile");
		}
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let response = await axios({
				method: "post",
				url: "/api/v1/user/login",
				withCredentials: true,
				data: {
					email: email,
					password: password,
				},
			});
			const token = response.data.body.token;
			localStorage.setItem("token", token);
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${response.data.token}`;

			let response2 = await axios({
				method: "post",
				url: "/api/v1/user/profile/",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch(
				loginAction(
					response2.data.body.id,
					response2.data.body.email,
					response2.data.body.firstName,
					response2.data.body.lastName,
					token
				)
			);
			localStorage.setItem("email", response2.data.body.email);
			localStorage.setItem("firstName", response2.data.body.firstName);
			localStorage.setItem("lastName", response2.data.body.lastName);
			localStorage.setItem("id", response2.data.body.id);
			localStorage.setItem("isLogged", true);
			console.log(store.getState());
			return navigate("/profile/");
		} catch (error) {
			setError(true);
			console.log(error);
		}
	};

	return (
		<div>
			<div className="main bg-dark login-dark">
				<div className="sign-in-content">
					<i className="fa fa-user-circle sign-in-icon"></i>
					<h1>Sign In</h1>
					<form>
						<div className="input-wrapper">
							<label htmlFor="username">Username</label>
							<input
								type="email"
								id="username"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="input-wrapper">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="input-remember">
							<input
								type="checkbox"
								id="remember-me"
								onInput={(e) => setRememberMe(e.target.checked)}
							/>
							<label htmlFor="remember-me">Remember me</label>
						</div>
						<button className="sign-in-button" onClick={handleSubmit}>
							Sign In
						</button>
						{error && (
							<p className="error">
								Identifiants incorrects, veuillez réessayer.
							</p>
						)}
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Login;
