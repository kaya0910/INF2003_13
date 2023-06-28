import React from "react";
import { Typography, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("signup");
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
