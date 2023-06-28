import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log("Username:", username);
    console.log("Password:", password);

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const credentialData = {
      username,
      password,
    };

    axios
      .post(BASE_URL + "/login", credentialData)
      .then((res) => {
        console.log("Data updated successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Incorrect username or password");
      });

    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Sign In</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
