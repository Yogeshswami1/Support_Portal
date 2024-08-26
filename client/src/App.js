import { Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Managertab from "./pages/Managertab";
import Usertab from "./pages/Usertab";
import Userdashboard from "./pages/Userdashboard";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Learnings from "./pages/Learnings";
import Ordawlt from "./pages/Ordawlt";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import SupportHome from "./pages/SupportHome";
import SupportUserDashboard from "./pages/SupportUserDashboard";
import SupportManager from "./pages/SupportManager";
import SupportManagerDashboard from "./pages/SupportManagerDashboard";
import SupportAdmin from "./pages/SupportAdmin";
import SupportAdminDashboard from "./pages/SupportAdminDashboard";
import SupportUserDash from "./pages/SupportUserDash";
import store from "./redux/store";
import SupportManagerDash from "./pages/SupportManagerDash";
import SupportUserAppointments from "./pages/SupportUserAppointment";
import SupportUserOpenTicket from "./pages/SupportUserOpneTicket";
import SupportManagerAppointments from "./pages/SupportManagerAppointments";
import SupportManagerOpenTicket from "./pages/SupportManagerOpenTicket";
import SupportAdminDash from "./pages/SupportAdminDash";
import SupportAdminAppointment from "./pages/SupportAminAppointment";
import SupportAllmanager from "./pages/SupportAllManagers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserPrivateRoute from "./components/layout/UserPrivateRoute";
import ManagerPrivateRoute from "./components/layout/ManagerPrivateRoute";
import AdminPrivateRoute from "./components/layout/AdminPrivateRoute";
import BookUserAppointment from "./pages/BookUserAppointment";
import SupportUserTicketDetails from "./pages/SupportUserTicketDetails";
import SupportTicketDetails from "./pages/SupportTicketDetails";
import SupportAdminTicketDetails from "./pages/SupportAdminTicketDetails";
import SupportAdminOpenTickets from "./pages/SupportAdminOpenTickets";
import SupportManagerAppointmentDetails from "./pages/SupportManagerAppointmentDetails";
import SupportManagerDetails from "./pages/SupportManageDetails";
function App() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <Provider store={store}>
        <Switch>
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />

          {/* Full screen page route */}
          <Route exact path="/support" component={SupportHome} />

          <UserPrivateRoute
            exact
            path="/supportuserbookappointment"
            component={BookUserAppointment}
          />
          {/* <Route exact path="/ticket-detail/:id" component={BookAppointment} /> */}

          <UserPrivateRoute
            exact
            path="/supportuserdashboard"
            component={SupportUserDashboard}
          />
          <Route exact path="/supportmanager" component={SupportManager} />
          <ManagerPrivateRoute
            exact
            path="/supportmanagerdashboard"
            component={SupportManagerDashboard}
          />
          <Route exact path="/supportadmin" component={SupportAdmin} />
          <AdminPrivateRoute
            exact
            path="/supportadmindashboard"
            component={SupportAdminDashboard}
          />
          <UserPrivateRoute
            exact
            path="/supportuserdash"
            component={SupportUserDash}
          />
          <Route
            exact
            path="/supportuserticketdetails/:id"
            component={SupportUserTicketDetails}
          />
          <Route
            exact
            path="/supportticketdetails/:id"
            component={SupportTicketDetails}
          />
          <Route
            exact
            path="/supportadminticketdetails/:id"
            component={SupportAdminTicketDetails}
          />
          <Route
            exact
            path="/supportadminopentickets"
            component={SupportAdminOpenTickets}
          />
          <Route path="/manager/:id" component={SupportManagerDetails} />
          <ManagerPrivateRoute
            exact
            path="/supportmanagerdash"
            component={SupportManagerDash}
          ></ManagerPrivateRoute>
          <UserPrivateRoute
            exact
            path="/supportuserappointment"
            component={SupportUserAppointments}
          ></UserPrivateRoute>
          <UserPrivateRoute
            exact
            path="/supportuseropenticket"
            component={SupportUserOpenTicket}
          ></UserPrivateRoute>
          <ManagerPrivateRoute
            exact
            path="/supportmanagerappointment"
            component={SupportManagerAppointments}
          ></ManagerPrivateRoute>
          <Route
            exact
            path="/supportappointmentdetails/:id"
            component={SupportManagerAppointmentDetails}
          ></Route>
          <ManagerPrivateRoute
            exact
            path="/supportmanageropenticket"
            component={SupportManagerOpenTicket}
          ></ManagerPrivateRoute>
          <AdminPrivateRoute
            exact
            path="/supportadmindash"
            component={SupportAdminDash}
          ></AdminPrivateRoute>
          <AdminPrivateRoute
            exact
            path="/supportadminappointments"
            component={SupportAdminAppointment}
          ></AdminPrivateRoute>
          <AdminPrivateRoute
            exact
            path="/allmanagers"
            component={SupportAllmanager}
          ></AdminPrivateRoute>

          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/managertab" component={Managertab} />
            <Route exact path="/usertab" component={Usertab} />
            <Route exact path="/userdashboard" component={Userdashboard} />
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/learnings" component={Learnings} />
            <Route exact path="/ordawlt" component={Ordawlt} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/services" component={Services} />

            <Redirect from="*" to="/dashboard" />
          </Main>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
