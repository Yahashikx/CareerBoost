import "./App.css";
import Registration from "./components/Pages/Registration/registration";
import Login from "./components/Pages/Login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Pages/Welcome/welcome";
import Vacancies from "./components/Pages/Vacancies/vacancies";
import VacancieDetails from "./components/Pages/Vacancie-Details/vacancie-details";
import Internship from "./components/Pages/Internship/internship";
import InternshipDetails from "./components/Pages/Internship-Details/internship-details";
import Events from "./components/Pages/Events-Page/event";
import EventDetails from "./components/Pages/Event-Details/event-details";
import Profile from "./components/Pages/Profile/profile";
import RegistrationVacancies from "./components/Pages/Registration-Vacancies/registration-vacancies";
import RegistrationInternship from "./components/Pages/Registration-Internship/registration-internship";
import RegistrationEmployer from "./components/Pages/Registration-Employer/registration-employer";
import AdminPanel from "./components/Pages/Admin/admin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin-panel" element={<AdminPanel/>}/>
          <Route
            path="/registration-internship"
            element={<RegistrationInternship />}
          />
          <Route
            path="/registration-vacancies"
            element={<RegistrationVacancies />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration-employer" element={<RegistrationEmployer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/vacancie-details/:id" element={<VacancieDetails />} />
          <Route
            path="/internship-details/:id"
            element={<InternshipDetails />}
          />
          <Route path="/event-details/:id" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;