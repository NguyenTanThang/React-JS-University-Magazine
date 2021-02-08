import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import './App.css';

import {BrowserRouter as Router} from "react-router-dom";
import {
  FreeRoute,
  PrivateRoute
} from "./components/Partial";
import {
  ViewContributionPageStudent
} from "./pages/Student";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import {
  ViewUserPageAdmin,
  ViewTermPageAdmin,
  ViewFacultyPageAdmin,
  ViewFacultyAssignmentPageAdmin,
  AddTermPageAdmin,
  AddFacultyPageAdmin,
  AddUserPageAdmin,
  EditFacultyPageAdmin,
  EditTermPageAdmin,
  AddFacultyAssignmentPageAdmin,
  EditFacultyAssignmentAdmin,
  EditUserPageAdmin,
  AddContributionAdmin,
  EditContributionAdmin
} from "./pages/Admin";
import {
  Role
} from "./_helpers";

function App() {
  return (
    <div className="App">
      <Router>
          <PrivateRoute path="/chat" roles={[Role.Coordinator, Role.Student]} exact component={ChatPage}/>
          <PrivateRoute path="/" exact component={ViewUserPageAdmin}/>
          <FreeRoute path="/login" exact component={LoginPage}/>
          <PrivateRoute path="/terms" exact component={ViewTermPageAdmin}/>
          <PrivateRoute path="/terms/add" component={AddTermPageAdmin}/>
          <PrivateRoute path="/terms/edit/:termID" component={EditTermPageAdmin}/>
          <PrivateRoute path="/faculties" exact component={ViewFacultyPageAdmin}/>
          <PrivateRoute path="/faculties/add" component={AddFacultyPageAdmin}/>
          <PrivateRoute path="/faculties/edit/:facultyID" component={EditFacultyPageAdmin}/>
          <PrivateRoute path="/faculty-assignments" exact component={ViewFacultyAssignmentPageAdmin}/>
          <PrivateRoute path="/faculty-assignments/add" component={AddFacultyAssignmentPageAdmin}/>
          <PrivateRoute path="/faculty-assignments/edit/:facultyAssignmentID" component={EditFacultyAssignmentAdmin}/>
          <PrivateRoute path="/contributions" exact component={ViewContributionPageStudent}/>
          <PrivateRoute path="/contributions/add" component={AddContributionAdmin}/>
          <PrivateRoute path="/contributions/edit/:contributionID" component={EditContributionAdmin}/>
          <PrivateRoute path="/users/add" component={AddUserPageAdmin}/>
          <PrivateRoute path="/users/edit/:userID" component={EditUserPageAdmin}/>
      </Router>
    </div>
  );
}

export default App;
