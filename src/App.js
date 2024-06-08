import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home/Home.js';
import Gallery from "./Home/components/Gallery.jsx";
import WebsiteAdmission from './Home/components/Admission.jsx'
import Results from './Home/components/Results.jsx' 
import AboutUs from './Home/components/AboutUs.jsx'
import ContactUs from './Home/components/ContactUs.jsx'
import Signin from './SignUpForm';
import Login from './LoginForm';
import Layout from './SchoolAssistantDashBoard/Dashboard/Layout';
import AdminDashboard from './SchoolAssistantDashBoard/Dashboard/pages/Dashboard/AdminDashboard';
import TeacherDashboard from './SchoolAssistantDashBoard/Dashboard/pages/Dashboard/TeacherDashboard';
import StudentDashboard from './SchoolAssistantDashBoard/Dashboard/pages/Dashboard/StudentDashboard';
import AllStudent from "./SchoolAssistantDashBoard/Dashboard/pages/Student/AllStudent.js";
import StudentDetails from "./SchoolAssistantDashBoard/Dashboard/pages/Student/studentDetails.js";
import AdmissionForm from "./SchoolAssistantDashBoard/Dashboard/pages/Student/AdmissionForm.js";
import StudentPromotion from './SchoolAssistantDashBoard/Dashboard/pages/Student/StudentPromotion.js';
import AllTeachers from "./SchoolAssistantDashBoard/Dashboard/pages/Teachers/AllTeachers.js";
import TeacherDetails from "./SchoolAssistantDashBoard/Dashboard/pages/Teachers/TeacherDetails.js";
import AddTeacher from './SchoolAssistantDashBoard/Dashboard/pages/Teachers/TeacherAdd.js';
import Attendence from "./SchoolAssistantDashBoard/Dashboard/pages/Attendence.js";
import AddLibaryBooks from './SchoolAssistantDashBoard/Dashboard/pages/Library/AddLibraryBooks.js';
import LibaryBooks from './SchoolAssistantDashBoard/Dashboard/pages/Library/LibraryBooks.js';
import AllTimeTables from "./SchoolAssistantDashBoard/Dashboard/pages/TimeTable/AllTimeTables.js";
import UpdateTimeTables from './SchoolAssistantDashBoard/Dashboard/pages/TimeTable/UpdateTimeTable.js';
import ExamSchedule from './SchoolAssistantDashBoard/Dashboard/pages/Exam/ExamSchedule.js';
import AddExamSchedule from './SchoolAssistantDashBoard/Dashboard/pages/Exam/AddExamSchedule.js';
import AddMarks from './SchoolAssistantDashBoard/Dashboard/pages/Exam/AddMarks.js'
import StudAccount from "./SchoolAssistantDashBoard/Dashboard/pages/Accounts/StudAccount.jsx";
import TeachAccounts from "./SchoolAssistantDashBoard/Dashboard/pages/Accounts/TeachAccounts.jsx";
import DriverAccounts from "./SchoolAssistantDashBoard/Dashboard/pages/Accounts/DriverAccounts.jsx";
import Notice from "./SchoolAssistantDashBoard/Dashboard/pages/Notice/Notice.jsx";
import ChatStudent from "./SchoolAssistantDashBoard/Dashboard/pages/Messages/chatStudent.jsx"
import Transport from './SchoolAssistantDashBoard/Dashboard/pages/Transport/Transport.jsx'
import Finance from "./SchoolAssistantDashBoard/Dashboard/pages/Finance/Finance.jsx";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/WebsiteAdmission" element={<WebsiteAdmission />} />
      <Route path="/Results" element={<Results />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/SignUpForm" element={<Signin />} />
      <Route path="/LoginForm" element={<Login />} />

      <Route path="/Dashboard" element={<Layout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="TeacherDashboard" element={<TeacherDashboard />} />
        <Route path="StudentDashboard" element={<StudentDashboard />} />
        <Route path="AllStudent" element={<AllStudent />} />
        <Route path="StudentDetails" element={<StudentDetails />} />
        <Route path="AdmissionForm" element={<AdmissionForm />} />
        <Route path="StudentPromotion" element={<StudentPromotion />} />
        <Route path="AllTeachers" element={<AllTeachers />} />
        <Route path="TeacherDetails" element={<TeacherDetails />} />
        <Route path="AddTeacher" element={<AddTeacher />} />
        <Route path="Attendence" element={<Attendence />} />
        <Route path="AddLibraryBooks" element={<AddLibaryBooks />} />
        <Route path="LibraryBooks" element={<LibaryBooks />} />
        <Route path="AllTimeTables" element={<AllTimeTables />} />
        <Route path="UpdateTimeTables" element={<UpdateTimeTables />} />
        <Route path="ExamSchedule" element={<ExamSchedule />} />
        <Route path="AddExamSchedule" element={<AddExamSchedule />} />
        <Route path="AddMarks" element={<AddMarks />} />
        <Route path="StudAccount" element={<StudAccount />} />
        <Route path="TeachAccounts" element={<TeachAccounts />} />
        <Route path="DriverAccounts" element={<DriverAccounts />} />
        <Route path="Notice" element={<Notice />} />
        <Route path="chatStudent" element={<ChatStudent />} />
        <Route path="Transport" element={<Transport />} /> 
        <Route path="Finance" element={<Finance />} /> 
      </Route>
      {/* Handle unknown routes */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </Router>
);

export default App;