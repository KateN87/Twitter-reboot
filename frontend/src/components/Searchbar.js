
import { useState } from "react";
import "../style/searchbar";

import { Link, Navigate, useNavigate } from "react-router-dom";

export const Searchbar = (setId, id) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const searchQuery = event.target.elements.searchbar.value;
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        const matchingUsers = data.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matchingUsers.length === 0) {
            setErrorMessage(`No user found with the name ${searchQuery}`);
            setUsers([]);
            setSelectedUser(null);
        } else {
            setUsers(matchingUsers);
            setSelectedUser(null);
            setErrorMessage(null);
        }

        console.log(matchingUsers);
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const isSearchDisabled = searchQuery.trim().length === 0;

    return (
        <div>
            <form id="submit" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Sök på twitter"
                    name="searchbar"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit" disabled={isSearchDisabled}>
                    Sök
                </button>
            </form>
            <ul>
                {users.map((user) => (
                    <div key={user.id}>
                        <p>
                            <Link className="link" to={`/profile/${user.id}`}>
                                {user.username}
                            </Link>
                        </p>
                    </div>
                ))}
            </ul>
            {errorMessage && <p>{errorMessage}</p>}

        </div>
    );
};



