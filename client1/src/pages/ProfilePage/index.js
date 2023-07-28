import React, { useContext, useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { userContext } from "../../Context/userContext";
import { BASE_URL } from "../../constants";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { userID } = useContext(userContext);

  axios.defaults.withCredentials = true;

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    console.log("user id is ", +userID);

    axios
      .post(BASE_URL + "/update/username", {
        username: newUsername,
        userID: userID,
      })
      .then((response) => {
        console.log("Username update successful:", response.data);
      })
      .catch((error) => {
        console.error("Username update failed:", error);
      });
  };

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    console.log("user id is ", userID);
    console.log("new password is", newPassword);
    axios
      .post(BASE_URL + "/update/password", {
        userID: userID,
        password: newPassword,
      })
      .then((response) => {
        console.log("Password update successful:", response.data);
      })
      .catch((error) => {
        console.error("Password update failed:", error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <form style={styles.form}>
          <label>Username:</label>
          <Input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <Button type="primary" onClick={() => handleUsernameChange(username)}>
            Change Username
          </Button>
        </form>

        <form style={styles.form}>
          <label>Password:</label>
          <Input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <Button type="primary" onClick={() => handlePasswordChange(password)}>
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "30vh",
  },
  heading: {
    marginBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "row",
  },
  form: {
    display: "flex",
    margin: "20px",
    flexDirection: "column",
    marginBottom: "20px",
    width: "300px",
    padding: "50px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  currentData: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default ProfilePage;
