import { Typography, Space, Card, Statistic } from "antd";
import {
  StockOutlined,
  SmileOutlined,
  QuestionCircleOutlined,
  FlagOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { getByGDP, getByAverageHappiness, getByData, getTopEconomies, getByHighestLowestRegion } from "../../../API";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { Bar, Scatter } from "react-chartjs-2";

import { useContext } from "react";
import { userContext } from "../../../Context/userContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();

  const { username, userID } = useContext(userContext);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log(username, userID);
  }, [username, userID]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/auth/dashboard").then((res) => {
      console.log("Auth check", res.data);

      if (res.data.loggedIn) {
        ///
      } else {
        navigate("/user/dashboard");
      }
    });
  }, []);


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getByAverageHappiness().then((data) => {
      const labels = data.map((entry) => entry._id);
      const datasets = [
        {
          label: "Average Happiness Score",
          data: data.map((entry) => entry.averageHappinessScore),
          backgroundColor: "rgba(255, 0, 0, 0.6)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
      ];

      setChartData({ labels, datasets });
    });
  }, []);

  const [dataChartData, setDataChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getByData().then((data) => {
      const labels = Object.keys(data);
      const datasets = Object.entries(data[labels[0]]).map(([label, _]) => ({
        label,
        data: labels.map((l) => data[l][label]),
        backgroundColor: getBackgroundColor(label),
        borderColor: "black",
        borderWidth: 1,
      }));

      setDataChartData({ labels, datasets });
    });
  }, []);

  const getBackgroundColor = (label) => {
    if (label === "Agree") {
      return "rgba(0, 255, 0, 1)";
    } else if (label === "Neutral") {
      return "rgba(255, 255, 0, 1)";
    } else if (label === "Disagree") {
      return "rgba(255, 165, 0, 1)";
    } else if (label === "Strongly Agree") {
      return "rgba(0, 0, 255, 1)";
    } else if (label === "Strongly Disagree") {
      return "rgba(255, 0, 0, 1)";
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
  };

  const dataChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <div>
        <Space direction="horizontal" style={{ paddingBottom: 10 }}>
          <DashboardCard
            title={"Surveys"}
            value={123}
            icon={<StockOutlined />}
            color="green"
            backgroundColor="rgba(0,255,0,0.25)"
          />
          <DashboardCard
            title={"Index"}
            value={"80%"}
            icon={<SmileOutlined />}
            color="blue"
            backgroundColor="rgba(0,0,255,0.25)"
          />
          <DashboardCard
            title={"Questions"}
            value={chartData.labels.length}
            icon={<QuestionCircleOutlined />}
            color="red"
            backgroundColor="rgba(255,0,0,0.25)"
          />
          <DashboardCard
            title={"Happiest Region"}
            icon={<FlagOutlined />}
            color="purple"
            backgroundColor="rgba(0,255,255,0.25)"
            value={chartData}
          />
        </Space>
        <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px" }}>
        <h2 style={{ textAlign: "center" }}>Question Counts</h2>
            <Card style={{ width: 700, height: 350, margin: 5 }}>
              <Bar options={dataChartOptions} data={dataChartData} />
            </Card>
            </div>
            <ScatterChart />
          </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
          <h2 style={{ textAlign: "center" }}>Average Happiness Score by Region</h2>
          <Card style={{ width: 700, height: 350, margin: 5 }}>
              <Bar data={chartData} options={options} />
            </Card>
            <BarChart />
            </div>
            <div style={{ marginRight: "10px" }}>
            <DataChart />
            </div>
            <div style={{ marginRight: "10px" }}></div>
          </div>
        </div>
      </div>
  );
};

const DashboardCard = ({ title, icon, color, backgroundColor, value }) => {
  const iconStyle = {
    fontSize: 40,
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: 20,
    padding: 8,
  };

  const getHighestHappinessScore = () => {
    if (value && value.datasets && value.datasets.length > 0) {
      const dataset = value.datasets[0];
      const maxHappinessScore = Math.max(...dataset.data);
      const index = dataset.data.indexOf(maxHappinessScore);
      if (index !== -1 && value.labels && value.labels.length > index) {
        return value.labels[index];
      }
    }
    return null;
  };

  const highestHappinessScore = getHighestHappinessScore();

  return (
    <Card>
      <Space direction="horizontal" size={20}>
        {React.cloneElement(icon, { style: iconStyle })}
        <Statistic title={title} value={highestHappinessScore || value} />
      </Space>
    </Card>
  );
};

const DataChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getTopEconomies().then((data) => {
      const labels = data.map((entry) => entry.Country);
      const datasets = [
        {
          label: "Economy (GDP per Capita)",
          data: data.map((entry) => entry["Economy (GDP per Capita)"]),
          backgroundColor: "rgba(0, 123, 255, 0.6)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
      ];

      setChartData({ labels, datasets });
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <h2 style={{ textAlign: "center" }}>Top Economies by GDP per Capita</h2>
    <Card style={{ width: 800, height:400, margin: 5 }}>
      <Bar data={chartData} options={options} />
    </Card>
    </div>
  );
};

const ScatterChart = () => {
  const [dataSource, setDataSource] = useState({
    labels: [],
    datasets: [],
  });

  const [minimumY, setMinimumY] = useState(null);

  useEffect(() => {
    getByGDP().then((res) => {
      const data = res.map((element) => ({
        x: element["Happiness Score"],
        y: element["Economy (GDP per Capita)"],
      }));

      let minValue = Infinity;

      for (let i = 0; i < data.length; i++) {
        if (data[i].y < minValue) {
          minValue = data[i].y;
        }
      }

      setMinimumY(minValue);

      const dataSource = {
        datasets: [
          {
            label: "Happiness Score Against GDP",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };
      setDataSource(dataSource);
    });
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: minimumY,
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250, margin: 5 }}>
      <Scatter options={options} data={dataSource} />
    </Card>
  );
};

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getByHighestLowestRegion().then((data) => {
      const labels = data.map((entry) => entry._id);
      const datasets = [
        {
          label: "Highest Health Score",
          data: data.map((entry) => entry.highestHealthScore),
          backgroundColor: "rgba(0, 123, 255, 0.6)", // You can set the color as you prefer
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Lowest Health Score",
          data: data.map((entry) => entry.lowestHealthScore),
          backgroundColor: "rgba(255, 0, 0, 0.6)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
        },
      ];

      setChartData({ labels, datasets });
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Highest and Lowest Health Scores by Region</h2>
      <div style={{ width: 700, height: 500, margin: 5 }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
