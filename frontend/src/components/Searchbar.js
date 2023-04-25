import { useState } from 'react';


export const Searchbar = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);



    const handleSubmit = async (event) => {
        event.preventDefault();
        const searchQuery = event.target.elements.searchbar.value;
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        const matchingUsers = data.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUsers(matchingUsers);
        console.log(data)
    };

    return (
        <form id='submit' onSubmit={handleSubmit}>
            <input type="text" placeholder="Sök på twitter" name="searchbar" />
            <button type="submit">Sök</button>
            <div id="tabs">
                <p className='trending'>För dig</p>
                <p className='trending'>Trendar</p>
            </div>
            {/* {users.length > 0 && (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            )} */}
            {users.map((user) => (
                <li key={user.id}>
                    <a href={`/users/${user.id}`} onClick={() => setSelectedUser(user)}>
                        {user.username}
                    </a>
                </li>
            ))}

        </form>
    );
};

