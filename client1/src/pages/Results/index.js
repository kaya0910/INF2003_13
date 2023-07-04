import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";

const Results = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + "/survey_data")
      .then((res) => {
        const data = res.data;
        setSurveyData(data);
        setTotalPages(Math.ceil(data.length / 10)); // Assuming 10 items per page
      })
      .catch((error) => {
        console.error("Error retrieving survey data:", error);
      });
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const updateTotalPages = () => {
    const itemsPerPage = Math.ceil(surveyData.length / totalPages);
    setTotalPages(Math.ceil(surveyData.length / itemsPerPage));
  };

  useEffect(() => {
    updateTotalPages();
  }, [surveyData]);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentPageData = surveyData.slice(startIndex, endIndex);

  return (
    <div style={{ display: "flex" }}>
      <SurveyDataDisplay
        currentPage={currentPage}
        totalPages={totalPages}
        currentPageData={currentPageData}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </div>
  );
};

const SurveyDataDisplay = ({
  currentPage,
  totalPages,
  currentPageData,
  onNextPage,
  onPreviousPage,
}) => {
  // Mapping of numeric values to labels
  const answerLabels = {
    5: "Strongly Agree",
    4: "Agree",
    3: "Neutral",
    2: "Disagree",
    1: "Strongly Disagree",
  };

  if (currentPageData.length === 0) {
    return <div>No data</div>;
  }

  return (
    <div>
      <h2>Survey Data</h2>
      <ul>
        {currentPageData.map((data) => (
          <li key={data._id}>
            <strong>ID: {data._id}</strong>
            <ul>
              {Object.entries(data.Survey).map(([question, answer]) => (
                <li key={question}>
                  <strong>{question}:</strong> {answerLabels[answer]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={onPreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={onNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Results;
