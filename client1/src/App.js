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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="survey" element={<SurveyQns />}></Route>
        <Route path="results" element={<Results />}></Route>
        <Route path="/editsurvey" element={<EditSurvey />} />
      </Route>
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="/update/:id" element={<EditUser />} />
      <Route path="/updatesurvey/:id" element={<UpdateSurvey />} />
      <Route path="/createsurvey" element={<CreateSurvey />} />
    </Routes>
  );
};

export default App;
