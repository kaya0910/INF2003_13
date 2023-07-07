import { Typography, Space, Card, Statistic } from "antd";
import {
  StockOutlined,
  SmileOutlined,
  QuestionCircleOutlined,
  FlagOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { getByGDP, getByData } from "../../../API";

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
            value={123}
            icon={<QuestionCircleOutlined />}
            color="red"
            backgroundColor="rgba(255,0,0,0.25)"
          />
          <DashboardCard
            title={"Happiest Country"}
            value={"Sweden"}
            icon={<FlagOutlined />}
            color="purple"
            backgroundColor="rgba(0,255,255,0.25)"
          />
        </Space>
        <div style={{ display: "flex" }}>
          <DataChart />
          <ScatterChart />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color, backgroundColor }) => {
  const iconStyle = {
    fontSize: 40,
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: 20,
    padding: 8,
  };

  return (
    <Card>
      <Space direction="horizontal" size={20}>
        {React.cloneElement(icon, { style: iconStyle })}

        <Statistic title={title} value={value} />
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
    getByData().then((data) => {
      const labels = Object.keys(data);
      const datasets = Object.entries(data[labels[0]]).map(([label, _]) => ({
        label,
        data: labels.map((l) => data[l][label]),
        backgroundColor: getBackgroundColor(label),
        borderColor: "black",
        borderWidth: 1,
      }));
  
      setChartData({ labels, datasets });
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
        text: "Question Counts",
      },
    },
  };
  
  return (
    <Card style={{ width: 800, height: 500, margin: 5 }}>
      <Bar data={chartData} options={options} />
    </Card>
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

export default Dashboard;
