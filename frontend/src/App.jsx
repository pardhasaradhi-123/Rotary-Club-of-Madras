import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Interact from "./Components/AdminDashboard/Interact";
import Rotaract from "./Components/AdminDashboard/Rotaract";
import InteractProjectDetails from "./Components/AdminDashboard/InteractProjectDetails";
import RotaractProjectDetails from "./Components/AdminDashboard/RotaractProjectDetails";
import Login from "./Components/Login";
import ClubDashboard from "./Components/ClubDashboard/ClubDashboard";
import Project from "./Components/ClubDashboard/Project";
import ClubMember from "./Components/ClubDashboard/ClubMember";
import Contact from "./Components/ClubDashboard/Contact";
import AddClub from "./Components/AdminDashboard/AddClub";
import UpdateClub from "./Components/AdminDashboard/UpdateClub";
import ExportProject from "./Components/AdminDashboard/ExportProject";
import AddProject from "./Components/ClubDashboard/AddProject";
import UpdateClubDashboardProject from "./Components/ClubDashboard/UpdateClubDashboardProject";
import UpdateAdminDashboardProject from "./Components/AdminDashboard/UpdateAdminDashboardProject";
import AddMember from "./Components/ClubDashboard/AddMember";
import UpdateMember from "./Components/ClubDashboard/UpdateMember";

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/interact" element={<Interact />} />
        <Route path="/rotaract" element={<Rotaract />} />
        <Route
          path="/interact/interact-project-full-details/:clubName"
          element={<InteractProjectDetails />}
        />
        <Route
          path="/rotaract/rotaract-project-full-details/:clubName"
          element={<RotaractProjectDetails />}
        />
        <Route path="/clubDashboard" element={<ClubDashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/club-member" element={<ClubMember />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addclub" element={<AddClub />} />
        <Route
          path="/update-dashboard-project/:clubName"
          element={<UpdateAdminDashboardProject />}
        />
        <Route path="/updateclub/:clubName" element={<UpdateClub />} />
        <Route
          path="/exportAdmindashboardProject/:clubName"
          element={<ExportProject />}
        />
        <Route path="/addproject" element={<AddProject />} />
        <Route
          path="/updateClubdashboardProject"
          element={<UpdateClubDashboardProject />}
        />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/updateMember" element={<UpdateMember />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
