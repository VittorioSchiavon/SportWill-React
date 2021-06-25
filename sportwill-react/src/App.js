import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import WillDetail from "./pages/WillDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditWill from "./pages/EditWill";
import NotFound from "./pages/NotFound";
import * as Auth from "./services/Auth";

function App() {
  //Routing
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route path="/Home" component={Homepage}></Route>
        <Route path="/Detail/:id" component={WillDetail}></Route>
        <Route
          path="/SignIn"
          render={() =>
            Auth.isAuthenticated() ? <Redirect to="/Home" /> : <SignIn />
          }
        />
        <Route
          path="/SignUp"
          render={() =>
            Auth.isAuthenticated() ? <Redirect to="/Home" /> : <SignUp />
          }
        />
        <Route
          path="/Edit/:id"
          render={() =>
            !Auth.isAuthenticated() ? <Redirect to="/SignIn" /> : <EditWill />
          }
        />
        <Route
          path="/Edit/new"
          render={() =>
            !Auth.isAuthenticated() ? <Redirect to="/SignIn" /> : <EditWill />
          }
        />

        <Route component={NotFound}></Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
