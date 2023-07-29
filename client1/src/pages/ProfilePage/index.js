import React, { useContext, useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";
import { userContext } from "../../Context/userContext";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { userID } = useContext(userContext);
  const [isModalVisible, setIsModalVisible] = useState(false); // For the delete confirmation modal

  const navigate = useNavigate();

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

  // Function to handle user deletion
  const handleDeleteUser = () => {
    axios
      .delete(BASE_URL + "/delete/user", {
        data: {
          userID: userID,
        },
      })
      .then((response) => {
        console.log("User deletion successful:", response.data);
        // Perform any additional actions after user deletion if needed
        // For example, you may want to redirect the user to a different page
      })
      .catch((error) => {
        console.error("User deletion failed:", error);
        // Handle error scenario if needed
      });
    navigate("/signin");
  };

  // Function to show the delete confirmation modal
  const showDeleteConfirmationModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle cancel of the delete confirmation modal
  const handleCancelDeleteModal = () => {
    setIsModalVisible(false);
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

        {/* Add the Delete button */}
        <Button type="danger" onClick={showDeleteConfirmationModal}>
          Delete User
        </Button>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleCancelDeleteModal}
      >
        <p>Are you sure you want to delete your user account?</p>
        <p>This action cannot be undone.</p>
      </Modal>
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
