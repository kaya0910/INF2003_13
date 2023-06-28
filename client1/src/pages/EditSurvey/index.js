import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { BASE_URL } from "../../constants";

const EdiSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/createsurvey");
  };

  const handleClickDelete = (id) => {
    setShow(true);
    setId(id);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    axios.delete(BASE_URL + "/survey_questions/" + id);
    setShow(false);
  };

  const handleClickUpdate = (id) => {
    navigate("/updatesurvey/" + id);
  };

  useEffect(() => {
    axios.get(BASE_URL + "/survey_questions").then((res) => {
      const data = res.data;
      setQuestions(data);
    });
  }, []);

  return (
    <>
      <Modal
        title="Are you sure you want to delete?"
        open={show}
        onOk={handleDelete}
        onCancel={handleClose}
      ></Modal>

      <Button type="primary" onClick={handleButtonClick}>
        Add Question
      </Button>

      <div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Question</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((d, i) => (
                <tr key={i}>
                  <td>{d.question}</td>
                  <td>
                    <Button
                      onClick={() => handleClickUpdate(d.id)}
                      className="btn btn-sm btn-success"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleClickDelete(d.id)}
                      className="btn ms-3 btn-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EdiSurvey;
