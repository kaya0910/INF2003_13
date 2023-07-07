import React, { useState } from "react";
import "./index.css";
import { Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !name || !password) {
      return alert("Plesase fill up info");
    }

    console.log("Username:", username);
    console.log("Name:", name);
    console.log("Password:", password);

    const credentialData = {
      username,
      name,
      password,
    };

    axios
      .post(BASE_URL + "/signup", credentialData)
      .then((res) => {
        console.log("Data updated successfully:", res.data);
        navigate("/user/dashboard");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default Register;
