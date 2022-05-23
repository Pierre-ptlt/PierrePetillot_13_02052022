import "./style/App.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
