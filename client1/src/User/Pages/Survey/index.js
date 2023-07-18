import React, { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./json.js";
import axios from "axios";
import { BASE_URL } from "../../../constants";

const SurveyQns = () => {
  const [jsonObj, setJsonObj] = useState(null);
  const survey = new Model(jsonObj);

  useEffect(() => {
    axios.get(BASE_URL + "/survey_questions").then((res) => {
      const qns = res.data.map((item) => ({
        value: item.question,
        text: item.question,
      }));

      setJsonObj(json(qns));
    });
  }, []);

  survey.onComplete.add((sender, options) => {
    const data = sender.data;

    console.log(data);

    // Make a POST request to localhost:3005/survey
    fetch(BASE_URL + "/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Survey data sent successfully");
        } else {
          console.error("Failed to send survey data");
        }
      })
      .catch((error) => {
        console.error("Error sending survey data:", error);
      });
  });

  return <Survey model={survey} />;
};

export default SurveyQns;
