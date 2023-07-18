import "./App.css";
import Dashboard from "./Anonymous/Pages/Dashboard";
import SurveyQns from "./pages/Survey";
import Results from "./Anonymous/Pages/Results";
import Admin from "./pages/AdminPanel";
import EditUser from "./pages/EditUser";
import EditSurvey from "./pages/EditSurvey";
import UpdateSurvey from "./pages/UpateSurvey";
import CreateSurvey from "./pages/CreateSurvey";
import UserHome from "./User/Pages/Home"
import Anonymous from "./Anonymous/Pages/Anonymous";
import UserDashboard from "./User/Pages/Dashboard";
import UserSurvey from "./User/Pages/Survey";
import UserResults from "./User/Pages/Results";
import UserEditSurvey from "./User/Pages/SurveyQns/EditSurvey";
import UserCreateSurveyQn from "./User/Pages/SurveyQns/CreateQn";
import UserUpdateSurveyQn from "./User/Pages/SurveyQns/UpdateQn";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes} from "react-router-dom"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Anonymous />}>
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

      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
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
