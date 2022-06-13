import "../style/main.css";
import store, { updateAction } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	let newFirstName = "";
	let newLastName = "";
	const [stateFirstName, setFirstName] = useState(
		useSelector((state) => state.firstName)
	);
	const [stateLastName, setLasttName] = useState(
		useSelector((state) => state.lastName)
	);

	useEffect(() => {
		axios({
			method: "POST",
			url: "/api/v1/user/profile/",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				console.log(response);
				setFirstName(response.data.body.firstName);
				setLasttName(response.data.body.lastName);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [stateFirstName, stateLastName]);

	const handleEdit = (e) => {
		e.preventDefault();
		axios
			.put(
				"/api/v1/user/profile/",
				{
					firstName: newFirstName,
					lastName: newLastName,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			.then((response) => {
				dispatch(
					updateAction(
						response.data.body.id,
						response.data.body.email,
						newFirstName,
						newLastName,
						localStorage.getItem("token")
					)
				);
				localStorage.setItem("firstName", newFirstName);
				localStorage.setItem("lastName", newLastName);
				console.log(response, store.getState());
				setFirstName(newFirstName);
				setLasttName(newLastName);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{stateFirstName} {stateLastName}
					<span className="account-name"></span>
				</h1>
				<button className="edit-button" onClick={() => setEdit(true)}>
					Edit Name
				</button>
				{edit && (
					<form className="editName-form" onSubmit={handleEdit}>
						<div className="editName-wrapper">
							<input
								type="text"
								className="editName-input"
								placeholder="First name"
								required
								onInput={(e) => {
									newFirstName = e.target.value;
								}}
							></input>
							<input
								type="text"
								className="editName-input"
								placeholder="Last name"
								required
								onInput={(e) => {
									newLastName = e.target.value;
								}}
							></input>
						</div>
						<div className="editName-wrapper">
							<button className="editName-button" type="submit">
								save
							</button>
							<button
								className="editName-button"
								onClick={() => setEdit(false)}
							>
								cancel
							</button>
						</div>
					</form>
				)}
			</div>
			<h2 className="sr-only">Accounts</h2>
			<div>
				<div className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Checking (x8349)</h3>
						<p className="account-amount">$2,082.79</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</div>
				<div className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Savings (x6712)</h3>
						<p className="account-amount">$10,928.42</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</div>
				<div className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
						<p className="account-amount">$184.30</p>
						<p className="account-amount-description">Current Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
