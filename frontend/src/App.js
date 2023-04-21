import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

import Login from "./components/Login";
import Signup from "./components/Signup";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	console.log("This is user", user);
	useEffect(() => {
		const checkUser = JSON.parse(localStorage.getItem("user"));
		console.log("This is checkUser", checkUser);
		if (checkUser) {
			const checkJwt = async () => {
				const response = await fetch("http://localhost:3001/locked/test", {
					headers: {
						Authorization: `Bearer ${checkUser.token}`,
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					const loggedUser = await response.json();

					dispatch({ type: "LOGIN_USER", payload: loggedUser });
				}
			};
			checkJwt();
		}
	}, []);

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
