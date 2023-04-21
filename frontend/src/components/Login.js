import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [currentField, setCurrentField] = useState("username");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3001/log/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("user", JSON.stringify(data));
			console.log("IS LOGGED IN");
			dispatch({ type: "LOGIN_USER", payload: data });
			navigate("/");
		} else {
			setPasswordError("Invalid username or password");
		}
	};

	const handleUsernameSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(
			`http://localhost:3001/users?username=${username}`
		);
		const data = await response.json();

		if (data.length > 0) {
			setCurrentField("password");
			setPasswordError("");
		} else {
			setUsernameError("Invalid username");
		}
	};

	const renderCurrentField = () => {
		switch (currentField) {
			case "username":
				return (
					<form className='login-form' onSubmit={handleUsernameSubmit}>
						<h1>Login</h1>
						<label>
							Username:
							<input
								type='text'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</label>
						{usernameError && <div className='error'>{usernameError}</div>}
						<br />
						<button type='submit'>Next</button>
						<Link to='/signup'> Inte medlem? Skapa konto.</Link>
					</form>
				);
			case "password":
				return (
					<form className='login-form' onSubmit={handleSubmit}>
						<h1>Login</h1>
						<label>
							Password:
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						{passwordError && <div className='error'>{passwordError}</div>}
						<br />
						<button type='submit'>Login</button>
						<Link to='/signup'> Inte medlem? Skapa konto.</Link>
					</form>
				);
			default:
				return null;
		}
	};

	return <div className='login-container'>{renderCurrentField()}</div>;
}
