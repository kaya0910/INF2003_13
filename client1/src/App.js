import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SurveyQns from "./pages/Survey";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Admin from "./pages/AdminPanel";
import EditUser from "./pages/EditUser";
import EditSurvey from "./pages/EditSurvey";
import UpdateSurvey from "./pages/UpateSurvey";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyData from "./pages/DisplaySurvey/SurveyData";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="survey" element={<SurveyQns />} />
        <Route path="survey_data" element={<SurveyData />} /> {/* Removed unnecessary slashes */}
        <Route path="results" element={<Results />} />
        <Route path="editsurvey" element={<EditSurvey />} />
      </Route>
      <Route path="signup" element={<Register />} /> {/* Removed unnecessary slashes */}
      <Route path="login" element={<Login />} /> {/* Removed unnecessary slashes */}
      <Route path="admin" element={<Admin />} />

      <Route path="update/:id" element={<EditUser />} /> {/* Removed unnecessary slashes */}
      <Route path="updatesurvey/:id" element={<UpdateSurvey />} /> {/* Removed unnecessary slashes */}
      <Route path="createsurvey" element={<CreateSurvey />} /> {/* Removed unnecessary slashes */}
    </Routes>
  );
};


export default App;
