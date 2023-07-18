import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../constants";

const CreateSurvey = () => {
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question) {
      alert("Please enter question");
      return;
    }

    const formData = {
      question,
    };

    axios
      .post(BASE_URL + "/survey_questions/", formData)
      .then((res) => {
        console.log("Data updated successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    alert("Data is updated succcessfully!");
    navigate("/user/dashboard");
  };

  return (
    <div className="edit-page-container">
      <h2>Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
