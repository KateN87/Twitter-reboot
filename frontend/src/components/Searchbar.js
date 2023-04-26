import { useState } from 'react';
import ProfileInformation from './ProfileInformation';

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
    };

    const handleUserClick = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        const data = await response.json();
        setSelectedUser(data);
    };


    return (
        <div>
            <form id='submit' onSubmit={handleSubmit}>
                <input type="text" placeholder="Sök på twitter" name="searchbar" />
                <button type="submit">Sök</button>
                <div id="tabs">
                    <p className='trending'>För dig</p>
                    <p className='trending'>Trendar</p>
                </div>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <a href="#" onClick={() => handleUserClick(user.id)}>{user.username}</a>
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <ProfileInformation user={selectedUser} />
            )}
        </div>
    );
};






















// import { useState } from 'react';
// import ProfileInformation from './ProfileInformation';


//     export const Searchbar = () => {
//         const [users, setUsers] = useState([]);
//         const [selectedUser, setSelectedUser] = useState(null);



//         const handleSubmit = async (event) => {
//             event.preventDefault();
//             const searchQuery = event.target.elements.searchbar.value;
//             const response = await fetch('http://localhost:3001/users');
//             const data = await response.json();
//             const matchingUsers = data.filter((user) =>
//                 user.username.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setUsers(matchingUsers);
//             console.log(data)
//         };

//     return (
//         <form id='submit' onSubmit={handleSubmit}>
//             <input type="text" placeholder="Sök på twitter" name="searchbar" />
//             <button type="submit">Sök</button>
//             <div id="tabs">
//                 <p className='trending'>För dig</p>
//                 <p className='trending'>Trendar</p>
//             </div>
//             {users.length > 0 && (
//                 <ul>
//                     {users.map((user) => (
//                         <li key={user.id}>{user.username}</li>
//                     ))}
//                 </ul>
//             )}
//             <div>
//                 {selectedUser ? (
//                     <ProfileInformation selectedUser={selectedUser} />
//                 ) : (
//                     <form id='submit' onSubmit={handleSubmit}>
//                         {/* your existing code */}
//                     </form>
//                 )}
//             </div>
           
            
//             {users.map((user) => (
//                 <li key={user.id}>
//                     <a href={`/users/${user.id}`} onClick={() => setSelectedUser(user)}>
//                         {user.username}
//                     </a>
//                 </li>
//             ))}

//         </form>
//     );
// };

