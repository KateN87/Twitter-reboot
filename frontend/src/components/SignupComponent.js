import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SignupComponent = () => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (form, e) => {
		setError(null);

		//Adding info from form
		const formData = new FormData();
		formData.append("username", form.username.value);
		formData.append("password", form.password.value);
		formData.append("verifyPass", form.verifyPass.value);
		formData.append("email", form.email.value);
		formData.append("nickname", form.nickname.value);
		formData.append("about", form.about.value);
		formData.append("occupation", form.occupation.value);
		formData.append("hometown", form.hometown.value);
		formData.append("website", form.website.value);
		formData.append("image", form.image.files[0]);

		const response = await fetch("http://localhost:3001/log/signup", {
			method: "POST",
			body: formData,
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			//Needed return false, since preventDefault doesnt seem to be working with enctype
			return false;
		} else {
			//Adds user with token to localstorage
			localStorage.setItem("user", JSON.stringify(json));
			//Login user to reducer-state
			dispatch({ type: "LOGIN_USER", payload: json });
			navigate("/");
			form.reset();
		}
	};

	return (
		<div className='login-container signup-container'>
			{/*added enctype to send form with both text and file */}
			<form
				className='login-form'
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(e.target, e);
				}}
				encType='multipart/form'
			>
				<h1>Sign up</h1>
				<label htmlFor='username'>Username:</label>
				<input type='text' name='username' />

				<br />
				<label htmlFor='password'>Password:</label>
				<input type='password' name='password' />

				<br />

				<label htmlFor='verifyPass'>Verify password:</label>
				<input type='password' name='verifyPass' />

				<br />
				<label htmlFor='email'>Email:</label>
				<input type='text' name='email' />

				<br />
				<label htmlFor='nickname'>Nickname:</label>
				<input type='text' name='nickname' />

				<br />
				<label htmlFor='about'>About:</label>
				<input type='text' name='about' />

				<br />
				<label htmlFor='occupation'>Occupation:</label>
				<input type='text' name='occupation' />

				<br />
				<label htmlFor='hometown'>Hometown:</label>
				<input type='text' name='hometown' />

				<br />
				<label htmlFor='website'>Website:</label>
				<input type='text' name='website' />
				<br />
				<label htmlFor='image'>Image:</label>
				<input type='file' id='image' name='image' />

				<br />
				<button type='submit'>Sign up</button>
				<Link to='/login'> Redan medlem? Logga in här. </Link>

				{/* Om error INTE är null visas denna*/}
				{error && <div className='error'>{error}</div>}
			</form>
		</div>
	);
};

export default SignupComponent;
