import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserHome from "./User/Pages/Home";
import UserDashboard from "./User/Pages/Dashboard";
import UserSurvey from "./User/Pages/Survey";
import UserResults from "./User/Pages/Results";
import UserEditSurvey from "./User/Pages/SurveyQns/EditSurvey";
import UserCreateSurveyQn from "./User/Pages/SurveyQns/CreateQn";
import UserUpdateSurveyQn from "./User/Pages/SurveyQns/UpdateQn";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Home from "./Anonymous/Pages/Home";
import Dashboard from "./Anonymous/Pages/Dashboard";
import Results from "./Anonymous/Pages/Results";
import Survey from "./Anonymous/Pages/Survey";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="survey" element={<Survey />}></Route>
        <Route path="results" element={<Results />}></Route>
      </Route>

      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />

      <Route path="/user" element={<UserHome />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="survey" element={<UserSurvey />} />
        <Route path="results" element={<UserResults />} />
        <Route path="editsurvey" element={<UserEditSurvey />} />
        <Route path="editsurvey/create" element={<UserCreateSurveyQn />} />
        <Route path="editsurvey/update/:id" element={<UserUpdateSurveyQn />} />
      </Route>
    </Routes>
  );
};

export default App;
