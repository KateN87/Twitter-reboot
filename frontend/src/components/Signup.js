import { useState } from 'react';
import { useDispatch } from 'react-redux';

//TODO
//1. Logga in användaren efter ok response

const Signup = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const {
            username,
            password,
            verifyPass,
            email,
            nickname,
            about,
            occupation,
            hometown,
            website,
        } = e.target;
        const newUser = {
            username: `@${username.value}`,
            password: password.value,
            verifyPass: verifyPass.value,
            email: email.value,
            nickname: nickname.value,
            about: about.value,
            occupation: occupation.value,
            hometown: hometown.value,
            website: website.value,
        };

        const response = await fetch('http://localhost:3001/log/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });

        const json = await response.json();

        if (!response.ok) {
            //sätter error till felmeddelandet från backend
            setError(json.error);
        }
        if (response.ok) {
            //Sätter localstorage, innehåller username och token
            localStorage.setItem('user', JSON.stringify(json));

            //Logga in användaren
            dispatch({ type: 'LOGIN_USER', payload: json });

            //nollställer formuläret
            e.target.reset();
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' />

                <br />
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' />

                <br />

                <label htmlFor='verifyPass'>Verify password:</label>
                <input type='password' id='verifyPass' />

                <br />
                <label htmlFor='email'>Email:</label>
                <input type='text' id='email' />

                <br />
                <label htmlFor='nickname'>Nickname:</label>
                <input type='text' id='nickname' />

                <br />
                <label htmlFor='about'>About:</label>
                <input type='text' id='about' />

                <br />
                <label htmlFor='occupation'>Occupation:</label>
                <input type='text' id='occupation' />

                <br />
                <label htmlFor='hometown'>Hometown:</label>
                <input type='text' id='hometown' />

                <br />
                <label htmlFor='website'>Website:</label>
                <input type='text' id='website' />

                <br />
                <button type='submit'>Sign up</button>

                {/* Om error INTE är null visas denna*/}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default Signup;
