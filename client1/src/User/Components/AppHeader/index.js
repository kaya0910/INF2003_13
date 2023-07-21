import React from "react";
import { Typography, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants";

const AppHeader = () => {
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      await axios.post(BASE_URL + "/signout");
      navigate("/signup");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="AppHeader">
      <Typography.Title>World's Happiness Index</Typography.Title>
      <Space>
        <Button type="primary" onClick={handleButtonClick}>
          Sign Out
        </Button>
      </Space>
    </div>
  );
};

export default AppHeader;
