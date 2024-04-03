import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home/Home.js';
import Signin from './SignUpForm';
import Login from './LoginForm';
import Profile from './SchoolAssistantDashBoard/welcomeInfo/ProfileDeatails';
import Layout from './SchoolAssistantDashBoard/Dashboard/Layout';
import AdminDashboard from './SchoolAssistantDashBoard/Dashboard/pages/Dashboard/AdminDashboard';
import TeacherDashboard from './SchoolAssistantDashBoard/Dashboard/pages/Dashboard/TeacherDashboard';
import StudentDashboard from './SchoolAssistantDashBoard/Dashboard/pages/Dashboard/StudentDashboard';
import SubRoute from './SubRoute';
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
const App = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignUpForm" element={<Signin />} />
      <Route path="/LoginForm" element={<Login />} />
      <Route path="/SchoolAssistantDashBoard/welcomeInfo/ProfileDeatails" element={<Profile />} />

      <Route path="/Dashboard" element={<Layout />}>
      <Route
          index
          path=""
          element={<SubRoute path="/Dashboard/AdminDashboard" name="Admin" component={AdminDashboard} />}
        />
        <Route
          path="AdminDashboard"
          element={<SubRoute path="/Dashboard/AdminDashboard" name="Admin" component={AdminDashboard} />}
        />
        <Route
          path="TeacherDashboard"
          element={<SubRoute path="/Dashboard/TeacherDashboard" name="Teachers" component={TeacherDashboard} />}
        />
        <Route
          path="StudentDashboard"
          element={<SubRoute path="/Dashboard/StudentDashboard" name="Student" component={StudentDashboard} />}
        />
        <Route
          path="AllStudent"
          element={<SubRoute path="/Student/AllStudent" name="AllStudent" component={AllStudent} />}
        />
        <Route
          path="StudentDetails"
          element={<SubRoute path="/Student/StudentDetails" name="StudentDetails" component={StudentDetails} />}
        />
        <Route
          path="AdmissionForm"
          element={<SubRoute path="/Student/AdmissionForm" name="AdmissionForm" component={AdmissionForm} />}
        />
        <Route
          path="StudentPromotion"
          element={<SubRoute path="/Student/StudentPromotion" name="StudentPromotion" component={StudentPromotion} />}
        />
        <Route
          path="AllTeachers"
          element={<SubRoute path="/Student/AllTeachers" name="AllTeachers" component={AllTeachers} />}
        />
        <Route
          path="TeacherDetails"
          element={<SubRoute path="/Student/TeacherDetails" name="TeacherDetails" component={TeacherDetails} />}
        />
        <Route
          path="AddTeacher"
          element={<SubRoute path="/Student/AddTeacher" name="AddTeacher" component={AddTeacher} />}
        />
        <Route
          path="Attendence"
          element={<SubRoute path="Attendence" name="Attendence" component={Attendence} />}
        />
        <Route
          path="AddLibaryBooks"
          element={<SubRoute path="AddLibaryBooks" name="AddLibaryBooks" component={AddLibaryBooks} />}
        />
        <Route
          path="LibraryBooks"
          element={<SubRoute path="LibraryBooks" name="LibraryBooks" component={LibaryBooks} />}
        />
        <Route
          path="AllTimeTables"
          element={<SubRoute path="AllTimeTables" name="AllTimeTables" component={AllTimeTables} />}
        />
         <Route
          path="UpdateTimeTables"
          element={<SubRoute path="UpdateTimeTables" name="UpdateTimeTables" component={UpdateTimeTables} />}
        />
        <Route
          path="ExamSchedule"
          element={<SubRoute path="ExamSchedule" name="ExamSchedule" component={ExamSchedule} />}
        />
        <Route
          path="AddExamSchedule"
          element={<SubRoute path="AddExamSchedule" name="AddExamSchedule" component={AddExamSchedule} />}
        />
        <Route
          path="AddMarks"
          element={<SubRoute path="AddMarks" name="AddMarks" component={AddMarks} />}
        />
      </Route>
       
      {/* Handle unknown routes */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </Router>
);

export default App;
