import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { getData } from "../../../API";


const Results = () => {
  return (
    <div style={{ display: "flex" }}>
      <RecentSurveys />
    </div>
  );
};

const RecentSurveys = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Survey Results",
      dataIndex: "Survey",
      key: "Survey",
      render: (survey) => (
        <ul>
          {Object.entries(survey).map(([question, answer]) => (
            <li key={question}>
              <strong>{question}:</strong> {answer}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default Results;
