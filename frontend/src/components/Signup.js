import { useState } from 'react';

const Signup = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = e.target;
        console.log(username.value, password.value);
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
            </form>
        </div>
    );
};

export default Signup;
