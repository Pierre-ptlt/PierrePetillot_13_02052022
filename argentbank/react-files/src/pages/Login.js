import "../style/main.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import store from "../store";
import { loginAction } from "../store";
import { useNavigate } from "react-router-dom";

function Login() {
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let response = await axios({
				method: "post",
				url: "/users/token/",
				withCredentials: true,
				data: {
					username: email,
					password: password,
				},
			});
			localStorage.setItem("token", response.data.access);
			localStorage.setItem("refresh", response.data.refresh);
			dispatch(
				loginAction(
					response.data.username,
					response.data.id,
					response.data.access,
					response.data.refresh
				)
			);
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${response.data.access}`;

			let response2 = await axios({
				method: "get",
				url: "/users/me/",
				// headers: {
				// 	Authorization: `Bearer ${localStorage.getItem("token")}`,
				// },
			});

			dispatch(
				loginAction(
					email,
					response2.data.id,
					response.data.access,
					response.data.refresh
				)
			);
			console.log(store.getState());
			return navigate("/explorer/");
		} catch (error) {
			setError(true);
			console.log(error);
		}
	};

	return (
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
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button className="sign-in-button">Sign In</button>
					{error && (
						<p className="error">
							Identifiants incorrects, veuillez réessayer.
						</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default Login;
