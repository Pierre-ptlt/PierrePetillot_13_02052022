import { configureStore } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	email: null,
	firstName: null,
	lastName: null,
	isLoggedIn: false,
	token: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
				id: action.payload.id,
				email: action.payload.email,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				token: action.payload.token,
			};
		case "LOGOUT":
			return initialState;
		case "UPDATE":
			return {
				...state,
				isLoggedIn: true,
				id: action.payload.id,
				email: action.payload.email,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				token: action.payload.token,
			};
		default:
			return state;
	}
};

export const loginAction = (id, email, firstName, lastName, token) => ({
	type: "LOGIN",
	payload: {
		id,
		email,
		firstName,
		lastName,
		token,
	},
});

export const updateAction = (id, email, firstName, lastName, token) => ({
	type: "UPDATE",
	payload: {
		id,
		email,
		firstName,
		lastName,
		token,
	},
});

export const logoutAction = () => ({
	type: "LOGOUT",
});

export default configureStore({ reducer });
