import React from "react";
import { Typography, Space, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("signup");
  };

  return (
    <div className="AppHeader">
      <Typography.Title>World's Happiness Index</Typography.Title>
      {/* <Image
        src="client1/src/assets/happy_hub.jpg"
        alt="Happy Hub"
        width={100}
      /> */}
      <Space>
        <Button type="primary" onClick={handleButtonClick}>
          Sign In
        </Button>
      </Space>
    </div>
  );
};

export default AppHeader;
