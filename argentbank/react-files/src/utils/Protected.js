import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
	return localStorage.getItem("isLogged")
		? children
		: (localStorage.clear(), (<Navigate to="/login" />));
};

export default Protected;
