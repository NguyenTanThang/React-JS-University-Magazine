import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import {
  FreeRoute,
  PrivateRoute
} from "./components/Partial";
import {
  ViewContributionPageStudent
} from "./pages/Student";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LogoutPage from "./pages/LogoutPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
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
  EditContributionAdmin,
  ViewContributionPage
} from "./pages/Admin";
import {
  Role
} from "./_helpers";

function App() {
  return (
    <div className="App">
      <Router>
          <PrivateRoute path="/" exact component={HomePage}/>
          <PrivateRoute path="/chat" roles={[Role.Coordinator, Role.Student]} exact component={ChatPage}/>
          <PrivateRoute path="/chat-room/senderID/:senderID/receiverID/:receiverID" roles={[Role.Coordinator, Role.Student]} exact component={ChatRoomPage}/>
          <FreeRoute path="/login" exact component={LoginPage}/>
          <PrivateRoute path="/change-password" exact component={ChangePasswordPage}/>
          <Route path="/logout" exact component={LogoutPage}/>
          <PrivateRoute path="/terms" roles={[Role.Manager, Role.Admin, Role.Student, Role.Coordinator]} exact component={ViewTermPageAdmin}/>
          <PrivateRoute path="/terms/add" component={AddTermPageAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/terms/edit/:termID" component={EditTermPageAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/faculties" exact component={ViewFacultyPageAdmin} roles={[Role.Manager, Role.Admin]}/>
          <PrivateRoute path="/faculties/add" component={AddFacultyPageAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/faculties/edit/:facultyID" component={EditFacultyPageAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/faculty-assignments" exact component={ViewFacultyAssignmentPageAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/faculty-assignments/add" component={AddFacultyAssignmentPageAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/faculty-assignments/edit/:facultyAssignmentID" component={EditFacultyAssignmentAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/contributions" exact component={ViewContributionPageStudent} roles={[Role.Manager, Role.Admin, Role.Student, Role.Coordinator]}/>
          <PrivateRoute path="/contributions/add" component={AddContributionAdmin} roles={[Role.Student]}/>
          <PrivateRoute path="/contributions/edit/:contributionID" component={EditContributionAdmin} roles={[Role.Student]}/>
          <PrivateRoute path="/contributions/details/:contributionID" component={ViewContributionPage} roles={[Role.Manager, Role.Admin, Role.Student, Role.Coordinator]}/>
          <PrivateRoute path="/users" exact component={ViewUserPageAdmin} roles={[Role.Admin, Role.Coordinator, Role.Manager]}/>
          <PrivateRoute path="/users/add" component={AddUserPageAdmin} roles={[Role.Admin]}/>
          <PrivateRoute path="/users/edit/:userID" component={EditUserPageAdmin} roles={[Role.Admin]}/>
      </Router>
    </div>
  );
}

export default App;
