import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../constants";

const EditUser = () => {
  let { id } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const formData = {
      username: username,
      password: password,
    };

    axios
      .put(BASE_URL + "/users/" + id, formData)
      .then((res) => {
        console.log("Data updated successfully:", res.data);
        // Reset the form after submission
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    alert("Data is updated succcessfully!");

    navigate("/admin");
  };

  return (
    <div className="edit-page-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">New Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
