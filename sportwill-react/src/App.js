import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import WillDetail from './pages/WillDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditWill from './pages/EditWill';


function App() {
  return (
     <Router>
      <Header />
     
        <Switch>
          <Route path="/SignIn" component={SignIn}></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/Home" component={Homepage}></Route>
          <Route path="/Detail/:id" component={WillDetail}></Route>
          <Route path="/Edit/:id" component={EditWill}></Route>
          <Route path="/Edit/new" component={EditWill}></Route>
        </Switch>
     
      <Footer/>
      </Router>
  );
}

export default App;
