import { useState } from 'react';

//TODO
//1. Logga in användaren efter ok response

const Signup = () => {
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const username = `@${e.target.username.value}`;
        const password = e.target.password.value;

        const response = await fetch('http://localhost:3001/log/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
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
                <button type='submit'>Sign up</button>
                {/* Om error INTE är null visas denna*/}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default Signup;
