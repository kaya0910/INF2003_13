import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";

const SurveyDataDisplay = () => {
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + "/survey_data").then((res) => {
      setSurveyData(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Survey Data</h2>
      <ul>
        {surveyData.map((data) => (
          <li key={data.id}>
            <strong>ID: {data.id}</strong>
            <ul>
              {Object.entries(data.data.Survey).map(([question, answer]) => (
                <li key={question}>
                  <strong>{question}:</strong> {answer}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyDataDisplay;
