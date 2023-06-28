import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

import "./index.css";

const Admin = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/signup");
  };

  const handleClickDelete = (id) => {
    setShow(true);
    setId(id);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    axios.delete(BASE_URL + "/users/" + id).then((res) => {
      alert("Account is deleted");
    });
  };

  const handleClickUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    axios.get(BASE_URL + "/users").then((res) => {
      setColumns([...Object.keys(res.data[0])].slice(1, -1));
      setRecords(res.data);
    });
  }, []);

  return (
    <>
      <Modal
        open={show}
        onCancel={handleClose}
        centered
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <Modal.Title>Confirm Delete</Modal.Title>
        <Modal.Content>
          <p>Are you sure you want to delete this item?</p>
        </Modal.Content>
      </Modal>

      <div className="container mt-5">
        <Button type="primary" onClick={handleButtonClick}>
          Create Account
        </Button>
        <table className="table">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c.toUpperCase()}</th>
              ))}
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.username}</td>
                <td>{d.name}</td>
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
    </>
  );
};

export default Admin;
