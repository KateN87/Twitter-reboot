import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditProfile = ({ setEditMode }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const checkToken = JSON.parse(localStorage.getItem('user'));
    const user = useSelector((state) => state.userReducer);

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
                    Authorization: `Bearer ${checkToken}`,
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
                <h1>Edit your profile</h1>

                <div className='selection'>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' name='email' defaultValue={user.email} />
                </div>
                <div className='selection'>
                    <label htmlFor='nickname'>Nickname:</label>
                    <input
                        type='text'
                        name='nickname'
                        defaultValue={user.nickname}
                    />
                </div>
                <div className='selection'>
                    <label htmlFor='about'>About:</label>
                    <input type='text' name='about' defaultValue={user.about} />
                </div>
                <div className='selection'>
                    <label htmlFor='occupation'>Occupation:</label>
                    <input
                        type='text'
                        name='occupation'
                        defaultValue={user.occupation}
                    />
                </div>
                <div className='selection'>
                    <label htmlFor='hometown'>Hometown:</label>
                    <input
                        type='text'
                        name='hometown'
                        defaultValue={user.hometown}
                    />
                </div>
                <div className='selection'>
                    <label htmlFor='website'>Website:</label>
                    <input
                        type='text'
                        name='website'
                        defaultValue={user.website}
                    />
                </div>
                <button type='submit'>Save Edit</button>
                <button id='cancel' onClick={() => setEditMode(false)}>
                    Cancel
                </button>
                {/* Om error INTE är null visas denna*/}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default EditProfile;
