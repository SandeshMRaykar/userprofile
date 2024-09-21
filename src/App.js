import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const usersWithPics = data.map((user) => ({
          ...user,
          profilePicture: null, 
        }));

        setUsers(usersWithPics);
      });
  }, []);

  const handleSaveUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map(
        (user) => (user.id === updatedUser.id ? updatedUser : user) 
      )
    );
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UsersList users={users} />} />
          <Route
            path="/edit-user/:id"
            element={<UserForm users={users} onSaveUser={handleSaveUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
