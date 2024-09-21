import React from "react";
import { useNavigate } from "react-router-dom";

const UsersList = ({ users }) => {
  const navigate = useNavigate();

  const handleUserClick = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.profilePicture && (
              <img src={user.profilePicture} alt="Profile" width="50" />
            )}
           <span>{user.name} - {user.email}</span> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
