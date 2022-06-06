import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
	return localStorage.getItem("token")
		? children
		: (localStorage.clear(), (<Navigate to="/login" />));
};

export default Protected;
