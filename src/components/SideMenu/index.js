import { Menu } from "antd";
import React from "react";
import {
  AppstoreAddOutlined,
  ContainerOutlined,
  FundProjectionScreenOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {
          // item.key
          navigate(item.key);
        }}
        items={[
          {
            label: "Dashboard",
            key: "/dashboard",
            icon: <AppstoreAddOutlined />,
          },
          {
            label: "Survey",
            key: "/survey",
            icon: <ContainerOutlined />,
          },
          {
            label: "Results",
            key: "/results",
            icon: <FundProjectionScreenOutlined />,
          },
          {
            label: "Edit Survey",
            key: "/editsurvey",
            icon: <EditOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
