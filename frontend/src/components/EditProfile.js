import { useState } from 'react';
import { useDispatch } from 'react-redux';

const EditProfile = ({ setEditMode }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const checkUser = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const { email, nickname, about, occupation, hometown, website } =
            e.target;
        const editedUser = {
            email: email.value,
            nickname: nickname.value,
            about: about.value,
            occupation: occupation.value,
            hometown: hometown.value,
            website: website.value,
        };

        //Adding info from form
        const response = await fetch(
            'http://localhost:3001/locked/editprofile',
            {
                method: 'PATCH',
                body: JSON.stringify(editedUser),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${checkUser.token}`,
                },
            }
        );

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            //Login user to reducer-state
            dispatch({ type: 'LOGIN_USER', payload: json });
            setEditMode(false);
        }
    };

    return (
        <div className='login-container signup-container'>
            {/*added enctype to send form with both text and file */}
            <form
                className='login-form'
                onSubmit={handleSubmit}
                encType='multipart/form'
            >
                <h1>Edit your info</h1>

                <br />
                <label htmlFor='email'>Email:</label>
                <input
                    type='text'
                    name='email'
                    defaultValue={checkUser.email}
                />

                <br />
                <label htmlFor='nickname'>Nickname:</label>
                <input
                    type='text'
                    name='nickname'
                    defaultValue={checkUser.nickname}
                />

                <br />
                <label htmlFor='about'>About:</label>
                <input
                    type='text'
                    name='about'
                    defaultValue={checkUser.about}
                />

                <br />
                <label htmlFor='occupation'>Occupation:</label>
                <input
                    type='text'
                    name='occupation'
                    defaultValue={checkUser.occupation}
                />

                <br />
                <label htmlFor='hometown'>Hometown:</label>
                <input
                    type='text'
                    name='hometown'
                    defaultValue={checkUser.hometown}
                />

                <br />
                <label htmlFor='website'>Website:</label>
                <input
                    type='text'
                    name='website'
                    defaultValue={checkUser.website}
                />
                <br />

                <button type='submit'>Save Edit</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
                {/* Om error INTE är null visas denna*/}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default EditProfile;
