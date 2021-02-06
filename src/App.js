import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";

import {
  Navbar
} from "./components/Partial";
import {
  ViewContributionPageStudent
} from "./pages/Student";
import ChatPage from "./pages/ChatPage";
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

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <main>
          <Route path="/chat" exact component={ChatPage}/>
          <div className="container">
              <Route path="/" exact component={ViewUserPageAdmin}/>
              <Route path="/terms" exact component={ViewTermPageAdmin}/>
              <Route path="/terms/add" component={AddTermPageAdmin}/>
              <Route path="/terms/edit/:termID" component={EditTermPageAdmin}/>
              <Route path="/faculties" exact component={ViewFacultyPageAdmin}/>
              <Route path="/faculties/add" component={AddFacultyPageAdmin}/>
              <Route path="/faculties/edit/:facultyID" component={EditFacultyPageAdmin}/>
              <Route path="/faculty-assignments" exact component={ViewFacultyAssignmentPageAdmin}/>
              <Route path="/faculty-assignments/add" component={AddFacultyAssignmentPageAdmin}/>
              <Route path="/faculty-assignments/edit/:facultyAssignmentID" component={EditFacultyAssignmentAdmin}/>
              <Route path="/contributions" exact component={ViewContributionPageStudent}/>
              <Route path="/contributions/add" component={AddContributionAdmin}/>
              <Route path="/contributions/edit/:contributionID" component={EditContributionAdmin}/>
              <Route path="/users/add" component={AddUserPageAdmin}/>
              <Route path="/users/edit/:userID" component={EditUserPageAdmin}/>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
